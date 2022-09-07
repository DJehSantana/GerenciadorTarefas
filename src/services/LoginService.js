const jwt = require('jsonwebtoken');

class LoginService{
    //criando o método para realizar o login, deve ser público para poder ser usado em vários lugares
    logar (login, senha) {
        return{
            id: 1,
            nome: 'usuariox',
            email: login,
            token: 'token'
        }
    }

}

module.exports = LoginService;