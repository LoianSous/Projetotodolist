const botao = document.getElementById("addTaskBtn")
const texto = document.getElementById("taskInput")
const listaCompleta = document.getElementById("taskList")

let lista = []

function AdicionarNovaTarefa() {
    lista.push({
        tarefa: texto.value,
        concluida: false
    })

    texto.value = ''

    mostrarTarefas()
}

function mostrarTarefas() {

    let novoCard = ''

    lista.forEach( (item, posicao) => {

        novoCard = novoCard + `
        
        <div class="card task-card">
                <img src="#" class="card-img-top" alt="Imagem de Prioridade">
                <div class="card-body">
                    <div>
                        <h5 class="card-title">${item.tarefa}</h5>
                        <p class="card-text">Prioridade:</p>
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

        listaCompleta.innerHTML = novoCard
    })
}

function concluirTarefa(posicao){
    lista[posicao].concluida = !lista[posicao].concluida
}

function deletarTarefa(posicao){
    lista.splice(posicao, 1)

    mostrarTarefas()   
}

botao.addEventListener('click', AdicionarNovaTarefa)