"use strict";

var lista = [1, 2, 3, 4, 5];
lista.map(function (x) {
  return x + 1;
}).forEach(function (x) {
  return console.log(x);
});

var generateColor = function generateColor() {
  var red = Math.floor(Math.random() * 256);
  var green = Math.floor(Math.random() * 256);
  var blue = Math.floor(Math.random() * 256);
  console.log("color: rgb(".concat(red, ", ").concat(blue, ", ").concat(green, ")"));
};
