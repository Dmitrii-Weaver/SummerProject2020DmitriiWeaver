class Vec{
    constructor(x,y){
        this.x = x
        this.y = y
    } 

    get length(){
        let length = Math.sqrt((this.x * this.x) + (this.y * this.y))
        return length
    }
}

Vec.prototype.plus = function(input){
    newX = this.x + input.x
    newY = this.y + input.y
    output = []
    output.push(newX)
    output.push(newY)
    return output
}

Vec.prototype.minus = function(input){
    newX = this.x - input.x
    newY = this.y - input.y
    output = []
    output.push(newX)
    output.push(newY)
    return output
}

vector_a = new Vec(2,3)
vector_b = new Vec(1,2)

console.log(vector_b.length)
console.log(vector_b.minus(vector_b))
console.log(vector_a.plus(vector_b))