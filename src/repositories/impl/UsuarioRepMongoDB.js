const UsuarioRepository = require('../UsuarioRepository');

class UsuarioRepMongoDB {

}

//ao exportar vai chamar a arrow function do UsuarioRepository que vai verificar a implementação do método cadastrar
module.exports = UsuarioRepository(UsuarioRepMongoDB);