const readline = require('readline-sync');

const controlador = require('./controlador.js');

function menu() {
    console.log('1. Adicionar tarefa');
    console.log('2. Buscar tarefa');
    console.log('3. Atualizar tarefa');
    console.log('4. Remover tarefa');
    console.log('5. Sair');
}

async function escolherOpcao(opcao) {
    switch (opcao) {
        case '1':
            let nomeAdd = readline.question('Nome da tarefa: ');
            await controlador.adicionarTarefa(nomeAdd);
            console.log('Tarefa adicionada!');
            break;
        case '2':
            let nomeBusca = readline.question('Nome da tarefa: ');
            let tarefa = await controlador.buscarTarefa(nomeBusca);
            console.log(tarefa);  // Imprime as propriedades
            break;
        case '3':
            let nomeAtualizar = readline.question('Nome da tarefa: ');
            let concluida = readline.question('Concluída (true/false): ');  // Assumindo string, converta se necessário
            await controlador.atualizarTarefa(nomeAtualizar, concluida === 'true');
            console.log('Tarefa atualizada!');
            break;
        case '4':
            let nomeRemover = readline.question('Nome da tarefa: ');
            await controlador.removerTarefa(nomeRemover);
            console.log('Tarefa removida!');
            break;
        case '5':
            process.exit();
            break;
        default:
            console.log('Opção inválida!');
    }
}

async function main() {
    while (true) {
        menu();
        let opcao = readline.question('Escolha uma opção: ');
        await escolherOpcao(opcao);
    }
}

main();