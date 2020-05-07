function range(a, b){
    array = []
    for (let number = a; a < b + 1; a++){
        array.push(a);
    }
    return array;
}

function sum(array){
    sum = 0
    for (let number of array){
        sum += number
    }
    return sum
}



console.log(sum(range(1,10)))


function range2(x, y, z){
    array = [];
    number = x
    while ((number <= y && number >= x) ||(number >= y && number <= x) ){
        array.push(number)
        number += z
    }
    return array
}
console.log(range2(1,10,2))
console.log(range2(5,2,-1))