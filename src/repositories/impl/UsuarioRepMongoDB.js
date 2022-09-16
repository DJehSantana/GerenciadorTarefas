const UsuarioRepository = require('../UsuarioRepository');
//importando model do usuario
const Usuario = require('../../models/Usuario');

class UsuarioRepMongoDB {
    //repositorio recebe os dados do usuario e passa pro modelo
    static cadastrar(dadosUsuario) {
        //método create do mongoose, vai tentar realizar o cadastro do usuario
        return Usuario.create(dadosUsuario);
    }
    // define o método filtrar com um parâmetro default sendo um objeto com valor vazio
    static async filtrar(filtro = {}) {
        let usuarios = await Usuario.find(filtro);

        //verifica lista de usuarios
        if (usuarios) {
            //caso usuario esteja cadastrado retorna um objeto com os dados do usuario
            usuarios = usuarios.map(u => ({
                id: u._doc._id,
                nome: u._doc.nome,
                email: u._doc.email
            }))
        }

        return usuarios;
    }
}

//ao exportar vai chamar a arrow function do UsuarioRepository que vai verificar a implementação do método cadastrar
module.exports = UsuarioRepository(UsuarioRepMongoDB);