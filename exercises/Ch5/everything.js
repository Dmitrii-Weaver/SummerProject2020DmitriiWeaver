function every (arr, act){
    for (let i of arr){
        if (act(i) == false){
            return false
        }
    }
    return true
}

function every2 (array, test) {
    return !(array.some(n => !test(n)))
  }
  


console.log(every([1,2,6], n => n < 5))
console.log(every2([1,2,6], n => n < 5))