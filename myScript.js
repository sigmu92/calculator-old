const DISPLAY = document.querySelector('.display')
const BUTTONS = document.querySelectorAll('button')
const NUMBERS = document.querySelectorAll('.num-button')
const OPR = document.querySelectorAll('.opr-button')
const EQUAL = document.querySelector('.equal-button')
const CLEAR = document.querySelector('.clear-button')

let results = false;
let inputs = [];

function add(a,b){
    return(a+b);
};

function subtract(a,b){
    return(a-b);
}

function multiply(a,b){
    return(a*b);
}

function divide(a,b){
    return(Math.floor(a/b))
}

function operate(a,b,operator){
    switch(operator){
        case '+':
            return(add(a,b))            
        case '-':
            return(subtract(a,b))
        case '*':
            return(multiply(a,b))
        case '/':
            return(divide(a,b))            
    }
}

function getNum(){
    if (results == false){ 
        DISPLAY.textContent+=`${this.value}`
    }
    else {
        DISPLAY.textContent= `${this.value}`
        results = false;
    }
}

function getOpr(){
    inputs.push(Number(DISPLAY.textContent));
    DISPLAY.textContent='';
    inputs.push(this.value);

}

function calculate(){
    inputs.push(Number(DISPLAY.textContent));
    let total = 0;
    let a,b,operator;
    console.log(inputs)
    a=inputs.shift();
    operator=inputs.shift();
    b=inputs.shift();
    console.log(b);
    console.log(operator);
    if (b==0 && operator =='/'){
        DISPLAY.textContent = "ERROR"
        inputs = [];
        return;
    } 
    total+=operate(a,b,operator);
    DISPLAY.textContent=`${total}`;
    results = true;
}   


NUMBERS.forEach((button) => button.addEventListener('click', getNum));
OPR.forEach((button) => button.addEventListener('click', getOpr))
EQUAL.addEventListener('click', calculate)