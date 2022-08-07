class Astar {
    constructor(grid, width) {
        this.grid = grid;
        this.width = width;
        this.height = width;
        this.gridSize = this.width * this.height
    }
    findPath(pathStart, pathEnd) {
        return this.calculatePath(pathStart, pathEnd)
    }
    manhattanDistance(start, goal) {
        return Math.abs(start.row - goal.row) + Math.abs(start.col - goal.col);
    }
    neighbours(row, col) {
        const east = col + 1;
        const west = col - 1;
        const north = row - 1;
        const south = row + 1;
        
        const eastNeighbor = east < this.width && this.isWalkable(row, east)
        const westNeighbor = west > -1 && this.isWalkable(row, west)
		const northNeighbor = north > -1 && this.isWalkable(north, col)
		const southNeighbor = south < this.height && this.isWalkable(south, col)

        let result = [];  // no var, let, or const in original

        if (eastNeighbor) {
            result.push({row: row, col: east});
        }
        if (westNeighbor) {
            result.push({row: row, col: west});
        }
        if (northNeighbor) {
            result.push({row: north, col: col});
        }		
		if (southNeighbor) {
            result.push({row: south, col: col});
        }
        
        return result;
    }
    isWalkable(row, col) {
        return ((this.grid[row] !== null) &&
               (this.grid[row][col] !== null) &&
               (!(this.grid[row][col].classList.contains('wall'))))
    }
    node(next, point) { // are next, point good descripters? 
        const newNode = {
            next: next,
            value: point.row + (point.col * this.width),
            row: point.row,
            col: point.col,
            f: 0,
            g: 0
        };
        return newNode
    }
    calculatePath(pathStart, pathEnd) {
        const myPathStart = this.node(null, {row: pathStart[0], col: pathStart[1]});
        const myPathEnd = this.node(null, {row: pathEnd[0], col: pathEnd[1]});

        let worldArray = new Array(this.gridSize)
        let open = [myPathStart];
        let closed = [];
        let result = [];
        let myNeighbours;
        let myNode;
        let myPath;
        

        let length, max, min;

        while (length = open.length) {
            max = this.gridSize;
            min = -1;

            for (let i = 0; i < length; i++) {
                if (open[i].f < max) {
                    max = open[i].f;
                    min = i;
                }
            }
            myNode = open.splice(min, 1)[0];

            if (myNode.value === myPathEnd.value) {
                
                myPath = closed[closed.push(myNode) - 1]; 

                do {
                    result.push([myPath.row, myPath.col]);
                }
                while (myPath = myPath.next); 
                worldArray = [];
                closed = [];
                open = [];

                result.reverse();
            }
            else {
                myNeighbours = this.neighbours(myNode.row, myNode.col);

                for (let i = 0; i < myNeighbours.length; i++) {
                    myPath = this.node(myNode, myNeighbours[i]);

                    if (!(worldArray[myPath.value])) {
                        myPath.g = myNode.g + this.manhattanDistance(myNeighbours[i], myNode);
                        myPath.f = myPath.g + this.manhattanDistance(myNeighbours[i], myPathEnd);
                        open.push(myPath)
                        worldArray[myPath.value] = true;
                    }
                }
                closed.push(myNode)
            }
        }
        return result;
    }
}

const astar = new Astar(board.squares, board.width)
