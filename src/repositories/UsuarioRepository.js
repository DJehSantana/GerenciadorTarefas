// faz a  simulação da definição da interface do repositório de usuários
//qualquer implementação de repositório de usuario vai precisar ter os métodos definidos aqui

module.exports = (Implementacao) => {
    //se a classe final não tiver um método cadastrar, vai lançar um erro
    if (!Implementacao.cadastrar) {
        throw new Error(`A classe ${Implementacao} não implementou o método cadastrar!`)
    }
    return Implementacao;
}
