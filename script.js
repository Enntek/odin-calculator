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
calcDisplay.textContent = "'0'"

const calcModel = document.createElement('div') //text
calcModel.setAttribute('class', 'calcModel');
calcModel.classList.add('content');
calcModel.textContent = '10-Digit OC-57418'

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
  btn.addEventListener('click', keyPress)
  calcBottom.appendChild(btn)
}

//create bigger button separately for '+'
const btnPlus = document.createElement('button');
btnPlus.classList.add('content');
btnPlus.classList.add('class', 'btn');
btnPlus.setAttribute('id', 'btnPlus');
btnPlus.addEventListener('click', keyPress)
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

calcDisplay.textContent = '';
let previousOperand = '';
let currentOperand = '';
let operator = '';
let previousStroke = '';

function operateAB(a, b, sign) {
  switch (sign) {
    case ('+'):
      return +a + +b;
    case ('-'):
      return +a - +b;
    case ('x'):
      return +a * +b;
    case ('÷'):
      return +a / +b;
  }
}

function keyPress(e) {

  function getKey(e) {

    let isValidKeyStroke = (e) => {
      if (/[0-9.+*\-\/]/.test(e.key) || 
          (e.key == 'Enter') ||
          (e.key == 'Backspace') ||
          (e.key == 'Delete')
          ) return true;
    }
  
    if (e instanceof KeyboardEvent && isValidKeyStroke(e)) {
      switch(e.key) {
        case 'Enter':
          return ('=');
        case 'Backspace':
          return ('CE');
        case 'Delete':
          return ('C');
        case '/':
          return ('÷');
        case '*':
          return ('x');
        default:
          return (e.key);
      }

    } else {
      if (e.target.textContent) return e.target.textContent;
    }
  }

  
  let currentStroke = getKey(e);

  let isNumber = (a) => (isFinite(a) && !isNaN(a));

  let isOperator = (a) => (/[+x÷-]/.test(a))

  let clearMemory = () => {
    calcDisplay.textContent = '';
    currentOperand = '';
    previousOperand = ''; 
    operator = ''; 
    previousStroke = '';
  };

  if (currentStroke == 'C') {clearMemory()};
  
  if (currentStroke == 'CE' && previousStroke == 'CE') {clearMemory()};
  

  if (currentStroke == 'CE') {
    previousStroke = 'CE';
    currentOperand = '';
    calcDisplay.textContent = '';
  }
  
  if (isNumber(currentStroke) && calcDisplay.textContent !== 'E'){

    if (+calcDisplay.textContent == 0) {currentOperand = ''}; //remove leading 0

    if (previousStroke == '=') {
    // if (!isOperator(previousStroke) && previousStroke == '=') {
      previousStroke = '';
      previousOperand = '';
      operator = '';
      previousStroke = currentStroke;
      currentOperand = ''
      currentOperand += currentStroke
      calcDisplay.textContent = currentOperand;
  
    } else if (!isOperator(previousStroke)) {
      previousStroke = currentStroke;
      currentOperand += currentStroke;
      calcDisplay.textContent = currentOperand;
    } 

    else if (isOperator(previousStroke)) {
      previousStroke = currentStroke;
      previousOperand = currentOperand;
      currentOperand = ''
      currentOperand += currentStroke;
      calcDisplay.textContent = currentOperand;
    }
  }

  if (currentStroke == '.' && !currentOperand.includes('.')) {
    currentOperand += '.'
    calcDisplay.textContent = currentOperand;
  }

  if (isOperator(currentStroke) && previousStroke!== '=') {
    operator = currentStroke;
    previousStroke = currentStroke;
  } else if (isOperator(currentStroke) && previousStroke == '=') {
    operator = currentStroke;
    previousStroke = currentStroke;
  }
  
  if (currentStroke == '=') {

    if(operator == '÷' && +currentOperand == 0) return calcDisplay.textContent='Oh no!';

    calcDisplay.textContent = operateAB(previousOperand, currentOperand, operator);
    previousStroke = '=';
    previousOperand = calcDisplay.textContent;
  };

  if (currentStroke == '%' && isNumber(calcDisplay.textContent)) {
    calcDisplay.textContent = calcDisplay.textContent * .01
    currentOperand = calcDisplay.textContent;
  }

  if (calcDisplay.textContent % 1 != 0 && calcDisplay.textContent !== 'E') {
    calcDisplay.textContent = Math.round(calcDisplay.textContent*100000)/100000
  };

  if (calcDisplay.textContent.length > 10) {
    clearMemory();
    calcDisplay.textContent ='E';
  }

}

window.addEventListener('keydown', keyPress)
// use button-loop to add big button, do not do it separately
// work out logic to multiple operations, i.e. 5 + 2 * 3 - 1