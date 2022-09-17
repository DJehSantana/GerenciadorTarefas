const jwt = require('jsonwebtoken');
const UsuarioRepository = require('../repositories/impl/UsuarioRepMongoDB');

//define a lista de rotas publicas da aplicação
const rotasPublicas  = [
    {
        url: '/api/login',
        metodo: 'POST'
    },
    //rota do swagger
    {
        url: '/api/docs/',
        metodo: 'GET'
    },
    {
        url: '/api/usuario',
        metodo: 'POST'
    }
];

module.exports = (req, res, next) => {
    req.logger.info('Verificando permissão de acesso a', `rota: ${req.url}`);

    //caso seja uma rota pública não precisa de autorização
    //método find, caso a rota e o metodo fizerem parte do array de rotas publicas, será atribuido a const
    const rotaPublica = rotasPublicas.find(rota => 
        rota.url === req.url && rota.metodo === req.method.toUpperCase());

    if (rotaPublica) {
        // chama o método next pra continuar a chamada dos próximos middlewares,
        // o return bloqueia o fluxo do programa para que não siga para a autorização
        req.logger.info('rota publica, requisição liberada');
        return next(); 
    }

    //headers usado para acessar o header do BD
    const authorization = req.headers.authorization;

    //envia uma mensagem de erro 401 se o header de autorização não for enviado
    if (!authorization) {
        req.logger.info('requisicao negada, sem header de autorização');
        res.status(401).json({
            status: 401,
            erro: 'acesso negado, você precisa enviar o header authorization'
        });
        
        console.log('Falha na autorização');
        return res;
    }

    //pega o token de autorização
    const token = authorization.substr(7);
    // verificar se o token é válido
    //a função callback recebe como parametro um erro (err) caso o token não puder ser decodificado
    //ou o token decodificado (decoded) caso a decodificação seja realizada com sucesso
    jwt.verify(token, process.env.CHAVE_SECRETA_JWT, async (err, decoded) => {
        if(err) {
            req.logger.error('erro ao decodificar o token JWT', `token = ${token}`);
            return res.status(401).json({
                status: 401,
                erro: 'Acesso negado! Problema ao decodificar o token de autorização!'
            });
        }
        req.logger.debug('token JWT decodificado com sucesso!', `idUsuario = ${decoded._id}`);

        //Busca se o usuário está no banco de dados através do método filtrarPorId, enviando o id como parâmetro
        const usuario = await UsuarioRepository.filtrarPorId(decoded._id);
        //Se não encontrar o id do usuário  no BD, retorna erro status 401
        if (!usuario) {
            req.logger.error('Usuário não encontrado no BD', `id= ${decoded._id}`);
            return res.status(401).json({
                status: 401,
                erro: 'Acesso negado! usuário não encontrado!'
            })
        }

        //atribui a propriedade usuario da requisição quem é o usuário autenticado
        req.usuario = usuario;

    });



    next();
}