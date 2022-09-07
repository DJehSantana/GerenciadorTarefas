//importando classe HttpController
const HttpController = require('./HttpController');
const LoginService = require('../services/LoginService');

//criando classe Login
class LoginController extends HttpController{
    //implementando o método da classe mãe
    configurarRotas(baseUrl) {
        //post - método utilizado para receber a requisição do login
        //1° parametro define a rota
        //2° parametro define quem vai manipular essa rota
        this.express.post(`${baseUrl}/login`, this.login.bind(this));
    }

    login(req, res) {
        //autenticar login
        const body = req.body;
        //verifica se body está vazio ou se usuário não passou login ou senha
        if (!body || !body.login || !body.senha) {
            //retorna resposta de erro
            return res.status(400).json({
                status: 400,
                erro: "Parâmetros de entrada inválidos!"
            })

        }
        //instanciando um objeto da classe LoginService
        const service = new LoginService();
        //método logar espera um login e uma senha como parametros
        const resultado = service.logar(body.login, body.senha);
        //se a autenticação do login tiver sucesso, retorna o conteúdo do res
        res.json(resultado);
    }
}

module.exports = LoginController;