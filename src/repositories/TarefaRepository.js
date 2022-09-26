// faz a definição da interface do repositorio de tarefas
// força a implementação dos métodos listados

module.exports = (Implementacao) => {
    // método create
    if (!Implementacao.cadastrar) {
        throw new Error(`A classe ${Implementacao} não implementou o método cadastrar`);
    }
    // método put
    if (!Implementacao.editar) {
        throw new Error(`A classe ${Implementacao} não implementou o método editar`);
    }
    // método delete
    if (!Implementacao.deletar) {
        throw new Error(`A classe ${Implementacao} não implementou o método deletar`);
    }

   if (!Implementacao.filtrarTarefas) {
        throw new Error(`A classe ${Implementacao} não implementou o método filtrarTarefas`);
    }

    if (!Implementacao.buscarPorId) {
        throw new Error(`A classe ${Implementacao} não implementou o método buscarPorId`);
    }

    return Implementacao;
}