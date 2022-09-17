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
}

module.exports = TarefaService;