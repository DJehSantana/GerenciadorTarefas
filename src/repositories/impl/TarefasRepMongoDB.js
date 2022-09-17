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
        }
    }

}

module.exports = TarefaRepository(TarefasRepMongoDB);