const UsuarioRepository = require('../UsuarioRepository');
//importando model do usuario
const Usuario = require('../../models/Usuario');

//utilitário para a classe do repositório que faz a filtragem dos dados do usuário do BD
//e transforma esses dados no formato que a aplicação espera
const dadosFormatados = (usuarioBD) => {
    return {
        id: usuarioBD._doc._id.toString(),
        nome: usuarioBD._doc.nome,
        email: usuarioBD._doc.email
    }
}

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
            //caso usuario esteja cadastrado retorna um objeto com os dados do usuario formatados
            usuarios = usuarios.map(u => dadosFormatados(u));
        }

        return usuarios;
    }

    static async filtrarPorId(idUsuario) {
        //busca um usuario no BD pelo id passado por parâmetro
        const usuario = await Usuario.findById(idUsuario);
        //caso o id seja encontrado, retorna um objeto com os dados formatados do usuario
        if (usuario) {
            return dadosFormatados(usuario)
        }
        //caso usuario não seja encontrado retorna null 
        return null;
    }
}

//ao exportar vai chamar a arrow function do UsuarioRepository que vai verificar a implementação do método cadastrar
module.exports = UsuarioRepository(UsuarioRepMongoDB);