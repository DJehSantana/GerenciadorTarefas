const HttpController = require('./HttpController');
const TarefaService = require('../services/TarefaService');

class TarefaController extends HttpController {
    configurarRotas(baseUrl) {
        //através do método http get receberá informações das tarefas através do método listar
        this.express.get(`${baseUrl}/tarefa`, this.listar.bind(this));
    }

    async listar(req, res) {
        //instancia da classe TarefaService pega o Id do usuário autenticado como parametro
        const service = new TarefaService(req.usuario.id);
        res.json([]);
    }
}

module.exports = TarefaController;