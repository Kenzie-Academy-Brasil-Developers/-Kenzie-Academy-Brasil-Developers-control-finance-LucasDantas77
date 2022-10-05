const ul = document.querySelector(".container__lista")
const body = document.querySelector("body")
const resultadoSoma = document.getElementById("soma")


function renderValores(array) {
    ul.innerHTML = ""
    array.forEach((element) => {
        const li = document.createElement("li")
        const spanValor = document.createElement("span")
        let spanTipo = document.createElement("span")
        const btnRemove = document.createElement("button")
        btnRemove.addEventListener("click", () => {
            const remover = insertedValues.find(({
                value
            }) => value === insertedValues)
            insertedValues.splice(remover, 1)

            li.remove()

        })
        const spanImg = document.createElement("span")
        const imgRemove = document.createElement("img")

        li.id = element.id
        li.classList.add("lista")

        spanValor.innerText = `R$ ${element.value}`
        spanValor.id = "valor"

        spanTipo.id = "btnEntrada"
        if (element.categoryID === 1) {
            spanTipo.innerText = valuesCategory[0];
        } else {
            spanTipo.innerText = valuesCategory[1]
        }




        btnRemove.id = "btnRemove"
        imgRemove.src = "./src/assets/trash (1).png"
        btnRemove.append(spanImg, imgRemove)

        li.append(spanValor, spanTipo, btnRemove)
        ul.append(li)


    });

}

renderValores(insertedValues)

function criaModal() {
    const div1 = document.createElement("div")
    const div2 = document.createElement("div")
    const divHeader = document.createElement("div")
    const divBody = document.createElement("div")

    div1.id = "modal"
    div1.classList.add("container__modal")
    div2.classList.add("modal")
    divHeader.classList.add("modal__header")
    divBody.classList.add("modal__body")

    const h2 = document.createElement("h2")
    h2.innerText = "Registro de valor"
    const button = document.createElement("button")
    button.innerText = "X"
    button.setAttribute("data", "modal")
    divHeader.append(h2, button)


    const pDescri = document.createElement("p")
    pDescri.innerText = "Digite o valor e em seguida aperte no botão referente ao tipo do valor"
    const pValor = document.createElement("p")
    pValor.innerText = "valor"


    const form = document.createElement("form")
    form.classList.add("form__usuario")

    form.addEventListener("submit", (event) => {
        event.preventDefault()
        let newUser = {}

        const formSubmit = [...event.target]

        formSubmit.forEach((element) => {

            if (element.value && element.type != "radio") {
                newUser[element.name] = parseInt(element.value)
            } else if (element.checked) {
                newUser[element.name] = parseInt(element.value)
            }
        })
       
        insertedValues.push(newUser)
        console.log(insertedValues)
        renderValores(insertedValues)

    })

    const input = document.createElement("input")
    input.placeholder = "R$ 00,00"
    input.type = "text"
    input.id = "inputValores"
    input.name = "value"

    const pTipo = document.createElement("p")
    pTipo.innerText = "Tipo de valor"
    const inputEntrada = document.createElement("input")
    inputEntrada.classList.add("input__label")
    inputEntrada.checked = true
    inputEntrada.id = "entrada"
    inputEntrada.name = "categoryID"
    inputEntrada.type = "radio"
    inputEntrada.value = 1

    const labelEntrada = document.createElement("label")
    labelEntrada.classList.add("label__1")
    labelEntrada.htmlFor = "Entrada"
    labelEntrada.innerText = "Entrada"

    const inputSaida = document.createElement("input")
    inputSaida.classList.add("input__label")

    inputSaida.id = "saida"
    inputSaida.name = "categoryID"
    inputSaida.type = "radio"
    inputSaida.value = 2


    const labelSaida = document.createElement("label")
    labelSaida.classList.add("label__1")
    labelSaida.htmlFor = "Saida"
    labelSaida.innerText = "Saida"

    const divBtn = document.createElement("div")
    divBtn.classList.add("btnTipos")
    const btnCancelar = document.createElement("button")
    btnCancelar.setAttribute("data", "modal")
    btnCancelar.innerText = "Cancelar"
   
    const btnInserir = document.createElement("button")
    btnInserir.id = "inserir"
    btnInserir.innerText = "Inserir valor"
    btnInserir.setAttribute("data", "modal")

    divBtn.append(btnCancelar, btnInserir)
    form.append(pValor, input, pTipo, inputEntrada, labelEntrada, inputSaida, labelSaida, divBtn)
    divBody.append(pDescri, form)

    div2.append(divHeader, divBody)
    div1.append(div2)

    body.append(div1)
}
criaModal()


function abrirModal() {
    const botaoModal = document.querySelectorAll("[data]")

    for (let i = 0; i < botaoModal.length; i++) {
        botaoModal[i].addEventListener("click", () => {
            let dataControl = botaoModal[i].getAttribute("data")
            document.getElementById(dataControl).classList.toggle("show__modal")
        })
    }
}
abrirModal()


function filtraValores() {

    const spanTodos = document.getElementById("todos")
    spanTodos.addEventListener("click", () => {
        renderValores(insertedValues)
    })

    const spanEntrada = document.getElementById("entradas")
    spanEntrada.addEventListener("click", () => {
       const insertedValuesFiltered = insertedValues.filter(element => element.categoryID === 1)
        renderValores(insertedValuesFiltered)
    })

    const spanSaida = document.getElementById("saidas")
    spanSaida.addEventListener("click", () => {
      const  insertedValuesFiltered = insertedValues.filter(element => element.categoryID === 2)
        renderValores(insertedValuesFiltered)
    })


}
filtraValores()




function somarValores() {
    const soma = insertedValues.reduce((acc, valorAtual) => {
        return acc + valorAtual.value

    }, 0)
    resultadoSoma.innerText = soma
   

}
somarValores()