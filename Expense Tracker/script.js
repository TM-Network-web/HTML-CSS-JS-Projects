const totalBalance = document.getElementById("balance");
const incomeAmount = document.getElementById("income-amount");
const expenseAmount = document.getElementById("expense-amount");
const inputDescription = document.getElementById("description");
const inputAmount = document.getElementById("amount");
const transactionLists = document.getElementById("transaction-list");
const transactionForm = document.getElementById("transaction-form");
const addTransactionbtn = document.getElementById("addTransactionbtn");
const deletebtn = document.querySelector(".deletebtn")

transactionForm.addEventListener("submit",addTransaction);

let transactions = JSON.parse(localStorage.getItem("transactions")) || []; 

function addTransaction(e){
    e.preventDefault();
const description = inputDescription.value;
const amount = parseFloat(inputAmount.value);

    inputDescription.value = "";
    inputAmount.value = "";

    let transaction={
        id:Date.now(),
        description,
        amount
    }
    if(transactions && !isNaN(amount)){
   transactions.push(transaction);

   localStorage.setItem("transactions",JSON.stringify(transactions));
   updateTransactionList();
   updateSummary();
    }
   transactionForm.reset();
}

function updateTransactionList(){
    transactionLists.innerHTML="";

    const sortedTransaction = [...transactions].reverse();
    sortedTransaction.forEach((transaction=>{
       const transactionEl = createTransactionEL(transaction);
       transactionLists.appendChild(transactionEl);
    }))
}

function createTransactionEL(transaction){
    let li = document.createElement("li");
    li.classList.add("transaction");
     li.classList.add(transaction.amount>0 ? "income":"expenses");
     li.innerHTML=`
     <p>${transaction.description}</p>
     <p>${currencyFormat(transaction.amount)} <button class="deletebtn" onclick="removeTransaction(${transaction.id})" >X</button></p>
     
     `;
     return li;
}

function removeTransaction(id){

    transactions = transactions.filter(transaction=> transaction.id !== id);

    localStorage.setItem("transactions",JSON.stringify(transactions));

    updateTransactionList();
    updateSummary();

}


function updateSummary(){
    const balance = transactions.reduce((acc,transaction)=>acc+transaction.amount ,0);

    const income = transactions.filter(transaction=>transaction.amount>0)
                  .reduce((acc,transaction)=>acc+transaction.amount ,0);

    const expense = transactions.filter(transaction=>transaction.amount<0)
                  .reduce((acc,transaction)=>acc+transaction.amount ,0);        
                  
                  
     totalBalance.textContent = currencyFormat(balance);
     incomeAmount.textContent = currencyFormat(income);
     expenseAmount.textContent = currencyFormat(expense);           
}


function currencyFormat(number){

    return new Intl.NumberFormat("en-US",{
        style:"currency",
        currency:"USD",
    }).format(number);
}

updateTransactionList();
updateSummary();

