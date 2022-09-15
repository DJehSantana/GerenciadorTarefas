const HttpController = require('./HttpController');
const UsuarioService = require('../services/UsuarioService');

class UsuarioController extends HttpController{
    //implementando método da classe mãe
    configurarRotas(baseUrl){
        //define a rota de cadastro de usuario
        //bind(this) - indica que o método cadastrar será chamado no contexto da propria classe UsuarioCOntroller
        this.express.post(`${baseUrl}/usuario`, this.cadastrar.bind(this));
    }

    cadastrar(req, res) {
        //receber dados do usuário para cadastro
        const dadosUsuario = req.body;
        //garantir o recebimento da requisição no método cadastrar 
        req.logger.info('Usuário cadastrado com sucesso!');
        res.json(dadosUsuario);
    }



}

module.exports = UsuarioController;