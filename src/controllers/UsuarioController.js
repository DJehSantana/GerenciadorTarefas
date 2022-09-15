const HttpController = require('./HttpController');
const UsuarioService = require('../services/UsuarioService');

class UsuarioController extends HttpController{
    //implementando método da classe mãe
    configurarRotas(baseUrl){
        //define a rota de cadastro de usuario
        //bind(this) - indica que o método cadastrar será chamado no contexto da propria classe UsuarioCOntroller
        this.express.post(`${baseUrl}/usuario`, this.cadastrar.bind(this));
    }

    async cadastrar(req, res) {
        //receber dados do usuário para cadastro
        const dadosUsuario = req.body;
        //qualquer erro ou exceção que acontecer será tratada e devolvida para o usuário
        try {
            //instanciar o usuarioservice
            const servico = new UsuarioService();
            const retornoServico = await servico.cadastrar(dadosUsuario);

            //verificar se cadastro foi bem sucedido
            if (retornoServico.erros) {
                return res.status(400).json({
                    status: 400,
                    //o join vai transformar o array em uma string unica separada por virgula
                    erro: retornoServico.erros.join(',')
                })
            }
            //garantir o recebimento da requisição no método cadastrar 
            req.logger.info('Usuário cadastrado com sucesso!');
            //devolve uma mensagem quando o cadastro tiver sucesso
            res.json({
                msg: 'Usuário criado com sucesso no banco de dados'
            });
            
        } catch (error) {
            req.logger.error('Erro ao cadastrar usuário, error= ' + error.message);
            res.status(500).json({
                erro: 'Problema ao cadastrar usuáro! Tente novamente mais tarde!'
            })
        }
    }



}

module.exports = UsuarioController;