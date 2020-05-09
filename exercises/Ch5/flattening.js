function flatten (arr){
    newArr = []
    for(i = 0; i < arr.length; i++){
        newArr = newArr.concat(arr[i])
    }
    return newArr
}

array1 = [[1,2,3], [3,4,5]]
console.log(flatten(array1))