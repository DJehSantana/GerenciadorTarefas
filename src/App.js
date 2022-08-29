//Importando o express
const express =  require('express');
// Classe principal onde ficará nossa aplicação

class App {
    iniciar() {
        //1 Passo: configurar o express
        //this - fazer referencia dentro do escopo da propria classe 
        this.#configurarExpress();
        //2 Passo: carregar controllers
        //3 Passo: Iniciar o servidor
    }

    //configurando express
    //método privado porque será usado somente dentro do escopo da classe
    #configurarExpress = () => {
        //criando instancia do express para gerenciar o servidor 
        this.express = express();

        //registrando os middlewares para fazer a conversão das requisições da API
        this.express.use(express.urlencoded({extended: true}));
        this.express.use(express.json());
    }
}

module.exports = App;