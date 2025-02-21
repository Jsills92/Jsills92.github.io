const input = document.getElementById('number');
const button = document.getElementById('convert-btn');
const output = document.getElementById('output');

const numbersToRomanNumerals = [
  [1000, 'M'],
  [900, 'CM'],
  [500, 'D'],
  [400, 'CD'],
  [100, 'C'],
  [90, 'XC'],
  [50, 'L'],
  [40, 'XL'],
  [10, 'X'],
  [9, 'IX'],
  [5, 'V'],
  [4, 'IV'],
  [1, 'I']
];

button.addEventListener('click', function() {
  // Input Validation
  if (input.value === "") {
    output.textContent = "Please enter a valid number";
    output.classList.remove('hidden');
    return;
  } else if (input.value < 1) {
    output.textContent = "Please enter a number greater than or equal to 1";
    output.classList.remove('hidden');
    return;
  } else if (input.value >= 4000) {
    output.textContent = "Please enter a number less than or equal to 3999";
    output.classList.remove('hidden');
    return;
  }

  // Conversion Logic
  let result = '';
  let numberValue = parseInt(input.value);

  // Loop through each mapping element
  for (let i = 0; i < numbersToRomanNumerals.length; i++) {
    let currentNumber = numbersToRomanNumerals[i][0];
    let romanNumeral = numbersToRomanNumerals[i][1];

    // While the numberValue is greater than or equal to the current number
    while (numberValue >= currentNumber) {
      // Subtract the current number from numberValue
      numberValue -= currentNumber;
      // Append the corresponding Roman numeral to result
      result += romanNumeral;
    }
  }

  // Display the result
  output.textContent = result;
  output.classList.remove('hidden');
});