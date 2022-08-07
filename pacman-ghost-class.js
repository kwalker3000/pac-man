class Ghost {
    constructor(className, startIndex, homeIndex) {
        this.className = className;
        this.startIndex = startIndex;
        this.homeIndex = homeIndex;
        this.ghostYposition = this.startIndex[0];
        this.ghostXposition = this.startIndex[1];
        this.homeYposition = this.homeIndex[0];
        this.homeXposition = this.homeIndex[1];
        this.chase = false;
        this.scatter = false;
        this.stepCount = 0;
        this.isFrighten = false;
        this.dead = false;
        this.openGate = false;
        this.direction = 'right';
        this.timeout = setTimeout(() => this.scatterMode(), 500);
    }
    resetSpeed() {
        this.speed = this.normalSpeed;
    }
    chaseMode() {
        this.scatter = false;
        this.chase = true;
        var nextMode = setTimeout(() => this.scatterMode(), 20000);
    }
    scatterMode() {
        this.chase = false;
        this.scatter = true;
        var nextMode = setTimeout(() => this.chaseMode(), 10000);
    }
    frightMode() {
        this.chase = false;
        this.scatter = false;
        setTimeout(() => this.timeout, 9000)
    }
    randomizedHunt() {
        this.openGate = false;
        let randomNum = Math.floor(Math.random() * 4);
            
        switch(randomNum) {
            case 0:
                this.direction = 'right';
            break
            case 1:
                this.direction = 'left';
            break
            case 2:
                this.direction = 'up';
            break
            case 3:
                this.direction = 'down';
            break
        }
        this.checkGhostStatus();
    }
    checkGhostStatus() {
        if (board.levelComplete) {
            this.removeGhost(0)
            setTimeout(() => this.scatterMode(), 3000)
            return
        }
        let state = this.ghostState();
        if (state === 'dead') {
            this.moveGhost();
        }
        else if (state === 'normal') {
    
            this.capturePacman();
            if (board.pacmanCaptured) {
                clearTimeout(timeID); // has any affect?
                
                player.pacmanDeathAnimation()
                setTimeout(() => this.removeGhost(0), 500);
                return
            }
            else {
                if (this.chase || this.scatter) {
                    this.moveGhost();
                } else {
                    var timeID = setTimeout(() => this.moveGhost(), this.speed);  
                }   
            }    
        }
        else if (state === 'scared') {
            this.eatGhost();
            setTimeout(() => this.moveGhost(), this.speed); 
        }
    }
    ghostState() {
        if (this.dead) {
            this.deadGhost();
            return 'dead';
        }
        else if (this.isFrighten) {
            this.scaredGhost();
            this.stepCount++
            return 'scared';
        } 
        else {
            this.normalGhost()
            return 'normal';
        }
    }
    deadGhost() {
        var ghostDiv = `<div class="eye-${this.direction}"></div>`;
        squares[this.ghostYposition][this.ghostXposition].innerHTML = ghostDiv;
        this.dead = true;
        this.openGate = true;
    }
    scaredGhost() {
        this.speed = this.frightenSpeed;
        var ghostDiv = `<div class="${this.className} frighten-ghost"></div>`;
            
        // needs to be adjustable for frightenSpeed changes
        // currently is not
            if (this.stepCount > 10 && this.stepCount % 2 != 0) {
                var ghostDiv = `<div class="${this.className} frighten-ghost-white"></div>`;
            }
            squares[this.ghostYposition][this.ghostXposition].innerHTML = ghostDiv;
            setTimeout(() => this.resetSpeed(), 9000);
    }
    normalGhost() {
        var ghostDiv = `<div class="${this.className} ${this.className}-${this.direction}"></div>`;
        this.stepCount = 0;
        squares[this.ghostYposition][this.ghostXposition].innerHTML = ghostDiv;
    }
    moveGhost() {
        if (this.legalMove()) {
            if (this.dead || this.chase || this.scatter) {
                this.moveToDesignatedLocation();
            }  
            else { 
                this.moveToNextRandomPosition();    
            }
        }
        else {
            this.removeGhost(0);
            this.randomizedHunt();
        }
    }
    legalMove() {
        const [distanceFromYposition, distanceFromXposition] = this.getNextDistance();
        const nextXposition = this.ghostXposition + distanceFromXposition;
        const nextYposition = this.ghostYposition + distanceFromYposition;
    
        if (nextXposition === width || nextXposition === -1) {
            return true;
        }
        if (squares[nextYposition][nextXposition].classList.contains('ghost-gate') &&
        this.openGate === false) {
                return false;
            }
        if (!(squares[nextYposition][nextXposition].classList.contains('wall'))) {
            return true;
        }
        return false;
    }
    getNextDistance() { 
        return this.direction === 'right' ? [0, 1]
            :  this.direction === 'left'  ? [0, -1]
            :  this.direction === 'up'    ? [-1, 0]
            :  [1, 0]
    }
    getPreviousDistance() { 
        return this.direction === 'right' ? [0, -1]
            :  this.direction === 'left'  ? [0, 1]
            :  this.direction === 'up'    ? [1, 0]
            :  [-1, 0]
    }
    removeGhost(distance) {

        if (distance === 0) {
            var distanceFromY = 0;
            var distanceFromX = 0;
        }
        else {
            var [distanceFromY, distanceFromX] = this.getPreviousDistance();
        }
        
        const previousYposition = this.ghostYposition + distanceFromY;
        const previousXposition = this.ghostXposition + distanceFromX;
    
        //trying to consistently show animation effect when eaten
        // bug appears here whene when muliple ghosts are eaten
        // in same div
        // if (squares[previousYposition][previousXposition].childNodes.length > 1) {
        //     let ghost = document.querySelector(`.${this.className}`);
        //     ghost.parentNode.removeChild(ghost);
        // }
        //else {
            squares[previousYposition][previousXposition].innerHTML = "";
        //}
        return
    }
    updateGhostPosition() { 
           this.direction === 'right' ? this.ghostXposition++
        :  this.direction === 'left'  ? this.ghostXposition--
        :  this.direction === 'up'    ? this.ghostYposition--
        :  this.ghostYposition++
    }
    capturePacman() {
        if (squares[this.ghostYposition][this.ghostXposition].classList.contains('pacman') && this.isFrighten === false) {
            board.pacmanCaptured = true;
        }
    }
    eatGhost() { 
        if (squares[this.ghostYposition][this.ghostXposition].classList.contains('pacman') && 
                this.isFrighten === true) {
                    let div = document.createElement('div');
                    div.setAttribute('class', 'eat-fx');
                    squares[player.row][player.col].appendChild(div);
                    this.dead = true;
                    //board.showBonusPoints()
            }
    }
    moveToDesignatedLocation() {
        this.updateGhostPosition();

          (this.dead) ? this.toLocation('ghost-lair', 125)
        : (this.chase) ? this.toLocation('player')
        : this.toLocation('home')
    }
    moveToNextRandomPosition() {
        this.removeGhost(0);

          (this.ghostXposition+1 === width) ? this.ghostXposition = 0
        : (this.ghostXposition-1 === -1) ? this.ghostXposition = width-1
        : this.updateGhostPosition()

        this.checkGhostStatus();
    }
    toLocation(location, speed) {
        let time = speed || this.speed;
        setTimeout(() => this.removeGhost(), time);
        setTimeout(() => this.moveToTargetLocation(location), time);
    }
    moveToTargetLocation(location) {

        this.releaseGhost();
    
        const pathStart = [this.ghostYposition, this.ghostXposition];
        const pathEnd = this.target(location);
        
        let currentPath = [];
    
        currentPath = astar.findPath(pathStart, pathEnd);
        let step = 1
    
        if (currentPath.length-1 > 0) {
            let [nextRow, nextCol] = currentPath[step];
            let [currentRow, currentCol] = currentPath[step-1];
    
            this.getNextDirection(nextRow, nextCol, currentRow, currentCol);
            this.checkGhostStatus();
        }
        else {
            location === 'ghost-lair' ? this.reachedGhostLair()
          : location === 'home' ? this.reachedHomeLocation()
          : this.capturedPacman()
        }
    
    }
    releaseGhost() {
        if (player.pelletCount >= this.pelletLimit) {
            this.openGate = true;
            setTimeout(() => {this.openGate = false}, 2000)
        }
    }
    getNextDirection(nextR, nextC, currentR, currentC) {
          (nextC > currentC) ? this.direction = 'right'
        : (nextC < currentC) ? this.direction = 'left'
        : (nextR > currentR) ? this.direction = 'down'
        : this.direction = 'up'
    }
    reachedGhostLair() {
        this.dead = false;
        this.isFrighten = false;
        this.openGate = true;
        this.direction = 'up';
        this.checkGhostStatus();
    }
    reachedHomeLocation() {
        this.scatter = false;
        this.randomizedHunt();
    }
    capturedPacman() {
        // blinky.chase = false;
        // inky.chase = false;
        // pinky.chase = false;
        // clyde.chase = false;
        this.capturePacman();
        this.randomizedHunt();
    }
    target(location) {
        return location === 'ghost-lair' ? [14, 13] 
            :  location === 'home' ? [this.homeYposition, this.homeXposition]
            :  this.findTarget() 
    }
    manhattanDistance(target) {
        let y = this.ghostYposition
        let x = this.ghostXposition
        return (Math.abs(y - target[0]) + Math.abs(x - target[1]))
    }
}

