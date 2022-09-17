const HttpController = require('./HttpController');
const TarefaService = require('../services/TarefaService');

class TarefaController extends HttpController {
    configurarRotas(baseUrl) {
        //através do método http get receberá informações das tarefas através do método listar
        this.express.get(`${baseUrl}/tarefa`, this.listar.bind(this));
        //cadastrar tarefas com post
        this.express.post(`${baseUrl}/tarefa`, this.cadastrar.bind(this));
    }

    async listar(req, res) {
        
        try {
            //instancia da classe TarefaService pega o Id do usuário autenticado como parametro
            const servico = new TarefaService(req.usuario.id);

            //chama o servico para retornar a lista de tarefas
            //o método listar vai receber como parametro o query
            //o query é um objeto json com os parametros da string query
            const tarefas = await servico.filtrar(req.query);
            res.json(tarefas);
            
        } catch (e) {
            req.logger.error('erro ao processar requisicao', 'erro= ' + e.message);
            res.status(500).json({
                status: 500,
                erro: 'Erro ao filtrar tarefa, tente novamente mais tarde!'
            });
        }
    }

    async cadastrar(req, res) {
        try {
            const servico = new TarefaService(req.usuario.id);
            //passar responsabilidade de validação dos dados para dentro do serviço
            const resultado = await servico.cadastrar(req.body);

            if(resultado.erros) {
                return res.status(400).json({
                    status: 400,
                    erro: resultado.erros
                })
            }

            return res.json({
                msg: 'Tarefa cadastrada com sucesso'
            })

            
        } catch (e) {
            req.logger.error('erro ao processar requisicao de cadastro', 'erro= ' + e.message);
            res.status(500).json({
                status: 500,
                erro: 'Erro ao filtrar tarefa, tente novamente mais tarde!'
            });
        }
    }
}

module.exports = TarefaController;