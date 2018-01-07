'use strict';

const gameboardArray = [
    {
        name: 'Gameboard1',
        array: [
            [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 1, 1, 1, 1, 0, 0],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 1, 0, 0, 0, 1, 0, 0, 0],
            [1, 0, 0, 1, 1, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 0, 0, 0, 0, 1, 1, 0],
            [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
    }, {
        name: 'Gameboard2',
        array: [
            [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 1, 1, 1, 1, 0, 0],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 1, 0, 0, 0, 1, 0, 0, 0],
            [1, 0, 0, 1, 1, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 0, 0, 0, 0, 1, 1, 0],
            [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
    }, {
        name: 'Gameboard3',
        array: [
            [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 1, 1, 1, 1, 0, 0],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 1, 0, 0, 0, 1, 0, 0, 0],
            [1, 0, 0, 1, 1, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 0, 0, 0, 0, 1, 1, 0],
            [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
    }
];

class BaseElement {
    createElement() {


    }


    getElement() {
        return this.elementState.element;

    }

    setElement() {
        this.elementState = {
            element: this.createElement()
        }

        this.initialize();
        return this.getElement();
    }

    initialize() {


    }
}


class Cell extends BaseElement {
    constructor({isShip, location, gameboard}) {
        super();
        this.isShip = isShip;
        this.location = location;
        this.state = 'unknown';
        this.gameboard = gameboard;
        this.onClick = this.fireTorpedo;
    }

    createElement() {
        const element = document.createElement('div');
        element.addEventListener('click', this.onClick.bind(this));

        return element;
    }


    setState(state) {
        this.state = state;
        this.refresh();
    }

    fireTorpedo() {
        if (this.isShip) {
            this.gameboard.score += 1;
            gameResult.innerHTML = '';
            gameResult.append(`${this.gameboard.score}/${this.gameboard.totalScore}`);
            this.setState('hit');
        } else {
            this.setState('miss');
        }

    }

    refresh() {
        this.getElement().className = `cell-${this.state}`;
    }

    initialize() {
        this.refresh();
    }
}


class Gameboard extends BaseElement {
    constructor({size}) {
        super();
        this.cells = [];
        this.rowNumber = size;
        this.columnNumber = size;
        this.fleet = gameboardArray[Math.floor(Math.random() * gameboardArray.length)]
        this.score = 0;
        this.totalScore = this.getTotalScore(this.fleet);

        for (let rowIndex = 0; rowIndex < this.rowNumber; ++rowIndex) {
            for (let columnIndex = 0; columnIndex < this.columnNumber; ++columnIndex) {
                this.cells.push(new Cell({
                    isShip: this.fleet.array[rowIndex][columnIndex] === 1 ? true : false,
                    location: [rowIndex, columnIndex],
                    gameboard: this
                }));
            }
        }
        gameResult.append(`${this.score}/${this.totalScore}`)
    }

    createElement() {
        const gameboard = document.createElement('div');
        gameboard.className = 'gameboard';

        for (let rowIndex = 0; rowIndex < this.rowNumber; ++rowIndex) {
            const rowArray = [];
            const row = document.createElement('div');
            row.className = 'board-row';


            for (let columnIndex = 0; columnIndex < this.columnNumber; ++columnIndex) {
                const cell = this.cells[rowIndex * this.columnNumber + columnIndex];

                row.appendChild(cell.setElement());
            }
            gameboard.appendChild(row);
        }

        return gameboard;
    }

    getTotalScore(fleet) {
        let total = 0;

        // fleet.array.forEach(function(row) {
        //
        // });

        fleet.array.forEach((row) => {
            total += row.filter((x) => {
                return x === 1
            }).length
        });

        return total;
    }
}

const gameboardContainer = document.getElementById('gameboardContainer');
const gameResult = document.getElementById('gameResult');
const gameboard = new Gameboard({size: 10});
gameboardContainer.appendChild(gameboard.setElement());



