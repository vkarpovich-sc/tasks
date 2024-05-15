//if tasks

/*
}*/

/**/

function append(text) {
  const div = document.getElementById("container");
  const h1 = document.createElement("h1");
  h1.innerText = text;
  div.appendChild(h1);
}

// switch tasks
/**/

/**/

//while tasks
// решето Эратосфена

/*const n = 50;
let numb = [];
for (let i = 2; i < n+1; i++) {
  numb[i - 2] = i;
}
alert(numb);
let s = 10;
let p = 2;
while (s) {
  while ((numb.length <= n + 1)) {
    let i = 2;
    numb[i * p] = "/";
    i++;
  }
  let newP = numb.find(a => a > p)
  p = newP
console.log(numb)
console.log(newP)
s--

}
alert(numb);*/

//for tasks
// n!

/*const n = 5;
let res = n;
for (let i = 1; i < n; i++) {
  res = res * i;
  if (i == n - 1) {
    alert(res);
  }
}*/
/**/
/**/

//таблица пифагора

/**/

// треугольник паскаля

const generateTrianle = (rows) => {
  const triangle = [[]];
  for (let i = 0; i < rows; i++) {
    triangle[i][0] = 1;
    for (let j = 1; j < i; j++) {
      triangle[i][j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
    }
    triangle[i][i] = 1;
  }

  return triangle;
};

const printTriangle = (triangle) => {
  const rows = triangle.length
  for (let i = 0; i < rows; i ++) {
    const row = triangle[i]
    const str = row.join(" ")
    const padding = " ".repeat((rows - i - 1) * 2)
    console.log(padding + str)
  }
} 

const numRows = 5
const psTrinagle = generateTrianle(numRows)
printTriangle(psTrinagle) 

//Дано пятизначное число. Найти число, получаемое при прочтении его цифр справа налево. Строки не использовать
