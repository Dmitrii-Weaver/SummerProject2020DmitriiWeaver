//1 is odd and 0 is even.
//using that info we can see, whether a number is even or odd by lowering it by 2 untill it becomes either 1 or 0
function isEven(x) {
    while (x > 1) {
        x -= 2;
    }
    if (x == 1) {
        even = false
    }
    else if (x == 0) {
        even = true
    }
    return even
}


console.log(isEven(50))
console.log(isEven(75))

//to make it work with negative numbers I will create a division between positive and negative numbers

function isEven2(x) {
    if (x >= 0) {
        while (x > 1) {
            x -= 2;
        }
    }
    else {
        while (x < 0) {
            x += 2;
        }
    }

    if (x == 1) {
        even = false
    }
    else if (x == 0) {
        even = true
    }
    return even
}

console.log(isEven2(-50))
console.log(isEven2(-75))