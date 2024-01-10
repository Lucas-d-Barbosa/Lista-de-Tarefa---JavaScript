// Sozinho sem ajuda

// const container = document.querySelector('.container');
// const input = document.querySelector('.tarefaAFazer');
// const btnCriarTarefa = document.querySelector('.adicionarTarefa');
// const ul = document.querySelector('.listaDeTarefa')
// btnCriarTarefa.addEventListener('click', event =>{
//     event.preventDefault();
//     const tarefaAFazer = input.value;
//     console.log(tarefaAFazer)
//     funcaoCriarTarefa(tarefaAFazer);
// });

// function funcaoCriarTarefa(tarefaAFazer){
//     const li = document.createElement('li');
//     const btnApagar = criarBtnApagar();
//     li.innerHTML = `${tarefaAFazer}`;
//     li.appendChild(btnApagar)
//     ul.appendChild(li);
//     console.log(btnApagar)
//     ul.addEventListener('click', event =>{
//         const el = event.target;
//         el.parentElement.remove();
//     });
// }
// function criarBtnApagar(){
//     const btnApagar = document.createElement('button');
//     btnApagar.classList.add('apagarTarefa');
//     btnApagar.innerHTML = 'Apagar';
//     return btnApagar;
// }


// Com muitaaaaaaaaaaaa ajuda do curso ksksks

const inputTarefa = document.querySelector('.tarefaAFazer');
const tarefas = document.querySelector('.listaDeTarefa');
const btnTarefa = document.querySelector('.adicionarTarefa');

function criaLi(){
    const li = document.createElement('li');
    return li;
}

inputTarefa.addEventListener('keypress', event =>{
    if(event.keyCode === 13){
        event.preventDefault();
        if(!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
        limpaInput();
    };
});

function limpaInput(){
    inputTarefa.value = '';
    inputTarefa.focus();
}
function criaBotaoApagar(li){
    li.innerText += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';
    botaoApagar.setAttribute('class','apagar');
    li.appendChild(botaoApagar);
};
function criaTarefa(textoInput){    
    const li = criaLi();
    li.innerHTML = textoInput;
    tarefas.appendChild(li);
    criaBotaoApagar(li);
    salvarTarefas();
}

btnTarefa.addEventListener('click', event =>{
    event.preventDefault();
    if(!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
    limpaInput();
});

document.addEventListener('click', event => {
    const el = event.target;
    if(el.classList.contains('apagar')){
        el.parentElement.remove();
        salvarTarefas();
    }
});

function salvarTarefas(){
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];
    for (let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto);
        
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}

function adicionarTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);
    console.log(tarefas);

    for(let tarefa of listaDeTarefas){
        criaTarefa(tarefa);
    }
}
adicionarTarefasSalvas()