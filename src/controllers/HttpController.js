//importando enum
const appConstantes = require('../enums/appConstantes');
//criando classe mãe dos cotrollers
class HttpController {
    //recebendo instancia do express do App por parâmetro
    constructor(express){
        //verificando se foi passada a instancia do express
        // o servidor nem vai subir se não for passada a instancia pro HttpController
        if (!express) {
            throw new Error ('A instancia do express é obrigatória!')
        }

        //passar a instancia do express para um atributo da classe
        //esse atributo será usado pelas classes filhas para fazer os registros das rotas utilizadas na aplicação
        this.express = express;
        this.configurarRotas(appConstantes.BASE_API_URL);
    }
}

module.exports = HttpController;