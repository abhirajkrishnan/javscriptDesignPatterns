import { cats } from "./data";

var counter = document.getElementById("countprint");

cats.forEach((item) => {
  let btn = document.createElement("button");
  btn.classList = "cats";
  btn.addEventListener("click", function () {
    if (item.name === cats.name) {
      cats;
    }
  });
  btn.textContent = item.name;
  buttons.appendChild(btn);
});

// let i = 0;
// function increment(j) {
//   let k = j;
//   return function () {
//     console.log(++k);
//   };
// }

counter.textContent = cats[0].counter;

var allcat = document.getElementsByClassName("cats");

const cat = [...allcat];

cat.forEach((item) => {
  let currentcat = cats.find((c) => {
    if (c.name === item.textContent) return c;
  });
  console.log(currentcat);
});
