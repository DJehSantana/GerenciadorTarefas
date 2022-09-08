const jwt = require('jsonwebtoken');

//define a lista de rotas publicas da aplicação
const rotasPublicas  = {

}

module.exports = (req, res, next) => {
    req.logger.info('Verificando permissão de acesso a', `rota: ${req.url}`);

    //headers usado para acessar o header do BD
    const authorization = req.headers.authorization;

    //envia uma mensagem de erro 401 se o header de autorização não for enviado
    if (!authorization) {
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
    jwt.verify(token, process.env.CHAVE_SECRETA_JWT, (err, decoded) => {
        if(err) {
            req.logger.error('erro ao decodificar o token JWT', `token = ${token}`);
            return res.status(401).json({
                status: 401,
                erro: 'Acesso negado! Problema ao decodificar o token de autorização!'
            });
        }
        req.logger.debug('token JWT decodificado com sucesso!', `idUsuario = ${decoded._id}`);

        //TODO: carregar o usuário a partir do banco de dados
        const usuario = {
            id: decoded._id
        }

        //atribui a propriedade usuario da requisição, quem é o usuário autenticado
        req.usuario = usuario;

    });



    next();
}