import { Picks } from './Picks.js';
import { History } from './History.js';
import { RuleCheck } from './RuleCheck.js';
import { NumberTable } from './NumberTable.js';

const RESULT_HISTORY = new History();
const CONFIG = {
    // How many numbers to generate
    numberIndex: 3,
    // Maxiumn and minium pool of numbers to generate from
    maxNumber: 17,
    lowestNumber: 1,
    // Add the generated numbers and make sure they are in the range of the minium
    // and maximium sum range.
    minSumNumber: 3,
    maxSumNumber: 30,
    // Using the past numbers, make sure the generated numbers have X amount of numbers from
    // the previous specified result.
    repeatHitAmount: 1,
    // What number will the program consider "High". This is used to determine the High and
    // Low value amount.
    highThreshold: 5
};
const TABLE = new NumberTable({...CONFIG, element:document.getElementById('board')});

function pickNumbers(pastNumbers) {
    const picks = new Picks({...CONFIG, pastResult: pastNumbers});
    picks.run();
    return picks.result;
}

function getNumbersFromInput() {
    return document.getElementById('numbers').value;
}

function parseInputNumbers(numbers) {
    let result = null;
    if (numbers) {
        result = numbers.split(' ').map((number) => {
            if (number) {
                return parseInt(number, 10);
            }
            return null;
        });
    }
    return result;
}

function storeResult(numbers) {
    RESULT_HISTORY.inputedNumbers = numbers;
}

function displayHistory(numbers) {
    const historyList = document.getElementById('history');
    const listItem = document.createElement('li');
    listItem.innerText = (numbers.length != 0) ? numbers.toString() : "Error";
    listItem.addEventListener('click', (event)=>{
        TABLE.update(event.target.innerText.split(','));
    });
    historyList.appendChild(listItem);
}

function displayResult(pickedNumbers) {
    // document.getElementById('result').innerText = (pickedNumbers.length !== 0) ? pickedNumbers.toString() : "Error";
    TABLE.update(pickedNumbers);
}

function runButtonAction() {
    document.getElementById('run').onclick = () => {
        let numbers = getNumbersFromInput();
        numbers = parseInputNumbers(numbers);
        const pickedNumbers = pickNumbers(numbers);
        storeResult(pickedNumbers);
        displayHistory(pickedNumbers);
        displayResult(pickedNumbers);
    };
}

function initNumberPicker() {
    runButtonAction();
}

// Wait For the Dom To finish loading;
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('numbers').addEventListener('change', (event) => {
        if (event.target.value) {
            TABLE.update(parseInputNumbers(event.target.value));
        }
    })
    initNumberPicker();
});