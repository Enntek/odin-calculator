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
  btn.addEventListener('click', buttonPress)
  
  calcBottom.appendChild(btn)
}


const btnPlus = document.createElement('button'); //bigger button lays on top of 2 buttons
btnPlus.classList.add('content');
btnPlus.classList.add('class', 'btn');
btnPlus.setAttribute('id', 'btnPlus');
btnPlus.addEventListener('click', buttonPress)
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

calcDisplay.textContent = '';
let previousString = '';
let currentString = '';
let operator = '';
let previousPress = '';

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

function buttonPress(e) {

  let currentPress = e.target.textContent;

  let isNumber = (a) => (isFinite(a) && !isNaN(a));

  let isOperator = (a) => (/[+x÷-]/.test(a))

  // if press C
  // clear all memory, clear display
  if (currentPress == 'C') {
    calcDisplay.textContent = '';
    currentString = '';
    previousString = '';
    operator = '';
    previousPress = '';
  }
  // if press CE
  
  // if number check previous key press, 
  // > if number OR decimal, add to string
  if (isNumber(currentPress) && !isOperator(previousPress)) {
    previousPress = currentPress;
    currentString += currentPress;
    calcDisplay.textContent = currentString;
  } else if (isNumber(currentPress) && isOperator(previousPress)) {
    previousString = currentString;
    currentString = ''
    currentString += currentPress;
    calcDisplay.textContent = currentString;
  }

  // if press decimal check if already decimal
  
  if (currentPress == '.' && !currentString.includes('.')) {
    // previous press??
    currentString += '.'
    calcDisplay.textContent = currentString;
  }

  // if press operator, check last keypress
  // > if previousPress was operator, replace operator AND previousPress
  // > if previousPress was number, store number in previousString, store operator, clear currentString
  if (isOperator(currentPress)) {
    operator = currentPress;
    previousPress = currentPress;
  }
  
  // if press =
  if (currentPress == '=') {
    calcDisplay.textContent = operateAB(previousString, currentString, operator);
  };

  // if press %
}


// function buttonPressOld(e) {

//   let currentPress = e.target.textContent;

//   // press CE twice or C once 
//   if ((e.target.textContent == 'CE' && previousPress == 'CE') || (e.target.textContent == 'C')) {
//     calcDisplay.textContent = '0';
//     previousString = '';
//     currentString = '';
//     operator = '';
//   };

//   // press CE once
//   if (e.target.textContent == 'CE') {
//     calcDisplay.textContent = '0';
//     previousPress = 'CE';
//     operator = '';
//   };
  
//   // press 0-9
//   if (!isNaN(currentPress) && isFinite(currentPress) && e.target.textContent !== '.') {

//     if (calcDisplay.textContent == '0') {calcDisplay.textContent = ''}; // remove left 0 before other nums
    
//     if ((previousString !== '') && (operator !== '') && (currentString == '')) {    //clear display after pressing operator
//       calcDisplay.textContent = '';
//     }

//     calcDisplay.textContent += currentPress;
//     currentString = calcDisplay.textContent;
//   }

//   // press .
//   if (e.target.textContent == '.' && !calcDisplay.textContent.includes('.')) {  // avoid multiple .
//     calcDisplay.textContent += ".";
//     previousString = currentString;
//   }
  
//   // press + - * / 
//   if (/[+x÷-]/.test(e.target.textContent)) {          
//     previousString = calcDisplay.textContent;
//     currentString = '';
    
//     if (e.target.textContent == 'x') {
//       operator = "*";
//     } else if (e.target.textContent == '÷') {
//       operator = "/"
//     } else {
//       operator = e.target.textContent;
//     }

//   };

//   //press =
//   if (e.target.textContent == '=' && currentString !== '') {
//     currentString = calcDisplay.textContent;
//     calcDisplay.textContent = +previousString + +currentString;

//     previousString = calcDisplay.textContent;
//     currentString = '';

//     // calcDisplay.textContent = previousString + operator + currentString;

//   }

// }

  // console.log(e.target.id);
  // console.log(e.target.className);

// center text on buttons, mobile looks off
// remove dot, then add it back at the end
// add hover effect, make it half-subtle
// use button-loop to add big button, do not do it separately

// when using global variables, you can change its value by just reassigning it,
// DO NOT USE LET, unless you want to keep its new value + scope in the function
// i.e. var2 = 3.3 WILL REASSIGN GLOBAL VARIABLE
// i.e. let var3 = 200 WILL NOT REASSIGN GLOBAL 