const HttpController = require("./HttpController");

class TarefaController extends HttpController {
    configurarRotas(baseUrl) {
        //através do método http get receberá informações das tarefas através do método listar
        this.express.get(`${baseUrl}/tarefa`, this.listar.bind(this));
    }

    async listar(req, res) {
        res.json([]);
    }
}

module.exports = TarefaController;