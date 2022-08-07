class PacmanBoard {
    constructor() {
        this.width = 28;
        this.grid = document.querySelector('.grid');
        this.scoreDisplay = document.getElementById('score');
        this.highScoreDisplay = document.getElementById('high-score')
        this.pacmanCaptured = false;
        this.pellet = 10;
        this.powerPellet = 50;
        this.pelletsAvailable = 0
        this.fruit = 100; // multiplied by current level
        this.squares = [];
        this.lives = 1;
        this.gameOver = false;
        this.levelComplete = false;
        this.revertWall;
        this.powerMode = false;
        this.layout = [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
            [1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1],
            [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1],
            [1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1],
            [1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1],
            [1,1,1,1,1,1,0,1,1,4,1,1,1,5,5,1,1,1,4,1,1,0,1,1,1,1,1,1],
            [1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1],
            [4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4],
            [1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1],
            [1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1],
            [1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1],
            [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
            [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
            [1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1],
            [1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1],
            [1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1],
            [1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1],
            [1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1],
            [1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ];
    }
    createBoard() {
        //const { layout, squares } = this
        for (let i in layout) {
            let row = [];
    
            for (let j in layout[i]) {
                
                const square = document.createElement('div');
                this.grid.appendChild(square);
                row.push(square);
            }
            squares.push(row);
        }
    }
    buildLayout() {
        //const { layout, squares } = this
        for (let i in layout) {
            for (let j in layout[i]) {
                
                if (layout[i][j] === 0) {
                    squares[i][j].classList.add('empty');
                    squares[i][j].classList.add('pellet');
                    this.pelletsAvailable++
                } else if (layout[i][j] === 1) {
                    squares[i][j].classList.add('wall');
                    squares[i][j].classList.add('wall-style');
                } else if (layout[i][j] === 2) {
                    squares[i][j].classList.add('ghost-lair');
                } else if (layout[i][j] === 3) {
                    squares[i][j].classList.add('empty');
                    squares[i][j].classList.add('power-pellet');
                    this.pelletsAvailable++
                } else if (layout[i][j] === 4) {
                    squares[i][j].classList.add('empty');
                } else if (layout[i][j] === 5) {
                    squares[i][j].classList.add('ghost-gate');
                }
            }
        }
    }
    corners() {
        //const { layout, squares } = this
        for (let i = 1; i < layout.length-1; i++) {
            for (let j = 1; j < layout[i].length-1; j++) {
    
                if (squares[i-1][j].classList.contains('empty') &&
                    squares[i-1][j+1].classList.contains('empty') &&
                    squares[i][j+1].classList.contains('empty')) {
                        squares[i][j].classList.add('top-right-corner');
                        squares[i][j].classList.add('corner');
                    }
                if (squares[i-1][j].classList.contains('empty') &&
                    squares[i-1][j-1].classList.contains('empty') &&
                    squares[i][j-1].classList.contains('empty')) {
                        squares[i][j].classList.add('top-left-corner');
                        squares[i][j].classList.add('corner');
                }
                if (squares[i+1][j].classList.contains('empty') &&
                    squares[i+1][j+1].classList.contains('empty') &&
                    squares[i][j+1].classList.contains('empty')) {
                        squares[i][j].classList.add('bottom-right-corner');
                        squares[i][j].classList.add('corner');
                    }
                if (squares[i+1][j].classList.contains('empty') &&
                    squares[i+1][j-1].classList.contains('empty') &&
                    squares[i][j-1].classList.contains('empty')) {
                        squares[i][j].classList.add('bottom-left-corner');
                        squares[i][j].classList.add('corner');
                }
            }
        }
    }
    borders() {
        //const { layout, squares } = this
        for (let i = 1; i < layout.length-1; i++) {
            for (let j = 1; j < layout[i].length-1; j++) {
    
                if (squares[i-1][j].classList.contains('empty') &&
                    squares[i+1][j].classList.contains('empty') &&
                    squares[i][j].classList.contains('wall') &&
                    !(squares[i][j].classList.contains('corner'))) {
                    squares[i][j].classList.add('power-top-border');
                        squares[i][j].classList.add('power-bottom-border');
                }
                else if (squares[i-1][j].classList.contains('empty') && 
                        squares[i][j].classList.contains('wall') &&
                        !(squares[i][j].classList.contains('corner'))) {
                            squares[i][j].classList.add('power-top-border');
                }
                else if (squares[i+1][j].classList.contains('empty') && 
                        squares[i][j].classList.contains('wall') &&
                        !(squares[i][j].classList.contains('corner'))) {
                            squares[i][j].classList.add('power-bottom-border');
                }
                else if (squares[i][j-1].classList.contains('empty') && 
                        squares[i][j].classList.contains('wall') &&
                        !(squares[i][j].classList.contains('corner'))) {
                            squares[i][j].classList.add('power-left-border');
                }
                else if (squares[i][j+1].classList.contains('empty') && 
                        squares[i][j].classList.contains('wall') &&
                        !(squares[i][j].classList.contains('corner'))) {
                            squares[i][j].classList.add('power-right-border');
                }
            }
        }
    }
    borderWall() {
        //const { layout, squares } = this
        for (let i = 1; i < layout.length-1; i++) {
            if (squares[i][1].classList.contains('empty') &&
               squares[i][0].classList.contains('wall'))
            squares[i][0].classList.add('power-right-border');
        }
        for (let i = 1; i < layout.length-1; i++) {
            if (squares[i][layout.length-2].classList.contains('empty') &&
               squares[i][layout.length-1].classList.contains('wall'))
            squares[i][layout.length-1].classList.add('power-left-border');
        }
        for (let j = 1; j < layout.length-1; j++) {
            if (squares[1][j].classList.contains('empty') &&
               squares[0][j].classList.contains('wall'))
            squares[0][j].classList.add('power-bottom-border');
        }
        for (let j = 1; j < layout.length-1; j++) {
            if (squares[layout.length-2][j].classList.contains('empty') &&
               squares[layout.length-1][j].classList.contains('wall'))
            squares[layout.length-1][j].classList.add('power-top-border');
        }
    }
    changeWall() {
        this.powerMode = !(this.powerMode);
        pinky.isFrighten = true;
        blinky.isFrighten = true;
        inky.isFrighten = true;
        clyde.isFrighten = true;
        
        for (let i in squares) {
            
            squares[i].forEach(function(x) {
    
                if (x.classList.contains('wall')) {
                    x.classList.add('power-wall');
                    x.classList.remove('wall-style');
                }
                if (x.classList.contains('top-right-corner')) {
                    x.classList.add('power-top-right-corner');
                }
                if (x.classList.contains('top-left-corner')) {
                    x.classList.add('power-top-left-corner');
                }
                if (x.classList.contains('bottom-right-corner')) {
                    x.classList.add('power-bottom-right-corner');
                }
                if (x.classList.contains('bottom-left-corner')) {
                    x.classList.add('power-bottom-left-corner');
                }
                if (x.classList.contains('ghost-lair')) {
                    x.classList.add('power-ghost-lair');
                }
    
            })
        }
        this.borders();
        this.borderWall();
        this.revertWall = setTimeout(() => this.normalWall(), 10000);
    }
    normalWall() {
        this.powerMode = !(this.powerMode);
        pinky.isFrighten = false;
        blinky.isFrighten = false;
        inky.isFrighten = false;
        clyde.isFrighten = false;
    
        for (let i in squares) {
            squares[i].forEach(function(x) {
        
                if (x.classList.contains('wall')) {
                    x.classList.add('wall-style');
                    x.classList.remove('power-wall');
                    x.classList.remove('power-right-border');
                    x.classList.remove('power-left-border');
                    x.classList.remove('power-top-border');
                    x.classList.remove('power-bottom-border');
                    x.classList.remove('power-top-right-corner');
                    x.classList.remove('power-top-left-corner');
                    x.classList.remove('power-bottom-right-corner');
                    x.classList.remove('power-bottom-left-corner');
                }
                else if (x.classList.contains('ghost-lair')) {
                    x.classList.remove('power-ghost-lair')
                }
            })
        }
    }
    dropFruit(level) {
        const fruitArray = ['null', 'cherry', 'strawberry', 'watermelon']
        squares[17][13].classList.add(`${fruitArray[`${level}`]}`)
        squares[17][13].classList.add('fruit')
        setTimeout(() => squares[17][13].classList.remove('cherry'), 10000)
        setTimeout(() => squares[17][13].classList.remove('fruit'), 10000)
    }
    showBonusPoints() {
        squares[17][13].classList.add('bonus')
        setTimeout(() => squares[17][13].classList.remove('bonus'), 1000)
    }
    // clearBoard() {

    // }
    checkLivesLeft() {
        //localStorage.setItem('test', JSON.stringify(squares))
        //let test = [...this.squares]
        //localStorage.setItem('game', JSON.stringify(test[0][1]));
        //localStorage.squares = JSON.stringify(this.squares[0][2])
        //console.log(test)
        //localStorage.setItem('squares', document.documentElement.innerHTML);

        if (this.lives !== 0) {
            this.lives--
            this.pacmanCaptured = false;
            //player = {}
            this.resetPlayerAndGhosts()
        }
        else {
            this.gameOver = true
        }
    }
    resetPlayerAndGhosts() {
        board.levelComplete = false;
        player.col = 14
        player.row = 17
        player.direction = 'right'
        player.movePacman();

        blinky.ghostXposition = 13
        blinky.ghostYposition = 10
        blinky.speed = blinky.startLevelSpeed
        blinky.normalSpeed = blinky.startLevelSpeed

        pinky.ghostXposition = 16
        pinky.ghostYposition = 14

        inky.ghostXposition = 13
        inky.ghostYposition = 14

        clyde.ghostXposition = 16
        clyde.ghostYposition = 14

        blinky.checkGhostStatus();
        inky.checkGhostStatus();

        pinky.checkGhostStatus();
        clyde.checkGhostStatus();

    }
    nextLevel() {
        player.clearBoard()
        player.pelletCount = 0
        this.buildLayout();
        this.corners();
        setTimeout(() => this.resetPlayerAndGhosts(), 3000)

    }
    completeLevel1() {
        for (let i in layout) {
            for (let j in layout[i]) {
                if (squares[i][j].classList.contains('wall')) {
                    // squares[i][j].classList
                    //   .remove(...squares[i][j].classList);
                squares[i][j].classList.add('completed-level-fx');
                }
            }
        }
        setTimeout(() => this.nextLevel(), 3000)
    }
    completeLevel() {
        //const { layout, squares } = this
        for (let i = 0; i < layout.length-1; i++) {
            if (squares[i][0].classList.contains('wall'))
            squares[i][0].classList.add('completed-level-fx');
        }
        for (let i = 0; i < layout.length-1; i++) {
            if (squares[i][layout.length-1].classList.contains('wall'))
            squares[i][layout.length-1].classList.add('completed-level-fx');
        }
        for (let j = 0; j < layout.length-1; j++) {
            if (squares[0][j].classList.contains('wall'))
            squares[0][j].classList.add('completed-level-fx');
        }
        for (let j = 0; j < layout.length-1; j++) {
            if (squares[layout.length-1][j].classList.contains('wall'))
            squares[layout.length-1][j].classList.add('completed-level-fx');
        }
        setTimeout(() => this.nextLevel(), 1500)
    }
}

// Game.loadFile = function(){
//     var file = JSON.parse(localStorage.getItem('saveFile'));
//     Game.scene.score = file.score;
//     Game.scene.visits = file.visits;
// };
//localStorage.heroInventory = JSON.stringify(inventory);

// …later

//this.inventory = JSON.parse(localStorage.heroInventory);


const board = new PacmanBoard();
let { layout, squares, scoreDisplay, width } = board;

board.createBoard();
board.buildLayout();
board.corners();
//board.loadGame()
//board.fruitReleaseTimer();


//let newPath;
//let step = 1;
//squares[17][9].innerHTML = 'P'