class Blinky extends Ghost {
    constructor(className, startIndex, homeIndex, speed) {
        super(className, startIndex, homeIndex)
        this.theElroyFactor = .10
        this.startLevelSpeed = speed
        this.speed = speed;
        this.normalSpeed = speed; // think it should be this.speed
        this.frightenSpeed = this.speed + (this.speed * .50);
    }
    elroy() {
        this.speed = this.normalSpeed - (this.normalSpeed * this.theElroyFactor)
        this.normalSpeed = this.speed
        console.log('this.speed', this.speed)
        console.log('this.normalSpeed', this.normalSpeed)
    }
    findTarget() {
        return [player.row, player.col]
    }
}

class Pinky extends Ghost {
    constructor(className, startIndex, homeIndex, speed) {
        super(className, startIndex, homeIndex)
        this.pelletLimit = 0; // 0
        this.speed = speed;
        this.normalSpeed = speed;
        this.frightenSpeed = speed + (speed * .50);
    }
    findTarget() {
        const pacmanDirection = player.direction
        let target = [player.row, player.col]
        if (pacmanDirection === 'right') {
            if ((Math.abs(player.col - (squares.length-1)) >= 3) &&
               !(squares[player.row][player.col+3].classList.contains('wall'))) {
                    target = [player.row, player.col+3]
            }
        }
        else if (pacmanDirection === 'left') {
            if ((player.col >= 3) &&
               !(squares[player.row][player.col-3].classList.contains('wall'))) {
                   target = [player.row, player.col-3]
            }
        }
        else if (pacmanDirection === 'up') {
            if ((player.row >= 3) &&
               !(squares[player.row-3][player.col].classList.contains('wall'))) {
                    target = [player.row-3, player.col]
            }
        }
        else if (pacmanDirection === 'down') {
            if ((Math.abs(player.row - (squares.length-1)) >= 3) &&
               !(squares[player.row+3][player.col].classList.contains('wall'))) {
                    target = [player.row+3, player.col]
            }
        }
        if (this.manhattanDistance([player.row, player.col]) === 1) {
            return [player.row, player.col]
        }
        return target
    }
}

