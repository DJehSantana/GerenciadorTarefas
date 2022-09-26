const Tarefa = require('../../models/Tarefa');
const TarefaRepository = require('../TarefaRepository');
//importando enum dos status tarefa
const statusTarefa = require('../../enums/statusTarefa');

//formata os dados da Tarefa que vem do BD
const tarefaFormatada = (tarefaBD) => {
    return {
        id: tarefaBD._doc._id,
        nome: tarefaBD._doc.nome,
        dataPrevistaConclusao: tarefaBD._doc.dataPrevistaConclusao,
        dataConclusao: tarefaBD._doc.dataConclusao,
        idUsuario: tarefaBD._doc.idUsuario
    }
}

class TarefasRepMongoDB {
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
    static async filtrarTarefas({
        //parametros virão como String
        idUsuario,        
        inicio,
        status,
        conclusao
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

        if (status && status.trim()){
            //converte status da tarefa recebido por parametro em numero inteiro
            const statusInt = parseInt(status);
            //verifica qual o status da tarefa
            if (statusInt === statusTarefa.PENDENTE) {
                query.dataConclusao = null;
            } else if (statusInt === statusTarefa.CONCLUIDO) {
                // filtra as tarefas que a data de conclusao é diferente de null ($ne !=)
                query.dataConclusao = {
                    $ne: null
                }
            }
        }

        const tarefas = await  Tarefa.find(query);

        if (tarefas) {
           //map - pega cada tarefa que veio do BD e 
           //retorna as tarefas formatadas de acordo ao modelo esperado
           return tarefas.map(t => tarefaFormatada(t));
        }

        return [];
    }

    //busca tarefas por Id
    static async buscarPorId(idTarefa) {
        //busca um usuario no BD pelo id passado por parâmetro
        const tarefaBD = await Tarefa.findById(idTarefa);
        //caso o id seja encontrado, retorna um objeto com os dados formatados da tarefa
        if (tarefaBD) {
            return tarefaFormatada(tarefaBD);
        }
        //caso usuario não seja encontrado retorna null 
        return null;
    }

}

module.exports = TarefaRepository(TarefasRepMongoDB);