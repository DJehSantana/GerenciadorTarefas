//importando classe HttpController
const HttpController = require('./HttpController');
const LoginService = require('../services/LoginService');

//criando classe Login
class LoginController extends HttpController {
    //implementando o método da classe mãe
    configurarRotas(baseUrl) {
        //post - método utilizado para receber a requisição do login
        //1° parametro define a rota
        //2° parametro define quem vai manipular essa rota
        this.express.post(`${baseUrl}/login`, this.login.bind(this));
    }

    async login(req, res) {
        try {
            //autenticar login
            const body = req.body;
            //verifica se body está vazio ou se usuário não passou login ou senha
            if (!body || !body.login || !body.senha) {
                req.logger.info('requisição de login inválida');
                //retorna resposta de erro
                return res.status(400).json({
                    status: 400,
                    erro: "Parâmetros de entrada inválidos!"
                })

            }
            //instanciando um objeto da classe LoginService
            const service = new LoginService();

            //objeto da classe LoginService chama o método logar
            //método logar espera um login e uma senha como parametros
            const resultado = await service.logar(body.login, body.senha);

            //caso login e senha vazios ou inválidos, retorna erro
            if (!resultado) {
                return res.status(400).json({
                    erro: 'Login ou senha inválidos!',
                    status: 400
                });
            }

            //o método stringify da classe JSON transforma o objeto json em uma string
            req.logger.info('requisição de login realizada com sucesso', `resultado = ${JSON.stringify(resultado)}`);
            //se a autenticação do login tiver sucesso, retorna o conteúdo do res
            res.json(resultado);

        } catch (error) {
            req.logger.error('erro ao realizar login, erro= ' + error.message);
            res.status(500).json({
                erro: 'Problema ao realizar login, tente novamente',
                status: 500
            });
        }

    }
}

module.exports = LoginController;