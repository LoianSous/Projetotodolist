const botao = document.getElementById("addTarefaBtn")
const texto = document.getElementById("tarefaInput")
const listaCompleta = document.getElementById("listaTarefas")
const prioridade_tarefa = document.getElementById("prioridadeInput")
const filtro_texto = document.getElementById("filtroInput")
const filtro = document.getElementById("filtroPrioridade")

let lista = []
let itensAMostra = []

const imagemprioridade = {
    'Alto': 'imagens/alta.png',
    'Médio': 'imagens/media.png', 
    'Baixo': 'imagens/baixa.png'
}

function AdicionarNovaTarefa() {
    const prioridade = prioridade_tarefa.value;
    const itemNovo = {
        tarefa: texto.value,
        prioridade: prioridade,
        concluida: false
    }

    lista.push(itemNovo)
    itensAMostra.push(itemNovo)

    texto.value = ''

    mostrarTarefas()
}

function mostrarTarefas() {
    let novoCard = ''

    itensAMostra.forEach((item, posicao) => {

        let imagem = imagemprioridade[item.prioridade]

        novoCard += `
        <div class="card task-card ${item.concluida ? "feito" : ""}">
            <img src="${imagem}" class="card-img-top" alt="Imagem de Prioridade">
            <div class="card-body">
                <div>
                    <h5 class="card-title">${item.tarefa}</h5>
                    <p class="card-text">Prioridade: ${item.prioridade}</p>
                </div>
                <div class="task-buttons">
                    <button class="btn btn-success" onclick="concluirTarefa(${posicao})">
                        <box-icon name='check-double' color="white"></box-icon>
                    </button>
                    <button class="btn btn-warning">
                        <box-icon name='edit' color="white"></box-icon>
                    </button>
                    <button class="btn btn-danger" onclick="deletarTarefa(${posicao})">
                        <box-icon name='trash' color="white"></box-icon>
                    </button>
                </div>
            </div>
        </div>
        `
    })

    listaCompleta.innerHTML = novoCard

    localStorage.setItem('lista', JSON.stringify(lista))
}

function concluirTarefa(posicao){
    itensAMostra[posicao].concluida = !i[posicao].concluida

    console.log(lista)
    mostrarTarefas()
}

function deletarTarefa(posicao) {
    lista.splice(posicao, 1)
    itensAMostra = lista.slice();  
    mostrarTarefas()
}

function recarregarTarefas() {
    const tarefa_armazenada = localStorage.getItem('lista')
    if (tarefa_armazenada) {
        lista = JSON.parse(tarefa_armazenada)
        itensAMostra = lista.slice(); 
    }
    mostrarTarefas()
}

function filtrarTarefas() {
    const textoFiltro = filtro_texto.value.toLowerCase();
    const valorPrioridade = filtro.value;

    itensAMostra = lista.filter(item => item.tarefa.toLowerCase().includes(textoFiltro));

    if (valorPrioridade !== "Todos") {
        itensAMostra = itensAMostra.filter(item => item.prioridade === valorPrioridade);
    }

    if (!textoFiltro && valorPrioridade === "Todos") {
        itensAMostra = lista.slice();  
    }

    mostrarTarefas()

    console.log(filtrarTarefas)
}

recarregarTarefas()
botao.addEventListener('click', AdicionarNovaTarefa)
filtro_texto.addEventListener('input', filtrarTarefas)
filtro.addEventListener('change', filtrarTarefas)

