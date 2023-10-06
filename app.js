let state = {
    balance: 1000,
    income: 5000,
    expense: 500,

    transactions: [


    ]

}

var balanceEl = document.querySelector("#balance")
var incomeEl = document.querySelector("#income")
var expenseEl = document.querySelector("#expense")
var transactionsEl = document.querySelector("#transaction")
var incomebtnEl = document.querySelector("#incomeBtn")
var expensebtnEl = document.querySelector("#expenseBtn")
var nameInputEl = document.querySelector("#name")
var amountInputEl = document.querySelector("#amount")

function init() {
    var localState = JSON.parse(localStorage.getItem("expenseTrackState"))
    if (localState !== null) {
        state = localState;
    }
    stateUpdate()
    initListners()
}

function uniqueId() {
    return Math.round(Math.random() * 10000);
}

function initListners() {
    incomebtnEl.addEventListener("click", onAddincomeClick)
    expensebtnEl.addEventListener("click", onAddexpenseClick)
}

function onAddincomeClick() {
    addTransaction(nameInputEl.value, amountInputEl.value, "income")
}

function addTransaction(name, amount, type) {
    if (!name == "" && !amount == "") {
        var transaction = {
            name: name,
            id: uniqueId(),
            amount: parseInt(amount),
            type: type
        };
        state.transactions.push(transaction)
        stateUpdate();
    } else {
        alert("please enter valid data")
    }

    nameInputEl.value = "";
    amountInputEl.value = "";
}

function onAddexpenseClick() {
    addTransaction(nameInputEl.value, amountInputEl.value, "expense")
}
function onDeleteClick(event) {
    var id = parseInt(event.target.getAttribute("data-id"))
    var deleteIndex

    for (var i = 0; i < state.transactions.length; i++) {
        if (state.transactions[i].id === id) {
            deleteIndex = i;
            break;

        }

    }
    state.transactions.splice(deleteIndex, 1)
    stateUpdate();

}


function stateUpdate() {
    var balance = 0, income = 0, expense = 0, itme;

    for (var i = 0; i < state.transactions.length; i++) {
        item = state.transactions[i]

        if (item.type === "income") {
            income += item.amount

        } else if (item.type === "expense") {
            expense += item.amount

        }
    }
    balance = income - expense;
    state.balance = balance;
    state.income = income;
    state.expense = expense;


    localStorage.setItem("expenseTrackState", JSON.stringify(state))

    display()



}
function display() {
    balanceEl.innerHTML = `$${state.balance}`
    incomeEl.innerHTML = `$${state.income}`
    expenseEl.innerHTML = `$${state.expense}`

    var transactionEl, containerEl, amountEl, item, btnEl;

    transactionsEl.innerHTML = "";

    for (var i = 0; i < state.transactions.length; i++) {
        item = state.transactions[i]

        transactionEl = document.createElement("li")

        transactionEl.append(item.name)


        transactionsEl.appendChild(transactionEl)

        containerEl = document.createElement("div")
        amountEl = document.createElement("span")

        if (item.type === "income") {
            amountEl.classList.add("income-amt");

        } else if (item.type === "expense") {
            amountEl.classList.add("expense-amt")

        }
        amountEl.innerHTML = `$${item.amount}`
        containerEl.appendChild(amountEl)

        btnEl = document.createElement("button")
        btnEl.setAttribute("data-id", item.id)
        btnEl.innerHTML = "X";

        btnEl.addEventListener("click", onDeleteClick);



        containerEl.appendChild(btnEl)


        transactionEl.appendChild(containerEl)
    }
}
init()