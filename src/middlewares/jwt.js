const jwt = require('jsonwebtoken');

//define a lista de rotas publicas da aplicação
const rotasPublicas  = {

}

module.exports = (req, res, next) => {
    req.logger.info('Verificando permissão de acesso a', `rota: ${req.url}`);

    //headers usado para acessar o header do BD
    const authorization = req.headers.authorization;

    //envia uma mensagem de erro 401 se o header não for enviado
    if (!authorization) {
        res.status(401).json({
            status: 401,
            erro: 'acesso negado, você precisa enviar o header authorization'
        });
        
        console.log('Falha na autorização');
        return res;
    }

    next();
}