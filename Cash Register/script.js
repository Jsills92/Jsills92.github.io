let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];
let enteredCash = 0;
let changeNeeded = 0;
let changeBreakdown = [];
const cashInput = document.getElementById("cash");
const changeDueDisplay = document.getElementById("change-due")
const purchaseBtn = document.getElementById("purchase-btn");

purchaseBtn.addEventListener("click", () => {
  enteredCash = parseFloat(cashInput.value);

  if (enteredCash < price) {
    alert("Customer does not have enough money to purchase the item")
  
  return;
};
if (enteredCash === price) {
  changeDueDisplay.textContent = "No change due - customer paid with exact cash";
  return;
}

changeNeeded = parseFloat((enteredCash - price).toFixed(2));
let changeResult = calculateChange(changeNeeded, cid);

if(changeResult === "INSUFFICIENT_FUNDS") {
  changeDueDisplay.textContent = "Status: INSUFFICIENT_FUNDS";
} else {
  changeDueDisplay.textContent = `Status: ${changeResult.status}, Change: ${changeResult.change.map(c => `${c[0]}: $${c[1]}`).join(",")}`
}

});

function calculateChange(changeNeeded, cid) {
  const currencyUnit = [
    ["PENNY", 0.01],
    ["NICKEL", 0.05],
    ["DIME", 0.1],
    ["QUARTER", 0.25],
    ["ONE", 1],
    ["FIVE", 5],
    ["TEN", 10],
    ["TWENTY", 20],
    ["ONE HUNDRED", 100]
  ];

  let change = [];
  let totalCid = 0;

  // Calculate the total amount of cash in drawer
  cid.forEach(unit => totalCid += unit[1]);
  totalCid = totalCid.toFixed(2);

  // If the change needed is greater than the total amount of cash in drawer
  if (changeNeeded > totalCid) {
    return "INSUFFICIENT_FUNDS";
  }

  // Loop through the currency units starting from the highest
  for (let i = currencyUnit.length - 1; i >= 0; i--) {
    let coinName = currencyUnit[i][0];
    let coinValue = currencyUnit[i][1];
    let coinAvailable = cid[i][1];
    let coinToReturn = 0;

    while (changeNeeded >= coinValue && coinAvailable > 0) {
      changeNeeded -= coinValue;
      coinAvailable -= coinValue;
      coinToReturn += coinValue;
      changeNeeded = changeNeeded.toFixed(2);
    }

    if (coinToReturn > 0) {
      change.push([coinName, parseFloat(coinToReturn.toFixed(2))]);
    }
  }

  // If the change needed is not zero, we have insufficient funds
  if (changeNeeded > 0) {
    return "INSUFFICIENT_FUNDS";
  }

  // Check if the drawer is empty after the transaction
  let remainingCid = cid.map((unit, index) => [unit[0], unit[1] - (change.find(c => c[0] === unit[0])?.[1] || 0)]);
  let totalRemainingCid = remainingCid.reduce((total, unit) => total + unit[1], 0).toFixed(2);

  // If the drawer is empty, return "CLOSED"
  if (totalRemainingCid == 0) {
    return {status: "CLOSED", change: change};
  }

  // Otherwise, return "OPEN"
  return {status: "OPEN", change: change};
}