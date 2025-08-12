
const totalBalance = document.getElementById("total-balance");
const incomeAmount = document.getElementById("income-amount");
const expenseAmount = document.getElementById("expense-amount");
const transactionLists = document.getElementById("transaction-lists");
const transactionForm = document.getElementById("transaction-form");
const inputDescription = document.getElementById("description");
const inputAmount = document.getElementById("amount");
const addTransactionBtn = document.getElementById("add-transaction");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

transactionForm.addEventListener("submit",addTransaction);

function addTransaction(e){
    e.preventDefault();

      const description = inputDescription.value ;
      inputDescription.value = "";
      const amount = parseFloat(inputAmount.value);
       inputAmount.value = "";

    
        transactions.push({
        id:Date.now(),
        description,
        amount,
       });
         
       localStorage.setItem("transactions",JSON.stringify(transactions));

       updateTransactionList();
       updateSummary();
       transactionForm.reset();
}



function updateTransactionList(){
    transactionLists.innerHTML="";
    const sortedTransactions = [...transactions].reverse();

        sortedTransactions.forEach((transaction)=>{
           const transc = createTransactionEl(transaction);
           transactionLists.append(transc);
        })
    
}

function createTransactionEl(transaction){

    const li = document.createElement("li");
    li.classList.add("transaction");
    li.classList.add(transaction.amount>0?"income":"expense");
    li.innerHTML = `
     <span>${transaction.description}</span>
    <span>${currencyformat(transaction.amount)} <button class="delete-btn" onclick="removeTransaction(${transaction.id})">X</button></span>
    `;
    return li;
}




function updateSummary(){
    const balance = transactions.reduce((acc,transaction)=>acc+transaction.amount,0);

    const income = transactions.filter((transaction)=>transaction.amount>0)
                   .reduce((acc,transaction)=>transaction.amount+acc,0);
    const expense = transactions.filter((transaction)=>transaction.amount<0)
                   .reduce((acc,transaction)=>transaction.amount+acc,0);           
                   
    totalBalance.textContent = currencyformat(balance);
    incomeAmount.textContent = currencyformat(income);
    expenseAmount.textContent = currencyformat(expense);      

}

function  currencyformat(number){
    return new Intl.NumberFormat("en-PK",{
        style:"currency",
        currency:"PKR",
    }).format(number);
}

function removeTransaction(id){
    transactions = transactions.filter(transaction=> transaction.id !== id);

    localStorage.setItem("transactions",JSON.stringify(transactions));

    updateTransactionList();
    updateSummary();

}

updateTransactionList();
updateSummary();