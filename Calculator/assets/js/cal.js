const calculator={
    displayValue:'0',
    firstOperand:null,
    waitingForSecondOperand:false,
    operator:null

};

function updateDisplay(){
    const display=document.querySelector("#cal");
    display.value=calculator.displayValue;
}

updateDisplay();


function inputDigit(digit){
    const{displayValue,waitingForSecondOperand}=calculator;
    if(waitingForSecondOperand===true){
        calculator.displayValue=digit;
        calculator.waitingForSecondOperand=false;
    }else{
        calculator.displayValue=displayValue=='0'? digit:displayValue+digit;
    }
}
function inputDot(dot){
    if(calculator.waitingForSecondOperand===true){
        return;
    }
    if(!calculator.displayValue.includes(dot)){
        calculator.displayValue+=dot;
    }
}

function resetCalculation(){
    calculator.displayValue='0';
    calculator.waitingForSecondOperand=false;
    calculator.operator=null;
    calculator.firstOperand=null;
}

function handleOperation(nextOperator){

    const{displayValue,firstOperand,operator}=calculator;
     
    if(operator && calculator.waitingForSecondOperand){
        calculator.operator=nextOperator;
        return;
    }
    if(firstOperand===null){
        calculator.firstOperand=displayValue;
    }else if(operator){
        const inputValue=parseFloat(displayValue);
        const currentValue=calculator.firstOperand;
        const result=performanceCalculation[operator](currentValue,inputValue);

        calculator.displayValue=String(result);
        calculator.firstOperand=result;

    }

    calculator.waitingForSecondOperand=true;
    calculator.operator=nextOperator;
}

const performanceCalculation={
    '/':(firstOperand,SecondOperand)=> firstOperand/SecondOperand,
    '+':(firstOperand,SecondOperand)=> firstOperand+SecondOperand,
    '*':(firstOperand,SecondOperand)=> firstOperand*SecondOperand,
    '-':(firstOperand,SecondOperand)=> firstOperand-SecondOperand,
    '=':(firstOperand,SecondOperand)=> SecondOperand
};


const keys=document.querySelector('.calculator-keys');

keys.addEventListener('click',function(event){

    const{target}=event;

    if(!target.matches('button')){
        return;
    }
    if(target.classList.contains('all-clear')){
        resetCalculation();
        updateDisplay()
        return;
    }
    if(target.classList.contains('decimal')){
        inputDot(target.value);
        updateDisplay();
        return;
    }
    if(target.classList.contains('operator')){
        handleOperation(target.value);
        updateDisplay();
        return;
    }
    inputDigit(target.value);
    updateDisplay();

});