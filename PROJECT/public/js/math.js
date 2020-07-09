

export class Matrix {
    constructor() {
        this.grid = []
    }

    forEach(callback) {
        this.grid.forEach((column, x) => {
            column.forEach((value, y) => {
                callback(value, x, y)
            })
        })
    }
    
    clear() {
        this.grid.length = 0;
    }

    delete(x,y){
        const col = this.grid[x]
        if (col) {
            delete col[y]
        }
        return undefined
    }


    get(x, y) {
        const col = this.grid[x]
        if (col) {
            return col[y]
        }
        return undefined
    }

    set(x, y, value) {
        if (!this.grid[x]) {
            this.grid[x] = []
        }

        this.grid[x][y] = value
    }
}

window.Matrix = Matrix;

export class Vec2 {
    constructor(x, y) {
        this.set(x, y)
    }

    copy(Vec2){
        this.x = Vec2.x
        this.y = Vec2.y
    }
    set(x, y) {
        this.x = x
        this.y = y
    }
}