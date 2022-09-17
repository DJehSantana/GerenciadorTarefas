const TarefaRepository = require('../repositories/impl/TarefasRepMongoDB');

class TarefaService {
    constructor(idUsuario) {
        //atribui o Id do usuario recebido por parâmetro a uma propriedade da classe
        this.idUsuario = idUsuario;
    }

    //método responsável por fazer o filtro das tarefas no banco de dados
    async filtrar(filtro = {}) {
        filtro.idUsuario = this.idUsuario;
        return TarefaRepository.filtrarTarefas(filtro)
    }
    //validações de cadastro da tarefa
    async cadastrar(dadosTarefa) {
        const erros = [];
        if (!dadosTarefa) {
            erros.push('Favor enviar os dados para cadastro da tarefa');            
        } else {
            if (!dadosTarefa.nome || !dadosTarefa.nome.trim()) {
                erros.push('Nome da tarefa é obrigatório');
            } else if (dadosTarefa.nome.length < 4) {
               erros.push('Nome da tarefa deve ter pelo menos 4 caracteres')
            }

            if (!dadosTarefa.dataPrevistaConclusao || !dadosTarefa.dataPrevistaConclusao.trim()) {
                erros.push('Data prevista de conclusao é obrigatoria');
            }
        }

        const resposta = {erros: null, tarefa: null}
        //caso tenha erros listados, atribui lista a propriedade erros do objeto resposta
        if(erros.length) {
            resposta.erros = erros;
        } else {
            const dataPrevistaConclusao = new Date(dadosTarefa.dataPrevistaConclusao);
        }
    }
}

module.exports = TarefaService;