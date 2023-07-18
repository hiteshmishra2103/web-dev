var counter = 1;
function count() {
  console.clear();
  console.log(counter);
  counter += 1;
}
// setInterval(count, 1000);

for (var i = 0; i < 100; i++) {
  setTimeout(count, (i + 1) * 1000);
}
