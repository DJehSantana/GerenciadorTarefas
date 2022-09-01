const mongoose = require('mongoose');

class MongoDbHelper{
    //método estático que faz a conexão com o mongoDb
    //como o método é estático não é necessário instanciar um objeto para usar
    static conectar() {
        //realizando a conexão com o mongoDb e retorna a conexão na constante
        const conexao = mongoose.connect(process.env.MONGODB_STRING_CONEXAO, {
            //criando objeto com duas opções padrões que são recomendadas na 
            //documentação do mongoose
                useNewUrlParser: true,
                useUnifiedTopology: true
        });

        //quando a conexão for realizada com sucesso ele vai executar a função anônima
        mongoose.connection.on('connected', () => console.log('conectado ao BD'));
        //se falhar a conexão vai mostrar a msg de erro
        mongoose.connection.on('error', () => console.error('Erro ao conectar com o BD', e.message));
        
    }

}

module.exports = MongoDBHelper;