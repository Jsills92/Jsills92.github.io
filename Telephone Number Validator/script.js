const checkBtn = document.getElementById("check-btn");
const userInput = document.getElementById("user-input");
const clearBtn = document.getElementById("clear-btn");
const resultsDiv = document.getElementById("results-div");

checkBtn.addEventListener("click", function() {
  if (userInput.value === ""){
    alert("Please provide a phone number") 
    return;
  }

  const phoneNumber = userInput.value;
  if (validPhoneRegEx.test(phoneNumber)) {
    resultsDiv.textContent = `Valid US number: ${phoneNumber}`;
  } else {
    resultsDiv.textContent = `Invalid US number: ${phoneNumber}`;
  }
});

clearBtn.addEventListener("click", function() {
    resultsDiv.innerHTML = ""; 
});

const validPhoneRegEx = /^(1\s?)?(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/;