class Inky extends Ghost {
    constructor(className, startIndex, homeIndex, speed) {
        super(className, startIndex, homeIndex)
        this.pelletLimit = 30;
        this.speed = speed;
        this.normalSpeed = speed;
        this.frightenSpeed = speed + (speed * .50);
    }
    findTarget() {
        return [player.row, player.col]
    }
}

class Clyde extends Ghost {
    constructor(className, startIndex, homeIndex, speed) {
        super(className, startIndex, homeIndex)
        this.pelletLimit = 90; //90
        this.targetIndex = 0
        this.speed = speed;
        this.normalSpeed = speed;
        this.frightenSpeed = speed + (speed * .50);
    }
    // gaurdHome() {

    // }
    findTarget() {
        let targetArray;
        let index = this.targetIndex % 3
        let northTargetArray = [[8, 18], [8, 9], [5, 13]]
        let southTargetArray = [[23, 12], [23, 15], [20, 13]]

        
        if (player.row < 14) {
            targetArray = southTargetArray
        }
        else {
            targetArray = northTargetArray
        }
        if (this.manhattanDistance(targetArray[index]) === 1) {
            this.targetIndex += 1
        }
    
        return targetArray[index]
    }
}

let blinky = new Blinky('blinky', [10, 13], [5, 21], 275);
let inky = new Inky('inky', [14, 12], [23, 9], 250);
let clyde = new Clyde('clyde', [14, 13], [23, 18], 225);
let pinky = new Pinky('pinky', [14, 16], [5, 6], 300);

blinky.checkGhostStatus();
inky.checkGhostStatus();

pinky.checkGhostStatus();
clyde.checkGhostStatus();

console.log(blinky)


