class PacmanPlayer {
    constructor(className, startIndex) {
        this.className = className;
        this.startIndex = startIndex;
        this.row = this.startIndex[0];
        this.col = this.startIndex[1];
        this.speed = 200;
        this.direction = 'right';
        this.pelletCount = 0;
        this.score = 0;
        this._highScore = JSON.parse(localStorage.getItem('high-score')) || 0
        this.moveLoop;
    }
    get highScore() {
        return this._highScore;
    }
    set highScore(value) {
        if (value > this.highScore) {
            this._highScore = value;
            localStorage.setItem('high-score', JSON.stringify(this.highScore))
        }
    }
    interval() {
        this.moveLoop = setTimeout(() => this.checkPacmanNextPosition(), this.speed);
    }
    givePacmanDirection() {
        clearTimeout(this.moveLoop);  
        this.interval(); 

        if ((board.pacmanCaptured) ||
           (board.levelCompleter)) {
            clearTimeout(this.moveLoop);
        }
    }
    control(e) {
        if ((board.pacmanCaptured) ||
           (board.levelComplete)) {
            return
        }
        switch(e.keyCode) {
            case 39:
                this.direction = 'right';
            break
            case 37:
                this.direction = 'left';
            break
            case 38:
                this.direction = 'up';
            break
            case 40:
                this.direction = 'down';
            break
        }
        this.givePacmanDirection();
    }
    checkPacmanNextPosition() {
        if (board.pelletsAvailable === 0) {
            if (board.powerMode) {
                clearTimeout(board.revertWall)
                board.normalWall()
            }
            
            board.levelComplete = true;
            setTimeout(() => this.clearPlayer(), 500)
            board.completeLevel()
            //board.nextLevel()
            return
        }
        if (this.checkPosition()) {
            this.removePacman();
            this.updatePosition();
            this.checkGhost();
            this.checkObjectInSquare()
            this.movePacman();
        } 
    }
    checkPosition() {
        const [distanceFromPreviousRow, distanceFromPreviousCol] = this.getDistance();
        const nextRow = this.row + distanceFromPreviousRow;
        const nextCol = this.col + distanceFromPreviousCol;
        
        if (nextCol === -1 ||
            nextCol === width) {
                this.moveThroughTunnel(nextCol);
        }
        else if (!(squares[nextRow][nextCol].classList.contains('wall')) &&
        !(squares[nextRow][nextCol].classList.contains('ghost-lair')) &&
        !(squares[nextRow][nextCol].classList.contains('ghost-gate'))) {
            return true;
        }
        return false;
    }
    getDistance() {
        return this.direction === 'right' ? [0, 1]
            :  this.direction === 'left'  ? [0, -1]
            :  this.direction === 'up'    ? [-1, 0]
            :  [1, 0]
    }
    moveThroughTunnel(col) {
        if (col === -1) {
            this.removePacman();
            this.col+= width-1;
            this.movePacman();
        }
        else {
            this.removePacman();
            this.col-= width-1;
            this.movePacman();
        }
    }
    removePacman() {  
        squares[this.row][this.col].classList.remove(`${this.className}`);
        squares[this.row][this.col].classList.remove(`${this.className}-right`);
        squares[this.row][this.col].classList.remove(`${this.className}-left`);
        squares[this.row][this.col].classList.remove(`${this.className}-up`);
        squares[this.row][this.col].classList.remove(`${this.className}-down`);
        squares[this.row][this.col].classList.remove(`${this.className}-death`);
    }
    updatePosition() {
           this.direction === 'right' ? this.col++
        :  this.direction === 'left'  ? this.col--
        :  this.direction === 'up'    ? this.row--
        :  this.row++

        // squares[this.row][this.col].classList.add(`${this.className}`);
        // squares[this.row][this.col].classList.add(`${this.className}-${this.direction}`);
    }
    movePacman() {
        squares[this.row][this.col].classList.add(`${this.className}`);
        squares[this.row][this.col].classList.add(`${this.className}-${this.direction}`);
    
        this.givePacmanDirection();
    }
    eatPellet() {
        this.updateScores(board.pellet)
        this.updatePelletCount()
        this.releaseFruit();
        
        if (this.pelletCount % 72 === 0) {
            blinky.elroy()
            console.log(blinky.speed)
        }
    }
    eatFruit() {
        this.updateScores(board.fruit);
        board.showBonusPoints();
    }
    eatPowerPellet() {
        this.updateScores(board.powerPellet);
        this.updatePelletCount()
        this.releaseFruit();
        setTimeout(() => board.changeWall(), 200);

        if (this.pelletCount % 72 === 0) {
            blinky.elroy()
        }
    }
    checkGhost() {
        if (squares[this.row][this.col].childNodes.length > 0) {
            
            if (squares[this.row][this.col].childNodes[0].classList.contains('blinky') ||
            squares[this.row][this.col].childNodes[0].classList.contains('inky') ||
            squares[this.row][this.col].childNodes[0].classList.contains('clyde') ||
            squares[this.row][this.col].childNodes[0].classList.contains('pinky')) {
                
                let enemy = eval(squares[this.row][this.col].childNodes[0].classList[0]);
    
                this.victimOrHero(enemy);
            }   
        }
    }
    victimOrHero(enemy) {
        if (enemy.isFrighten === false && enemy.dead === false) {
            board.pacmanCaptured = true;
            this.pacmanDeathAnimation();
            // return
        }
        else if (enemy.isFrighten === true && enemy.dead === false) {
            enemy.dead = true;
            enemy.isFrighten = false;
            this.ghostEatenAnimation();
            //board.showBonusPoints()
        }
    }
    pacmanDeathAnimation() {

        // for (let i in layout) {
        //     for (let j in layout[i]) {
        //         if (squares[i][j].classList.contains('pacman')) {
        //             squares[i][j].classList
        //               .remove(...squares[i][j].classList);
        //         squares[i][j].classList.add('empty');
        //         }
        //     }
        // }
        // squares[this.row][this.col].classList
        //             .remove(...squares[this.row][this.col].classList);
        //         squares[this.row][this.col].classList.add('empty');
                this.clearPlayer()
                //this.removePacman()
                squares[this.row][this.col].classList.add(`${this.className}-death`);
                //setTimeout(() => this.givePacmanDirection(), 2500);
                setTimeout(() => this.removePacman(), 2500);
                setTimeout(() => board.checkLivesLeft(), 5000);
    }
    ghostEatenAnimation() {
        let div = document.createElement('div');
        div.setAttribute('class', 'eat-fx');
        squares[this.row][this.col].appendChild(div);
    }
    releaseFruit() {
        //const currentGameLevel = board.level
        // depending on which level pass in value to dropFruit()
        // fruit will be chosen from array
        if (this.pelletCount === 1) {
            board.dropFruit(1) 
        }
        if (this.pelletCount === 200) {
            board.dropFruit(1)
        }
        
    }
    checkObjectInSquare() {
        //console.log(...squares[player.row][player.col].classList)
        const objectInSquare = squares[this.row][this.col].classList
            .value
            .split(' ')
            .filter(object => object !== 'empty')
            .join('');

        const regex = /\w+fruit/

        squares[this.row][this.col].classList
            .remove(...squares[this.row][this.col].classList);
        
        if (objectInSquare) {
              objectInSquare === 'pellet'       ? this.eatPellet()
            : objectInSquare === 'power-pellet' ? this.eatPowerPellet()
            : regex.test(objectInSquare)        ? this.eatFruit()
            : null
        }
        
        //scoreDisplay.textContent = this.score;
        // overwrite previous highScore if better
        //localStorage.setItem('high-score', JSON.stringify(this.score))
        squares[this.row][this.col].classList.add('empty');
       
    }
    checkHighScore() {
        this.score > this.highScore
    }
    updateScores(value) {
        this.score += value;
        this.highScore = this.score
        scoreDisplay.textContent = this.score;
        board.highScoreDisplay.textContent = this.highScore;
    }
    updatePelletCount() {
        this.pelletCount++;
        board.pelletsAvailable--

        // if (board.pelletsAvailable === 0) {
        //     board.levelComplete = true;
        //     setTimeout(() => this.clearPlayer(), 500)
        //     board.nextLevel()
        // }
    }
    clearPlayer() {
        for (let i in layout) {
            for (let j in layout[i]) {
                if (squares[i][j].classList.contains('pacman')) {
                    squares[i][j].classList
                      .remove(...squares[i][j].classList);
                squares[i][j].classList.add('empty');
                }
            }
        }
    }
    clearBoard() {
        // for (let i in layout) {
        //     for (let j in layout[i]) {
        //         if (!(squares[i][j].classList.contains('wall'))) {
        //             squares[i][j].classList
        //               .remove(...squares[i][j].classList);
        //         squares[i][j].classList.add('empty');
        //         }
        //     }
        // }
        for (let i in layout) {
            for (let j in layout[i]) {
                    squares[i][j].classList
                      .remove(...squares[i][j].classList);
                //squares[i][j].classList.add('empty');
            }
        }
    }
}

const playerCharacter = 'pacman' || 'msPacman';

let player = new PacmanPlayer(playerCharacter, [17, 14]);
player.movePacman();
//player.fruitReleaseTimer()

document.addEventListener('keydown', (e) => {
    player.control(e);
})

board.highScoreDisplay.textContent = player.highScore;
scoreDisplay.textContent = player.score;


// let regex = /\w+fruit/
// let word = 'cherryfruit'
// console.log(regex.test(word))



