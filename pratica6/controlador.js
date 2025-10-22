const Tarefa = require('./modelo.js');

async function adicionarTarefa(nome) {
    const tarefa = new Tarefa(nome, false);
    await tarefa.init();
    await tarefa.inserir();
}

async function buscarTarefa(nome) {
    const tarefa = new Tarefa(nome, null);
    await tarefa.init();
    await tarefa.buscar();
    return tarefa;
}

async function atualizarTarefa(nome, concluida) {
    const tarefa = new Tarefa(nome, concluida);
    await tarefa.init();
    await tarefa.buscar();
    if (tarefa.id) {
        tarefa.concluida = concluida;
        await tarefa.alterar();
    }
}

module.exports = { adicionarTarefa, buscarTarefa, atualizarTarefa, removerTarefa };