/*Известны две скорости: одна в километрах в час, другая — 
в метрах в секунду. Какая из скоростей больше?*/

let speed_km = 100;
let speed_m = 5;

if ((speed_km * 1000) / 3600 > speed_m) {
    const div = document.getElementById('container')
    const h1 = document.createElement("h1")
    h1.innerText = "в километрах быстрее"
    div.appendChild(h1)
} else {
    const div = document.getElementById('container')
    const h1 = document.createElement("h1")
    h1.innerText = "метры быстрее"
    div.appendChild(h1)
}

/*Дано целое число k (1 <= k <= 365). Определить, каким будет k-й день года: выходным (суббота и воскресенье)
 или рабочим, если 1 января — понедельник. */

 let  k = prompt("введите день года", 345)

if  ((1 <= k < 100) && ((k%7) == 6 || (k%7) == 0)) {
    const div = document.getElementById('container')
    const h1 = document.createElement("h1")
    h1.innerText = "выходной"
    div.appendChild(h1)
}  
else if ((100 <= k <= 365) && ((k%7) == 5 ||  (k%7) == 6 )) {
    const div = document.getElementById('container')
    const h1 = document.createElement("h1")
    h1.innerText = "выходной"
    div.appendChild(h1)
} else {
    const div = document.getElementById('container')
    const h1 = document.createElement("h1")
    h1.innerText = "рабочий"
    div.appendChild(h1)
}