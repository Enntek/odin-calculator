const container = document.querySelector('.container')

const calcFrame = document.createElement('div') //calc frame
calcFrame.setAttribute('class', 'calcFrame')
container.appendChild(calcFrame)

const calcTop = document.createElement('div') // calcTop
calcTop.setAttribute('class', 'calcTop');
calcFrame.appendChild(calcTop);

//children of calcTop
const calcTitle = document.createElement('div') //text
calcTitle.setAttribute('class', 'calcTitle')
calcTitle.classList.add('content');
calcTitle.textContent = "Odin Calculator"


const calcDisplay = document.createElement('div') // text
calcDisplay.setAttribute('class', 'calcDisplay')
calcDisplay.classList.add('content');
calcDisplay.textContent = "888"

const calcModel = document.createElement('div') //text
calcModel.setAttribute('class', 'calcModel');
calcModel.classList.add('content');
calcModel.textContent = '10-Digit OC57418'

const calcSolarFrame = document.createElement('div') // calcSolarFrame
calcSolarFrame.setAttribute('class', 'calcSolarFrame');
const calcSolarText = document.createElement('div') // text
calcSolarText.setAttribute('class', 'calcSolarText')
calcSolarText.classList.add('content');
calcSolarText.textContent = 'SOLAR POWER';
const calcSolarPanel = document.createElement('div') //div
calcSolarPanel.setAttribute('class', 'calcSolarPanel')
// append children of calcSolarFrame
calcSolarFrame.appendChild(calcSolarText)
calcSolarFrame.appendChild(calcSolarPanel)

//append children of calcTop
calcTop.appendChild(calcTitle)
calcTop.appendChild(calcDisplay)
calcTop.appendChild(calcModel)
calcTop.appendChild(calcSolarFrame)




// add 4 solar cells
const calcBottom = document.createElement('div')
calcBottom.setAttribute('class', 'calcBottom');
calcFrame.appendChild(calcBottom);


//create buttons
for (i = 0; i < 20; i++) {
  const btn = document.createElement('button');
  btn.classList.add('btn', 'btnSmall');
  btn.setAttribute('id', `btn${i}`);
  btn.textContent = `${i}`;
  btn.addEventListener('click', logClick)
  
  calcBottom.appendChild(btn)
}


const btnPlus = document.createElement('button'); //bigger button lays on top of 2 buttons
btnPlus.classList.add('content');
btnPlus.classList.add('class', 'btn');
btnPlus.setAttribute('id', 'btnPlus');
btnPlus.addEventListener('click', logClick)
btnPlus.textContent = "+";
calcBottom.append(btnPlus);


document.getElementById("btn0").textContent = '7'
document.getElementById("btn1").textContent = '8'
document.getElementById("btn2").textContent = '9'
document.getElementById("btn3").textContent = 'C'
document.getElementById("btn4").textContent = 'CE'
document.getElementById("btn5").textContent = '4'
document.getElementById("btn6").textContent = '5'
document.getElementById("btn7").textContent = '6'
document.getElementById("btn8").textContent = 'x'
document.getElementById("btn9").textContent = '÷'
document.getElementById("btn10").textContent = '1'
document.getElementById("btn11").textContent = '2'
document.getElementById("btn12").textContent = '3'
document.getElementById("btn13").textContent = 'na'
document.getElementById("btnPlus").textContent = '+' //bigger button
document.getElementById("btn14").textContent = '-'
document.getElementById("btn15").textContent = '0'
document.getElementById("btn16").textContent = '.'
document.getElementById("btn17").textContent = '%'
document.getElementById("btn18").textContent = 'na'
document.getElementById("btn19").textContent = '='


// allButtons.forEach(button => console.log(button.id))

// document.querySelector('#1').textContent = '999';



// calc logic
// add eventlistener to each button
// check if button textcontent is a number OR a decimal
// add that to display

// let display = calcDisplay.textContent;
// display = '5555';

calcDisplay.textContent = 888;


function logClick(e) {
  
  let buttonString = e.target.textContent;

  if (!isNaN(buttonString) && isFinite(buttonString)) {
    if (calcDisplay.textContent == '0.') {
      calcDisplay.textContent = '';
    };

    //if char furthest right is (dot), delete (dot);
    // calcDisplay.textContent.split('')

    // console.log(calcDisplay.textContent);
    
    calcDisplay.textContent += buttonString + '.';
  }

  if (e.target.textContent == 'CE') calcDisplay.textContent = '0.';
  
  // console.log(e.target.id);
  // console.log(e.target.className);
}
