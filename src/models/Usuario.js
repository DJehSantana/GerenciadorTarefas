//importando biblioteca mongoose
const mongoose = require('mongoose');
//importando classe Schema do mongoose
const Schema =  mongoose.Schema;
//importando classe do md5
const md5 = require('md5');

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

//.pre - adicionando um evento antes de determinada ação
//save - neste caso antes de salvar o usuário no banco de dados
UsuarioSchema.pre('save', function (next) {
    //não usar o arrow function pq não foi criada uma classe, então não conseguiriamos usar o this
    //sobrescreve a senha do usuário pela senha criptografada pelo md5
    this.senha = md5(this.senha);
    next();

})

//faz o link do schema com a collection 'usuarios'
//usuarios será o nome da collection que será criada no MongoDB
const Usuario = mongoose.model('usuarios', UsuarioSchema);

module.exports = Usuario;

