//Importando o express
const express =  require('express');
//importando classe Login Controller
const LoginController = require('./controllers/LoginController');
// Classe principal onde ficará nossa aplicação

class App {
    //propriedade privada da classe App
    #controllers;

    iniciar() {
        //this - fazer referencia dentro do escopo da propria classe 
        this.#configurarExpress();
        //2 Passo: carregar controllers
        this.#carregarControllers();
        //3 Passo: Iniciar o servidor
        this.#iniciarServidor();
    }
    
    //1 Passo: configurar o express
    //método privado porque será usado somente dentro do escopo da classe
    #configurarExpress = () => {
        //criando instancia do express para gerenciar o servidor 
        this.express = express();

        //registrando os middlewares para fazer a conversão das requisições da API
        this.express.use(express.urlencoded({extended: true}));
        this.express.use(express.json());

        // registrando o middleware de log para exibir no terminal toda vez que
        //houver uma nova requisição
        this.express.use((req, res, next) => {
            console.log(
                `requisição recebida!,
                URl: ${req.url},
                Method_HTTP: ${req.method}
            `);
            next();
        })
    }

    //método responsável por carregar todos os controllers da aplicação
    #carregarControllers = () => {
        this.#controllers = [
            //passando a instancia do express como parâmetro para o 
            //objeto da classe LoginController(a msma será usada no constructor)
            new LoginController(this.express)
        ]
    }

    #iniciarServidor = () => {
        //tenta pegar a porta a partir da variável de ambiente EXPRESS_PORT
        //caso esta não esteja definida, usa a porta padrão 3001
        const porta = process.env.EXPRESS_PORT || 3002;
        //listen - recebe como parâmetro a porta e um callback 
        this.express.listen(porta, () => {
            //mensagem de sucesso caso o express consiga se conectar a porta
            console.log(`API executando na porta: ${porta} `);
        })
    }
}

module.exports = App;