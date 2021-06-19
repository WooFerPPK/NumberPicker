export class NumberTable {
    constructor({maxRows = 10, maxNumber, element}) {
        this.maxNumber = maxNumber;
        this.maxRows = maxRows;
        this.element = element
        this.table = this.create(this.element);
    }

    create(element) {
        let table = [];
        let tableElement = document.createElement('table');
        let rowCount = 0;
        let maxCalcRow = 0;
        const number = this.maxNumber;

        for (let i = this.maxRows; i >= 1; i--) {
            if (number % i === 0) {
                maxCalcRow = i;
                break;
            }
        }

        for (let arrayIndex = 0; arrayIndex <= (number - 1); arrayIndex++) {
            let outputNumber = arrayIndex + 1;

            if (!table[rowCount]) {
                table.push([outputNumber]);
            } else {
                table[rowCount].push(outputNumber);
            }

            rowCount++;

            if (rowCount === maxCalcRow) {
                rowCount = 0;   
            }
        }

        for (let row = 0; row <= (table.length - 1); row++) {
            const tr = document.createElement('tr');
            for (let column = 0; column <= (table[row].length - 1); column++) {
                const number = table[row][column];
                const td = document.createElement('td');
                td.innerText = number;
                td.id = `slot-${number}`;
                td.className = 'slot';
                tr.appendChild(td);
            }
            tableElement.appendChild(tr)
        }
        element.appendChild(tableElement);
        return element;
    }

    update(pickedNumbers) {
        for (let slot = 0; slot <= this.element.getElementsByClassName("slot").length - 1; slot++) {
            this.element.getElementsByClassName("slot")[slot].classList.remove("selected");
            for (let picked = 0; picked <= pickedNumbers.length; picked++) {
                if (this.element.getElementsByClassName("slot")[slot].id === `slot-${pickedNumbers[picked]}`) {
                    this.element.getElementsByClassName("slot")[slot].classList.add("selected");
                }
            }
        }
    }
}
