const createCell = (x, y) => ({
    x,
    y,
    top: false,
    bottom: false,
    left: false,
    right: false,
    isVisited: false
});

class Maze {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.roomline = [];
        this.maze_cells = [];
        this.init();
    }

    init() {
        this.cell = Math.round(1000 / this.col);
        for (var i = 0; i < this.row; i++) {
            this.maze_cells[i] = [];
            for (var j = 0; j < this.col; j++) {
                this.maze_cells[i].push(createCell(j, i));
            }
        }

        const start_cell = {x: 0, y: 0};
        this.roomline.push(start_cell);
        this.maze_cells[0][0].left = true;
        this.maze_cells[this.row - 1][this.col - 1].right = true;
        this.calcCells(0, 0);
    }

    calcCells(x, y) {
        var neighbors = [];
        if (x - 1 >= 0 && !this.maze_cells[x - 1][y].isVisited) {
            neighbors.push({'x': x - 1, 'y': y})
        }
        if (x + 1 < this.row && !this.maze_cells[x + 1][y].isVisited) {
            neighbors.push({'x': x + 1, 'y': y})
        }
        if (y - 1 >= 0 && !this.maze_cells[x][y - 1].isVisited) {
            neighbors.push({'x': x, 'y': y - 1})
        }
        if (y + 1 < this.col && !this.maze_cells[x][y + 1].isVisited) {
            neighbors.push({'x': x, 'y': y + 1})
        }

        if (neighbors.length) {
            const current = {x, y};
            const next = neighbors[Math.floor(Math.random() * neighbors.length)];
            this.maze_cells[next.x][next.y].isVisited = true;
            this.roomline.push({'x': next.x, 'y': next.y});
            this.breakWall(current, next);
            this.calcCells(next.x, next.y);
        } else {
            // const next = this.roomline.pop();
            // if (next) this.calcCells(next.x, next.y);
            if (this.roomline.length) {
                const next = this.roomline.splice(Math.floor(Math.random * this.roomline.length), 1)[0];
                this.calcCells(next.x, next.y);
            }
        }
    }

    breakWall(cur, next) {
        if (cur.x < next.x) {
            this.maze_cells[cur.x][cur.y].bottom = true;
            this.maze_cells[next.x][next.y].top = true;
        }
        if (cur.x > next.x) {
            this.maze_cells[cur.x][cur.y].top = true;
            this.maze_cells[next.x][next.y].bottom = true;
        }
        if (cur.y < next.y) {
            this.maze_cells[cur.x][cur.y].right = true;
            this.maze_cells[next.x][next.y].left = true;
        }
        if (cur.y > next.y) {
            this.maze_cells[cur.x][cur.y].left = true;
            this.maze_cells[next.x][next.y].right = true;
        }
    }
}

const createCellElement = mazeArr => {
    const te = document.getElementById("mainContain");
    const container = document.createElement('div');
    container.id = 'cells';

    mazeArr.forEach(rowArr => {
        const row = document.createElement('div');
        row.className = 'row';
        rowArr.forEach(cell => {
            const aspect = [];
            if (!cell.top) aspect.push('top');
            if (!cell.bottom) aspect.push('bottom');
            if (!cell.left) aspect.push('left');
            if (!cell.right) aspect.push('right');

            const cellElement = document.createElement('div');
            cellElement.className = `${aspect.join(' ')} cell`;
            row.appendChild(cellElement);
        });

        container.appendChild(row);
    })
    te.appendChild(container);
}


class Rat {
    constructor(maze) {
        this.maze = maze;
        this.over = false;
    }

    setPoint(location, end) {
        this.location = location;
        this.end = end;
    }

    move(type) {
        const current = this.maze[this.location.y][this.location.x];
        let action = {
            prev: Object.assign({}, this.location),
            now: this.location,
            go: 0
        };
        switch (type) {
            case 'top':
                if (current.top && this.location.y > 0) {
                    this.location.y--;
                    action.go = 1;
                    return action;
                }
                return action;
            case 'bottom':
                if (current.bottom && this.location.y < this.maze.length - 1) {
                    this.location.y++;
                    action.go = 1;
                    return action;
                }
                return action
            case 'left':
                if (current.left && this.location.x > 0) {
                    this.location.x--;
                    action.go = 1;
                    return action;
                }
                return action
            case 'right':
                if (current.right && this.location.x < this.maze[0].length - 1) {
                    this.location.x++;
                    action.go = 1;
                    return action;
                }
                return action
            default:
                return action;
        }
    }

    tryMove(type) {
        if (this.over) return null;
        const action = this.move(type);
        if (action.now.x === this.end.x && action.now.y === this.end.y) {
            this.over = true;
            alert('reached goale');
            window.ti++;
        }
        return action;
    }
}


const maze = new Maze(+13, +13);
createCellElement(maze.maze_cells);
const rat = new Rat(maze.maze_cells);
rat.setPoint({x: 0, y: 0}, {x: maze.maze_cells.length - 1, y: maze.maze_cells[0].length - 1});
document.querySelectorAll('.cell')[0].className += ' rat';

window.addEventListener('keyup', e => {
    let action = {go: 0};
    switch (e.keyCode) {
        case 38:
            action = rat.tryMove('top');
            break;
        case 40:
            action = rat.tryMove('bottom');
            break;
        case 37:
            action = rat.tryMove('left');
            break;
        case 39:
            action = rat.tryMove('right');
            break;
        default:
            break;
    }
    if (action && action.go) {
        document.querySelectorAll('.row')[action.prev.y].querySelectorAll('.cell')[action.prev.x].classList.toggle('rat');
        document.querySelectorAll('.row')[action.now.y].querySelectorAll('.cell')[action.now.x].classList.toggle('rat');
    }
}, false)