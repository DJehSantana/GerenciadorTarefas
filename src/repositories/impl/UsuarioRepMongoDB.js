const RepositorioUsuario = require('../RepositorioUsuario');

class UsuarioRepMongoDB {

}

//ao exportar vai chamar a arrow function do RepositorioUsuario que vai verificar a implementação do método cadastrar
module.exports = RepositorioUsuario(UsuarioRepMongoDB);