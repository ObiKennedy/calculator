class Calculator{
    constructor(previousOpprandTextElement, currentOpprandTextElement){
        this.previousOpprandTextElement = previousOpprandTextElement
        this.currentOpprandTextElement = currentOpprandTextElement
        this.clear()
    }
    clear(){
        this.currentOpprand = ''
        this.previousOpprand = ''
        this.operation = undefined
    }
    delete(){
        this.currentOpprand = this.currentOpprand.toString().slice(0, -1)
    }
    appendNumber(number){
        if (number === '.' && this.currentOpprand.includes('.'))return
        this.currentOpprand = this.currentOpprand.toString() + number.toString()
    }
    chooseOperation(operation){
        if (this.currentOpprand === '')return
        if (this.previousOpprand !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOpprand = this.currentOpprand
        this.currentOpprand = ''
    }
    compute(){
        let computation
        const prev = parseFloat(this.previousOpprand)
        const current = parseFloat(this.currentOpprand)
        if (isNaN(prev) || isNaN(current))return
        switch(this.operation){
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current 
                break
            case '÷':
                computation = prev / current
                break
            case '*':
                computation = prev * current
                break
            default:
                return
        }
        this.currentOpprand = computation
        computation = undefined
        this.previousOpprand = ''
    }
    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)){
            integerDisplay = ''
        }else{
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits:0
            })
        }
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        }else{
            return integerDisplay
        }
    }
    updateDisplay(){
        this.currentOpprandTextElement.innerText = 
        this.getDisplayNumber(this.currentOpprand)
        if(this.operation != null){
            this.previousOpprandTextElement.innerText = 
            `${this.getDisplayNumber(this.previousOpprand)} ${this.operation}`
        }
    }
}
const numberButon = document.querySelectorAll('[data-number]')
const opperationButton = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const allClearButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete]')
const previousOpprandTextElement = document.querySelector('[data-previous-opprand]')
const currentOpprandTextElement = document.querySelector('[data-current-opprand]')
const calculator = new Calculator(currentOpprandTextElement, previousOpprandTextElement)
numberButon.forEach(button =>{
    button.addEventListener('click', ()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})
opperationButton.forEach(button =>{
    button.addEventListener('click', ()=>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})
equalsButton.addEventListener('click', button=>{
    calculator.compute()
    calculator.updateDisplay()
})
allClearButton.addEventListener('click', button=>{
    calculator.clear()
    calculator.updateDisplay()
})
deleteButton.addEventListener('click', button=>{
    calculator.delete()
    calculator.updateDisplay()
})