const div = document.getElementById("container");
(function () {
  let field = [];
  for (let i = 0; i < 8; i++) {
    field[i] = [];
    let tr = document.createElement("tr");
    for (let j = 0; j < 8; j++) {
      field[i][j] = `pos`;
      let th = document.createElement("th");
     // th.textContent = "A";
      // th.style.cssText = `background-color: brown`
      th.setAttribute("id", `pos-${i}-${j}`);
       if (i == 3 || i == 4) {
        tr.appendChild(th);
        continue
       }
      if (i % 2 && j %  2) {
        let circle = document.createElement(`div`)
        circle.style.cssText = `background-color: black;
        border: 10px solid gray;
        border-radius: 50px;
        width: 35px;
        height: 35px;`
        th.append(circle)
      } else if (!(i % 2) && !(j %  2)) {
        let circle = document.createElement(`div`)
        circle.style.cssText = `background-color: black;
        border: 1px solid black;
        border-radius: 50px;
        width: 35px;
        height: 35px;`
        th.append(circle)
      }

      tr.appendChild(th);
    }
    div.appendChild(tr);
  }
})();
