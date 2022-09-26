const TarefaRepository = require('../repositories/impl/TarefasRepMongoDB');

class TarefaService {
    constructor(idUsuario) {
        //atribui o Id do usuario recebido por parâmetro a uma propriedade da classe
        this.idUsuario = idUsuario;
    }

    //método responsável por fazer o filtro das tarefas no banco de dados
    async filtrar(filtro) {
        filtro.idUsuario = this.idUsuario;
        return TarefaRepository.filtrarTarefas(filtro)
    }
    //validações de cadastro da tarefa
    async cadastrar(dadosTarefa) {
        const erros = [];
        if (!dadosTarefa) {
            erros.push('Favor enviar os dados para cadastro da tarefa');            
        } else {
            //todas as outras validações dependem de termos recebido algum dado da tarefa
            if (!dadosTarefa.nome || !dadosTarefa.nome.trim()) {
                //verificar preenchimento correto de campos obrigatórios
                erros.push('Nome da tarefa é obrigatório');
            } else if (dadosTarefa.nome.length < 4) {
               erros.push('Nome da tarefa deve ter pelo menos 4 caracteres')
            }

            if (!dadosTarefa.dataPrevistaConclusao || !dadosTarefa.dataPrevistaConclusao.trim()) {
                erros.push('Data prevista de conclusao é obrigatoria');
            }            
        }

        //objeto resposta, dados iniciados nulos por padrão
        const resposta = {erros: null, tarefa: null}
        //caso tenha erros listados, atribui lista a propriedade erros do objeto resposta
        if(erros.length) {
            resposta.erros = erros;
        } else {
            const dataPrevistaConclusao = new Date(dadosTarefa.dataPrevistaConclusao);
            //usando operador ternario para verificar se tem data de conclusão informada
            const dataConclusao = dadosTarefa.dataConclusao
            //caso a data tenha sido informada converte para tipo data e atribui a constante
            ? new Date(dadosTarefa.dataConclusao)
            : null;

            // criando objeto da tarefa
            const tarefa = {
                nome: dadosTarefa.nome,
                dataPrevistaConclusao,
                dataConclusao,
                idUsuario: this.idUsuario
            }

            //atribuindo a propriedade tarefa o cadastro da tarefa
            resposta.tarefa = await TarefaRepository.cadastrar(tarefa)
        }

        return resposta;
    }

    async editar (idTarefa, dadosTarefa) {
        const erros = [];
        //validando se foi passado o id da tarefa a ser editada
        if (!idTarefa) {
            erros.push('ID da tarefa é obrigatório!')
        } else {
            tarefaBD = await TarefaRepository.buscarPorId(idTarefa);
            //se a tarefa não existir no banco ou pertencer a outro usuário, retorna erro a lista
            if (!tarefaBD || !tarefaBD.idUsuario !== this.idUsuario) {
                erros.push('Tarefa não foi encontrada!');
            }
        }
        //se tiver erros, retorna a lista
        if (erros.length) {
            return {
                erros
            }
        }
        
        const dadosAtualizar = {};

        //verificando dados que serão atualizados
        //inclui no dados atualizar todos os dados passados ao método
        if (dadosTarefa.nome && dadosTarefa.nome.trim()) {
            dadosAtualizar.nome = dadosTarefa.nome;
        }

        if(dadosTarefa.dataPrevistaConclusao && 
            dadosTarefa.dataPrevistaConclusao.trim()) {
                dadosAtualizar.dataPrevistaConclusao = new Date(dadosTarefa.dataPrevistaConclusao);
        }

        if (dadosTarefa.dataConclusao && dadosTarefa.dataConclusao.trim()) {
            dadosAtualizar.dataConclusao = new Date(dadosTarefa.dataConclusao);
        }

        //chamando o repositório passando como parametro os dados a ser editados
        const tarefaEditada = await TarefaRepository.editar(idTarefa, dadosAtualizar);

        //retorna a tarefa editada para o controller
        return tarefaEditada;
    }
}

module.exports = TarefaService;