const jwt = require('jsonwebtoken');

class LoginService{
//TODO: verificar se o usuário está cadastrado no banco de dados

    //criando o método para realizar o login, deve ser público para poder ser usado em vários lugares
    logar (login, senha) {
        const usuario = {
            id: 1
        }
        //gera o token de acesso usando o JWT
        jwt.sign({
            //usa o _ pra coisas que são usadas apenas dentro da aplicação
            _id: usuario.id
        }, process.env.CHAVE_SECRETA_JWT) //variável de ambiente que terá a chave para descriptografar o token
        
        //devolve as informações do usuário autenticado com o seu token de acesso
        return{
            id: 1,
            nome: 'usuariox',
            email: login,
            token: 'token'
        }
    }

}

module.exports = LoginService;