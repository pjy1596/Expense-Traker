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
let transactions = getFromLs();
function getFromLs() {
  let transactions;
  if (localStorage.getItem("transactions") === null) {
    transactions = [];
  } else {
    transactions = JSON.parse(localStorage.getItem("transactions"));
  }
  return transactions;
}

function setToLs() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
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
function addTransactionDom(item) {
  const li = document.createElement("li");
  li.innerHTML = `${item.text}<span>$${item.amount}</span><button class="delete-btn" onclick='deleteListItem(this)'>X</button>`;
  // 특이하게 onclick 저거에서 deleteListItem(안에 다른 거 쓰면 안 먹힘. event만 써야 됨)
  li.classList.add(item.amount > 0 ? "plus" : "minus");
  li.style.marginBottom = "5px";
  moneyList.appendChild(li);
}
function deleteListItem(btn) {
  // transactions = transactions.filter((transaction) => transaction.id !== id);
  // 이거 익혀놓기!!
  if ((btn.className = "delete-btn")) {
    btn.parentElement.remove();
    const transactions = getFromLs();
    transactions.forEach((transaction, index) => {
      if (
        btn.parentElement.childNodes[0] === JSON.stringify(transaction.text)
      ) {
        transactions.splice(index, 1);
        console.log("ddd");
      } else {
        console.log("ccc");
        console.log(btn.parentElement.childNodes[0]);
        console.log(JSON.stringify(transaction.text));
      }
    });
    setToLs();
  }
}
form.addEventListener("submit", addTransaction);
function init() {
  // moneyList.innerHTML = "";
  transactions.forEach((transaction) => addTransactionDom(transaction));
  updateValues();
}
init();
