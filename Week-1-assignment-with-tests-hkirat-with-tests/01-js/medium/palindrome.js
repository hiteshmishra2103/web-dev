/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.

  Once you've implemented the logic, test your code by running
  - `npm run test-palindrome`
*/

function reverse(str) {
  let answer = "";
  for (var i = str.length - 1; i >= 0; i--) {
    if (str[i] === " " || str[i] === "," || str[i] === "?" || str[i] === "!") {
      continue
    }
    answer += str[i];
  }
  return answer;  
}
function isPalindrome(str) {
  str = str.toLowerCase();
  if (str === reverse(str)) {
    return true;
  }
  return false;
}
module.exports = isPalindrome;
