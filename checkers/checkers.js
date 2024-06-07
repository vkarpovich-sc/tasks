const div = document.getElementById("container");
const table = document.getElementsByTagName("table")[0];
const letters = [`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`];
class Checker {
  constructor(posLetter, posNumber, color, isBot) {
    this.posLetter = posLetter;
    this.posNumber = posNumber;
    this.pos = `${this.posNumber}-${this.posLetter}`;
    this.color = color;
    this.isBot = isBot;
  }

  click() {
    // alert(this.pos);
    //stopPreparation()

    let number = this.posNumber + 1;
    const SAMEID = document.getElementsByTagName(`th`);
    let indexOfPosLetter = letters.indexOf(this.posLetter);
    const rightLetter =
      indexOfPosLetter + 1 <= 8 ? letters[indexOfPosLetter + 1] : null;
    const leftLetter =
      indexOfPosLetter - 1 >= 0 ? letters[indexOfPosLetter - 1] : null;

    const yellowElements = Array.from(SAMEID).filter(
      (element) => element.style.backgroundColor === "rgb(247, 220, 111)"
    );

    yellowElements.forEach((el) => {
      el.style.backgroundColor = `rgb(23, 126, 211)`;
    });

    switch (true) {
      case rightLetter == null:
        let th1 = document.getElementById(`pos-${number}-${leftLetter}`);
        if (th1.hasChildNodes()) {
          return;
        } else {
          th1.style.backgroundColor = `rgb(247, 220, 111 )`;
        }
        break;
      case leftLetter == null:
        let th2 = document.getElementById(`pos-${number}-${leftLetter}`);
        if (th2.hasChildNodes()) {
          return;
        } else {
          th2.style.backgroundColor = `rgb(247, 220, 111 )`;
        }
        break;
      default:
        let leftTh = document.getElementById(`pos-${number}-${leftLetter}`);
        let rightTh = document.getElementById(`pos-${number}-${rightLetter}`);
        rightTh.addEventListener("click", () => {
          let check = document.getElementById(`pos-${this.pos}`);
          check.innerHTML = ``;
          let k = document.createElement(`div`);
          k.style.cssText = `background-color: ${this.color};
          border: 2px solid gray;
          border-radius: 50px;
          width: 40px;
          height:40px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);`;
          rightTh.append(k);
          rightTh.style.backgroundColor = `rgb(23, 126, 211)`;
          leftTh.style.backgroundColor = `rgb(23, 126, 211)`;
        });
        leftTh.addEventListener("click", () => {
          let check = document.getElementById(`pos-${this.pos}`);
          check.innerHTML = ``;
          let k = document.createElement(`div`);
          k.style.cssText = `background-color: ${this.color};
          border: 2px solid gray;
          border-radius: 50px;
          width: 40px;
          height:40px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);`;
          leftTh.append(k);
          leftTh.style.backgroundColor = `rgb(23, 126, 211)`;
          rightTh.style.backgroundColor = `rgb(23, 126, 211)`
        });
        if (
          leftTh.hasChildNodes() ||
          rightTh.hasChildNodes() ||
          (leftTh.hasChildNodes() && rightTh.hasChildNodes())
        ) {
          return;
        } else {
          leftTh.style.backgroundColor = `rgb(247, 220, 111 )`;
          rightTh.style.backgroundColor = `rgb(247, 220, 111 )`;
        }
    }
  }

  createCheck() {
    let check;
    if (this.isBot) {
      check = document.createElement(`div`);
      check.style.cssText = `background-color: ${this.color};
      border: 2px solid gray;
      border-radius: 50px;
      width: 40px;
      height:40px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);`;
      check.addEventListener("click", () => {
        this.click();
      });
    } else {
      check = document.createElement(`div`);
      check.style.cssText = `background-color: ${this.color};
      border: 2px solid gray;
      border-radius: 50px;
      width: 40px;
      height:40px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);`;
      check.addEventListener("click", (e) => {
        alert(this.pos);
      });
    }

    return check;
  }
}
(function () {
  let checks = [];
  for (let i = 0; i < 8; i++) {
    let tr = document.createElement("tr");
    checks[i] = [];
    for (let j = 0; j < 8; j++) {
      if (i + 1 == 6 || i + 1 == 7 || i + 1 == 8) {
        checks[i][j] = new Checker(letters[j], i + 1, `white`, false);
      } else {
        checks[i][j] = new Checker(letters[j], i + 1, `black`, true);
      }

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

// click() {
//   alert(`ты нажала на меня`);
//   //stopPreparation()
//  // const th = document.getElementById(`pos-${this.pos}`);
//   let number = this.posNumber + 1;
//   let indexOfPosLetter = letters.indexOf(this.posLetter);
//   const rightLetter = letters[indexOfPosLetter + 1];
//   const leftLetter = letters[indexOfPosLetter - 1];
//   let th1 = document.getElementById(`pos-${leftLetter}-${number}`);
//   let th2 = document.getElementById(`pos-${rightLetter}-${number}`);
//   if (
//     th1.hasChildNodes() ||
//     th2.hasChildNodes() ||
//     (th1.hasChildNodes() && th2.hasChildNodes())
//   ) {
//     alert(`nope`)
//   }
//   else {
//     th1.style.backgroundColor = `yellow`;
//     th2.style.backgroundColor = `yellow`;
//   }

//   //th.innerHTML = ``;

//   // return this.pos
// }
