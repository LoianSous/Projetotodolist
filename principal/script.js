const botao = document.getElementById("addTaskBtn")
const texto = document.getElementById("taskInput")
const listaCompleta = document.getElementById("taskList")

let lista = []

function AdicionarNovaTarefa() {
    lista.push(texto.value)

    MonstrarTarefas()
}

function MonstrarTarefas() {

    let novoCard = ''

    lista.forEach( (tarefa) => {

        novoCard = novoCard + `
        
        <div class="card task-card">
                <img src="#" class="card-img-top" alt="Imagem de Prioridade">
                <div class="card-body">
                    <div>
                        <h5 class="card-title">${tarefa}</h5>
                        <p class="card-text">Prioridade:</p>
                    </div>
                    <div class="task-buttons">
                        <button class="btn btn-success">
                            <box-icon name=# color="white"></box-icon>
                        </button>
                        <button class="btn btn-warning">
                            <box-icon name='edit' color="white"></box-icon>
                        </button>
                        <button class="btn btn-danger">
                            <box-icon name='trash' color="white"></box-icon>
                        </button>
                    </div>
                </div>
            </div>

        `

        listaCompleta.innerHTML = novoCard
    })
}

botao.addEventListener('click', AdicionarNovaTarefa)