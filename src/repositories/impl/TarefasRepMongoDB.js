const Tarefa = require('../../models/Tarefa');
const TarefaRepository = require('../TarefaRepository');

class TarefasRepMongoDB extends TarefaRepository {
    //implementando métodos da classe TarefaRepository

    //recebe os dados da tarefa e realiza o cadastro
    static cadastrar(dadosTarefa) {
        return Tarefa.create(dadosTarefa);
    }

    //recebe o id e os dados da tarefa que serão editados
    static editar(idTarefa, dadosTarefa) {
        return Tarefa.findByIdAndUpdate(idTarefa, dadosTarefa);
    }

    //recebe o id dad tarefa que será deletada do BD
    static deletar(idTarefa) {
        return Tarefa.findByIdAndDelete(idTarefa);
    }

    //filtra tarefa por usuario periodo e status
    static filtrarTarefas({
        //parametros virão como String
        inicio,
        conclusao,
        idUsuario        
    }) {
        //atribui o idUsuario da tarefa recebido por parametro a constante query
        const query = {
            idUsuario
        }

        // caso o parametro inicio que corresponde a data de inicio da tarefa não estiver vazio        
        if (inicio && inicio.trim()) {
            // a string recebida no parametro será convertida em data
            const dataInicio = new Date(inicio);
            //filtrar tarefas que a data prevista de conclusao é maior ou igual a data de inicio
            query.dataPrevistaConclusao = {
                //filtro do mongoose $gte = maior ou igual que
                $gte: dataInicio
            }
        }

        if (conclusao && conclusao.trim()) {
            //string recebida como parametro sera convertida para data
            const dataConclusao = new Date(conclusao);
            if (!query.dataPrevistaConclusao) {
                query.dataPrevistaConclusao = {};
            }
            //filtra tarefas cuja data de conclusao é menor ou ingual a data prevista de conclusao
            query.dataPrevistaConclusao.$lte = dataConclusao;

        }
    }

}

module.exports = TarefaRepository(TarefasRepMongoDB);