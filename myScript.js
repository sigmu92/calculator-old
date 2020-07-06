const DISPLAY = document.querySelector('.display')
const BUTTONS = document.querySelectorAll('button')
const NUMBERS = document.querySelectorAll('.num-button')
const OPR = document.querySelectorAll('.opr-button')
const EQUAL = document.querySelector('.equal-button')
const CLEAR = document.querySelector('.clear-button')

let results = false; //Tracks if results are being show
let needNum = true; //Tracks if number is required to be entered, or if operator entry is okay
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
    needNum = false; //Operator entry okay now
    if (results == false){ 
        DISPLAY.textContent+=`${this.value}`
    }
    else {
        DISPLAY.textContent= `${this.value}`
        results = false;
    }
}

function getOpr(){
    if (needNum == true) {
        DISPLAY.textContent='ERROR';
    } else{
    inputs.push(Number(DISPLAY.textContent));
    DISPLAY.textContent='';
    inputs.push(this.value);
    needNum = true;
    }
}

function calculate(){

    inputs.push(Number(DISPLAY.textContent));
    let reference = 0; //reference to reinsert total into input array
    let total = 0; //total value, being calculated
    let findPri = false;
    if (inputs.length%2==0){
        DISPLAY.textContent="ERROR"
        return;
    }
    while (inputs.length>1){
        //Loops until inputs has been reduced to a total
        for (let i=0; i<inputs.length; i++){
            if (inputs[i]=='*' || inputs[i]=='/'){
                reference = i-1;
                findPri = true;
                break;
            }
        }
        if (findPri == true){
            let sentence = inputs.splice(reference,3);
            total = collapseInput(sentence);
            if (total=="Div"){
                return;
            }
            findPri=false;
        } else {
            for (let i=0; i<inputs.length; i++){
                if (inputs[i]=='+' || inputs[i]=='-'){
                    reference = i-1;
                    break;
                }
            }
            let sentence = inputs.splice(reference,3);
            total = collapseInput(sentence);
            if (total=="Div"){
                return;
            }
        }   
        inputs.splice(reference,0,total)
    }

    DISPLAY.textContent=`${inputs[0]}`;
    inputs=[];
    results = true;
}   
function clearInputs(){
    DISPLAY.textContent='';
    inputs=[];
}

function collapseInput(sentence) {
    const a = sentence[0];
    const operator = sentence[1];
    const b = sentence[2];
    if (b==0 && operator =='/'){
        DISPLAY.textContent = "ERROR"
        inputs = [];
        return("Div");
    } 
    const total=operate(a,b,operator);
    return(total);
}

NUMBERS.forEach((button) => button.addEventListener('click', getNum));
OPR.forEach((button) => button.addEventListener('click', getOpr))
EQUAL.addEventListener('click', calculate)
CLEAR.addEventListener('click', clearInputs)

