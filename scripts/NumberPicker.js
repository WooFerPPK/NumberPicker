import { Picks } from './Picks.js';
import { History } from './History.js';

const RESULT_HISTORY = new History();

function pickNumbers(pastNumbers) {
    const picks = new Picks({
        // How many numbers to generate
        numberIndex: 3,
        // Maxiumn and minium pool of numbers to generate from
        maxNumber: 10,
        lowestNumber: 1,
        // Previous numbers inputed
        pastResult: pastNumbers,
        // Add the generated numbers and make sure they are in the range of the minium
        // and maximium sum range.
        minSumNumber: 3,
        maxSumNumber: 30,
        // Using the past numbers, make sure the generated numbers have X amount of numbers from
        // the previous specified result.
        repeatHitAmount: 1,
        // What number will the program consider "High". This is used to determine the High and
        // Low value amount.
        highThreshold: 5,
        // The array numbers should be the sum of total number index.
        highAndLowValidAmounts: { high: [1], low: [2] },
        evenAndOddValidAmounts: { even: [1], odd: [2] }
    });
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
    listItem.innerText = numbers.toString();
    historyList.appendChild(listItem);
}

function displayResult(pickedNumbers) {
    document.getElementById('result').innerText = pickedNumbers.toString();
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
    initNumberPicker();
});
