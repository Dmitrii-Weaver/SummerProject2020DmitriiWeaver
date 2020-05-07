
var array1 = [1,2,3,4]

function reverseArray(arr){
    newArray = []
    count = arr.length - 1

    while(count >= 0){
        newArray.push(arr[count])
        count--
    }
    return newArray
}

function reverseArrayInPlace(arr){
i = arr.length - 2
    for(count = 0; count <= arr.length - 1; count++){
        char = arr[i];
        arr.push(char)
        arr.splice(i, 1)
        i--
        
    }
}


console.log(reverseArray(array1))

reverseArrayInPlace(array1);
console.log(array1)

