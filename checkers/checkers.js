const div = document.getElementById("container");
const table = document.getElementsByTagName("table")[0];
const letters = [`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`];
class Checker {
  constructor(pos, color, isBot) {
    this.pos = pos;
    this.color = color;
    this.isBot = isBot
  }

  click () {
    alert(`ты нажала на меня`)
    stopPreparation()
  }

  createCheck() {
    let check;
    if (this.isBot) {
      check = document.createElement(`div`);
      check.style.cssText = `background-color: white;
      border: 2px solid gray;
      border-radius: 50px;
      width: 40px;
      height:40px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);`;
      check.addEventListener("click", () => {
        alert(`spasibo`)
      })
    }
    else {
      check = document.createElement(`div`);
      check.style.cssText = `background-color: black;
      border: 2px solid gray;
      border-radius: 50px;
      width: 40px;
      height:40px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);`;
      check.addEventListener("click", (e) => {
        alert( this.pos)
      })
    }

    return check;
  }
}
(function () {
  let checks = []
  for (let i = 0; i < 8; i++) {
    let tr = document.createElement("tr");
    checks[i] = []
    for (let j = 0; j < 8; j++) {
       checks[i][j] = new Checker(`${letters[j]}-${i + 1}`, `white`, false);

      let th = document.createElement("th");

      th.setAttribute("id", `pos-${i + 1}-${letters[j]}`);
     // th.addEventListener("click" ,checks[i][j].click() )
      if (i == 3 || i == 4) {
        tr.appendChild(th);
        continue;
      } else if ((i + 1) % 2 && j % 2) {
        th.append(checks[i][j].createCheck());
      } else if (!((i + 1) % 2) && !(j % 2)) {
        th.append(checks[i][j].createCheck());
      }

      tr.appendChild(th);
    }
    table.appendChild(tr);
  }
})();
