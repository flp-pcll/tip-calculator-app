const form = document.querySelector('form');
const tipBtns = document.getElementsByName('tip');
const customTipInput = document.querySelector('input#customTipPercentage');
const billValueInput = document.querySelector('input#billValue');
const totalPeopleInput = document.querySelector('input#totalPeople');

const loadTotalAmount = document.querySelector('.total-tip-person .total-tip');
const loadTotalPerPerson = document.querySelector('.total-bill-person .total-bill');

const resetBtn = document.querySelector('.reset-btn');

let percentage;
let totalTipPercent;
let isCustom = false;
let totalBillValue;
let numPeople;

let totalTipPerPerson;
let totalValuePerPerson;

const userInputs = document.querySelectorAll('[user-input-area]');
const btnLabels = document.querySelectorAll('fieldset label');


//Events:
userInputs.forEach(input => {
    input.addEventListener('focus', highlightInput);
    input.addEventListener('blur', removeHighlightInput);
})
btnLabels.forEach(option => {
    option.addEventListener('click', optionSelect);
})

resetBtn.addEventListener('click', reset);

form.addEventListener('change', prepareData);

customTipInput.addEventListener('change', (e) => {
    isCustom = true;
})

//Functions:
function prepareData(e) {
    e.preventDefault();

    checkPercentage(tipBtns, customTipInput);

    totalTipPercent = parseFloat(percentage);
    totalBillValue = parseFloat(billValueInput.value);

    numPeople = totalPeopleInput.value;
    validateNumPeople(numPeople);
    totalPeople = parseInt(numPeople);

    console.log(totalBillValue, totalTipPercent, totalPeople)
    calculateTip(totalBillValue, totalTipPercent, totalPeople);
}

function calculateTip(bill, tipPercent, numPeople) {
    totalTipPerPerson = (bill * (tipPercent/100)/numPeople);
    totalValuePerPerson = (bill + (totalTipPerPerson*numPeople))/numPeople;

    loadResults(totalTipPerPerson, totalValuePerPerson);
}

function loadResults(tipPerPerson, totalPerPerson) {
    if(Number.isNaN(tipPerPerson) || Number.isNaN(totalPerPerson)) {
        loadTotalAmount.innerHTML = `$00,00`;
        loadTotalPerPerson.innerHTML = `$00,00`;
    } else {  
        loadTotalAmount.innerHTML = `$${(parseFloat(tipPerPerson).toFixed(2)).toString().replace(".", ",")}`;
        loadTotalPerPerson.innerHTML = `$${(parseFloat(totalPerPerson).toFixed(2)).toString().replace(".", ",")}`;
    }
}

function checkPercentage(inputArray, customBtn) {
    if(isCustom == false) {
        for(let item of inputArray) {
            if(item.checked) {
                percentage = item.value;
            }            
        }
    } else {
        percentage = customBtn.value;
        document.querySelector('.btn-active').classList.remove('btn-active');
        document.querySelector('.hidden').classList.add('btn-active');
    }
    return percentage;
}

function validateNumPeople(qtd) {
    if(qtd === '' || qtd <= 0) {
        ShowErrorMessage();
    } else {
        return;
    }
}

function ShowErrorMessage() {
    const errorMessage = document.querySelector('.warning-message');
    errorMessage.classList.add('error-message');
    errorMessage.style.opacity = '100%';

    totalPeopleInput.classList.add('error-border');

    totalPeopleInput.addEventListener('click', (e) => {
        e.target.classList.remove('error-border');
        errorMessage.style.opacity = '0';
    })
}

function reset() {
    customTipInput.value = '';
    billValueInput.value = '';
    totalPeopleInput.value = '';
    customTipInput.value = '';

    totalBillValue = '';
    totalTipPercent = '';
    isCustom = false;

    loadTotalAmount.innerHTML = '$00,00';
    loadTotalPerPerson.innerHTML = '$00,00';

    document.querySelector('.btn-active').classList.remove('btn-active');
    document.querySelector('.hidden').classList.add('btn-active');
}

function optionSelect(e) {
    document.querySelector('.btn-active').classList.remove('btn-active');
    e.target.classList.add('btn-active');
    isCustom = false;
    customTipInput.innerHTML = '0';
    customTipInput.value = '';
}

function highlightInput(e) {
    e.target.classList.add('focus-highlight');
}
function removeHighlightInput(e) {
    e.target.classList.remove('focus-highlight');
}
