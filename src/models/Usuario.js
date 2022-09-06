//importando biblioteca mongoose
const mongoose = require('mongoose');
//importando ferramenta Schema
const Schema =  mongoose.Schema;

//mensagem de erro para campos required
const erroRequired = '*Campo obrigatório!';

const UsuarioSchema = new Schema ({
    //definição do nome usando objeto tipo json
    nome: {
        //tipo de dado que será armazenado
        type: String,
        //definindo como obrigatório e definindo mensagem de erro
        required: [true, erroRequired]
    },

    email: {
        type: String,
        required: [true, erroRequired]
    },

    senha: {
        type: String,
        required: [true, erroRequired]
    }
})