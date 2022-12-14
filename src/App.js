//Importando o express
const express =  require('express');
//importando dependencia e arquivo swagger
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger/swagger.json');
//importando Controllers
const LoginController = require('./controllers/LoginController');
const UsuarioController = require('./controllers/UsuarioController');
const TarefaController = require('./controllers/TarefaController');
//importando enums
const appConstantes = require('./enums/appConstantes');
//importando helper de conexão
const MongoDBHelper = require('./helpers/MongoDBHelper');
//importando os middlewares
const logger = require('./middlewares/logger');
const jwt = require('./middlewares/jwt');
const cors = require('./middlewares/cors');

// Classe principal onde ficará nossa aplicação
class App {
    //propriedade privada da classe App
    #controllers;

    iniciar() {
        //this - fazer referencia dentro do escopo da propria classe 
        this.#configurarExpress();
        //2 Passo: realizar conexão como BD
        this.#configurarBD();
        //3 Passo: carregar controllers
        this.#carregarControllers();
        //4 Passo: Iniciar o servidor
        this.#iniciarServidor();
    }
    
    //1 Passo: configurar o express
    //método privado porque será usado somente dentro do escopo da classe
    #configurarExpress = () => {
        //criando instancia do express para gerenciar o servidor 
        this.express = express();
        
        // registrando o middleware de log para exibir no terminal toda vez que houver uma nova requisição
        this.express.use(logger);

        //registrando os middlewares para fazer a conversão das requisições da API
        this.express.use(express.urlencoded({extended: true}));
        this.express.use(express.json());

        //registra o middleware para habilitar requisições de outros domínios
        this.express.use(cors);

        //registra o middleware do Jwt para fazer validação do acesso as rotas das requisições recebidas
        this.express.use(jwt);

        //configura o swagger da aplicação para servir a documentação
        this.express.use(
            `${appConstantes.BASE_API_URL}/docs`,
            swaggerUi.serve,
            swaggerUi.setup(swaggerFile)
        )

    }

    //método responsável por configurar o Bd
    #configurarBD = () => {
        //chamando o método estático da classe helper
        MongoDBHelper.conectar();
    }

    //método responsável por carregar todos os controllers da aplicação
    #carregarControllers = () => {
        this.#controllers = [
            //passando a instancia do express como parâmetro para os objetos 
            // das classes dos controllers (a msma será usada no constructor)
            new LoginController(this.express),
            new UsuarioController(this.express),
            new TarefaController(this.express)
        ]
    }

    #iniciarServidor = () => {
        //tenta pegar a porta a partir da variável de ambiente EXPRESS_PORT
        //caso esta não esteja definida, usa a porta padrão 3001
        const porta = process.env.PORT || 3000;
        //listen - recebe como parâmetro a porta e um callback 
        this.express.listen(porta, () => {
            //mensagem de sucesso caso o express consiga se conectar a porta
            console.log(`API executando na porta: ${porta} `);
        })
    }
}

module.exports = App;