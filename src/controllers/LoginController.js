//importando classe HttpController
const HttpController = require('./HttpController');

//criando classe Login
class LoginController extends HttpController{
    configurarRotas(baseUrl) {
        //post - método utilizado para receber a requisição do login
        //1° parametro define a rota
        //2° parametro define quem vai manipular essa rota
        this.express.post(`${baseUrl}/login`, (req, res) => {
            //função aônima chama o método login, passando os objetos req e res
            //do express como parâmetros
            this.login(req, res);
        })
    }

    login (req, res) {
        //se a autenticação do login tiver sucesso, retorna o conteúdo do res
        res.json({
            token: 'token gerado pela api'
        })
    }
}

module.exports = LoginController;