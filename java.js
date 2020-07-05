const moneyList = document.querySelector(".moneyList");
const moneyDisplay = document.getElementById("moneyDisplay");
const incomeMoney = document.querySelector(".incomeMoney");
const expenseMoney = document.querySelector(".expenseMoney");
const form = document.querySelector(".form");

// dummyTransactions = [
//   { id: 1, text: "iMac", amount: -200 },
//   { id: 2, text: "windows10", amount: -150 },
//   { id: 3, text: "pay", amount: +350 },
//   { id: 4, text: "allowance", amount: +50 },
// ];

function getFromLs() {
  let transactions;
  if (localStorage.getItem("transactions") === null) {
    transactions = [];
  } else {
    tansactions = JSON.parse(localStorage.getItem("transactions"));
  }
  return transactions;
}

function setToLs() {
  localStorage.setItem("transactions", JSON.stringify(transaction));
}
function addTransactionDom(item) {
  const li = document.createElement("li");
  li.innerHTML = `${item.text} <span>$${item.amount}</span><button class="delete-btn">X</button>`;
  li.classList.add(item.amount > 0 ? "plus" : "minus");
  li.style.marginBottom = "5px";
  moneyList.appendChild(li);
}

function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, cur) => acc + cur, 0).toFixed(2);
  moneyDisplay.innerHTML = `$${total}`;
  const income = amounts
    .filter((amount) => amount > 0)
    .reduce((acc, cur) => acc + cur, 0)
    .toFixed(2);
  incomeMoney.innerHTML = `$${income}`;
  const expense = amounts
    .filter((amount) => amount < 0)
    .reduce((acc, cur) => acc + cur, 0)
    .toFixed(2);
  expenseMoney.innerHTML = `$${expense}`;
}

const Text = document.getElementById("Text");
const Amount = document.getElementById("Amount");
function addTransaction(e) {
  if (Text.value.trim() === "" || Amount.value.trim() === "") {
    alert("Input Something Please...");
  } else {
    const transaction = {
      id: Math.floor(Math.random() * 1000000),
      text: `${Text.value}`,
      amount: +`${Amount.value}`,
    };
    transactions.push(transaction);
    console.log(transaction);

    addTransactionDom(transaction);
    updateValues();
    getFromLs();
    setToLs();
    Text.value = "";
    Amount.value = "";
  }
  e.preventDefault();
}
// function deleteListItem(e) {
//   if ((e.target.className = "delete-btn")) {
//     e.parentElement.remove();
//   }
// }
form.addEventListener("submit", addTransaction);
function init() {
  transactions.forEach((transaction) => addTransactionDom(transaction));
  updateValues();
}
init();
