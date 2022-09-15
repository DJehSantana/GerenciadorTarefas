//importando repositorio do usuario, usamos a implementação concreta
const UsuarioRepository = require('../repositories/impl/UsuarioRepMongoDB');

class UsuarioService{
    //lógica do cadastro do usuario
    async cadastrar(dadosUsuario) {
        const listaErros = [];
        //validação dos dados recebidos
        if (!dadosUsuario.nome || !dadosUsuario.nome.trim()) {
            //método push adiciona o erro no final do array
            listaErros.push('Nome do usuário inválido');
        }
        if (!dadosUsuario.email || !dadosUsuario.email.trim()) {
            listaErros.push('Email do usuário inválido')
        } else{
            //o indexOf vai verificar se o email possui um @ e um ., se não possuir terá valor -1
            //mas se o valor for diferente de menos 1, as constantes receberão valor true
            const temArroba = dadosUsuario.email.indexOf('@') !== -1;
            const temPonto = dadosUsuario.email.indexOf('.') !== -1;

            //verifica se as constantes receberam true, do contrário acrescenta o erro a listaErros            
            if (!temArroba || !temPonto) {
                listaErros.push('Email do usuário inválido!')
            }

        }

        if (!dadosUsuario.senha || !dadosUsuario.senha.trim()) {
            listaErros.push('Senha Inválida')
        }

        //criando objeto para retornar os erros 
        const retorno = {
            erros: null,
            usuario: null
        };

        //se houver erros, adiciona a lista de erros a propriedade erros
        if (listaErros.length) {
           retorno.erros = listaErros; 
        } else {
            //faz o cadastro do usuário efetivamente no banco de dados
            const usuarioCadastrado = await UsuarioRepository.cadastrar({
                nome: dadosUsuario.nome,
                email: dadosUsuario.email,
                senha: dadosUsuario.senha
            });
           retorno.usuario = usuarioCadastrado; 
        }

        return retorno;
    }

}

module.exports = UsuarioService;