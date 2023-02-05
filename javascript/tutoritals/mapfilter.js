///---------------------------Map method in javascript-------------------------------///

const fuelConsumed = [10, 20, 30];

const fuelPrice = fuelConsumed.map(function (curr, i, arr) {
  console.log(`The money spent on fuel on day ${i + 1}: ${curr * 95}`);
  return curr * 95;
});

// console.log(fuelConsumed);

const fuelgreaterten = fuelConsumed.filter(function (curr, i, arr) {
  return curr > 10;
});

console.log(fuelgreaterten);

const sum = fuelConsumed.reduce(function (acc, curr, i, arr) {
  //acc=0, curr=10, => acc=acc+curr=> acc=0+10=10
  //acc=10, curr=20, => acc=10+20=30
  //acc=30, curr=30, => acc=30+30=60
  return acc + curr;
}, 0);

const max = fuelConsumed.reduce(function (acc, curr) {

  //acc=10, curr=20 => acc=20
  //acc=20, curr=30=> acc=30
  return Math.max(acc, curr); 
});

console.log(sum);

console.log(max)
