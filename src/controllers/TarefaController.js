const HttpController = require('./HttpController');
const TarefaService = require('../services/TarefaService');

class TarefaController extends HttpController {
    configurarRotas(baseUrl) {
        //através do método http get receberá informações das tarefas através do método listar
        this.express.get(`${baseUrl}/tarefa`, this.filtrar.bind(this));
    }

    async filtrar(req, res) {
        
        try {
            //instancia da classe TarefaService pega o Id do usuário autenticado como parametro
            const service = new TarefaService(req.usuario.idUsuario);

            //chama o servico para retornar a lista de tarefas
            //o método listar vai receber como parametro o query
            //o query é um objeto json com os parametros da string query
            const tarefas = await service.filtrar(req.query);
            res.json(tarefas);
            
        } catch (e) {
            req.logger.error('erro ao processar requisicao', 'erro= ' + e.message);
            res.status(500).json({
                status: 500,
                erro: 'Erro ao filtrar tarefa, tente novamente mais tarde!'
            });
        }
    }
}

module.exports = TarefaController;