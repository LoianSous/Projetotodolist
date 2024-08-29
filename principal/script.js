const botao = document.getElementById("addTaskBtn")
const texto = document.getElementById("taskInput")
const listaCompleta = document.getElementById("taskList")
const prioridade_tarefa = document.getElementById("priorityInput")
const filtro_texto = document.getElementById("filterInput")
const filtro = document.getElementById("filterPriority")


let lista = []
let itensAMostra = []

function AdicionarNovaTarefa() {
    const prioridade = priorityInput.value;
    const itemNovo = {
        tarefa: texto.value,
        prioridade: prioridade,
        filtro: prioridade_tarefa,
        concluida: false
    }

    lista.push(itemNovo)

    itensAMostra.push(itemNovo)

    texto.value = ''

    mostrarTarefas()
}

function mostrarTarefas() {

    let novoCard = ''

    itensAMostra.forEach( (item, posicao) => {

        novoCard = novoCard + `
        
        <div class="card task-card ${item.concluida ? "feito":""}">
                <img src="#" class="card-img-top" alt="Imagem de Prioridade">
                <div class="card-body">
                    <div>
                        <h5 class="card-title">${item.tarefa}</h5>
                        <p class="card-text">Prioridade: ${ item.prioridade}</p>
                    </div>
                    <div class="task-buttons">
                        <button class="btn btn-success">
                            <box-icon name='check-double' color="white" onclick="concluirTarefa(${posicao})"></box-icon>
                        </button>
                        <button class="btn btn-warning">
                            <box-icon name='edit' color="white"></box-icon>
                        </button>
                        <button class="btn btn-danger">
                            <box-icon name='trash' color="white" onclick="deletarTarefa(${posicao})"></box-icon>
                        </button>
                    </div>
                </div>
            </div>

        `
        console.log(item)

        listaCompleta.innerHTML = novoCard

        localStorage.setItem('lista', JSON.stringify(lista))
    })
}

function concluirTarefa(posicao){
    itensAMostra[posicao].concluida = !i[posicao].concluida

    console.log(lista)
    mostrarTarefas()
    console.log(posicao)
}

function deletarTarefa(posicao){
    itensAMostra.splice(posicao, 1)

    mostrarTarefas()   
}

function recarregarTarefa(){
    const tarefa_armazenada = localStorage.getItem('lista')

    if (tarefa_armazenada) {
        lista = JSON.parse(tarefa_armazenada)
    }


    mostrarTarefas()
}

function filtrarTarefas(){
    const textoFiltro = filtro_texto.value.toLowerCase();
    const valorPrioridade= prioridade_tarefa.value;

    
    if (textoFiltro || valorPrioridade != "Todos"){
        itensAMostra = lista.filter(lista => lista.tarefa.toLowerCase().includes(textoFiltro));
       // itensAMostra = itensPorNome.filter(lista => lista.prioridade == valorPrioridade); 
    }

    mostrarTarefas()

    console.log(filtrarTarefas)
}

recarregarTarefa()
botao.addEventListener('click', AdicionarNovaTarefa)
filtro_texto.addEventListener('change', filtrarTarefas)
// filtro.addEventListener('change', filtrarTarefas)