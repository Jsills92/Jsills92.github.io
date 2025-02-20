document.getElementById("check-btn").addEventListener("click", function() {
  const userInput = document.getElementById("text-input").value;
  const result = document.getElementById("result");

  // Function to check if a string is a palindrome
  function isPalindrome(str) {
    // Remove non-alphanumeric characters and convert to lowercase
    const sanitizedStr = str
      .replace(/[^a-zA-Z0-9]/g, "")
      .toLowerCase();
    // Compare the string with its reverse
    return sanitizedStr === sanitizedStr.split("").reverse().join("");
  }

  // Check if input is empty
  if (userInput === "") {
    alert("Please input a value");
  } else if (isPalindrome(userInput)) {
    result.innerHTML = `${userInput} is a palindrome`;
  } else {
    result.innerHTML = `${userInput} is not a palindrome`;
  }
});

//Need to fix the check button