//chamando método para carregar automaticamente as variáveis de ambiente
require('dotenv').config();
//importando classe App
const App = require('./src/App');

//criando instancia da classe App
const app = new App();
//chamando método iniciar
app.iniciar();

//link de convite postman
//https://app.getpostman.com/join-team?invite_code=4440f82c6b1da26fcbe591946a4b4c83