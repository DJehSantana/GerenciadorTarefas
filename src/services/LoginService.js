const jwt = require('jsonwebtoken');
const md5 = require('md5');
const UsuarioRepository = require('../repositories/impl/UsuarioRepMongoDB');

class LoginService{

//TODO: verificar se o usuário está cadastrado no banco de dados

    //criando o método para realizar o login, deve ser público para poder ser usado em vários lugares
    async logar (login, senha) {
        const filtro = {
            email: login,
            senha: md5(senha)
        }
        let usuario = null;
        //buscando email e senha no BD através do método filtrar
        const usuarios = await UsuarioRepository.filtrar(filtro);
        //caso o login e senha estejam corretos, retorna um objeto com as informações do usuário
        if (usuarios && usuarios.length) {
            usuario = {
                id: usuarios[0]._doc._id,
                nome: usuarios[0]._doc.nome,
                email: usuarios[0]._doc.email
            } 
            //caso login e senha não sejam válidos retorna um valor null para o método logar           
        }else {
            return null;
        }
        
        //gera o token de acesso usando o JWT e atribui a constante token
        const token = jwt.sign({_id: usuario.id}, process.env.CHAVE_SECRETA_JWT) //variável de ambiente que terá a chave para descriptografar o token
        
        //devolve as informações do usuário autenticado com o seu token de acesso
        return{
            ...usuario,
            token         
        }
    }

}

module.exports = LoginService;