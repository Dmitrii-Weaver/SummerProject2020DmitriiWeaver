function arrayToList(arr) {
    list = {};
    for (i = arr.length - 1; i >= 0; i--) {
        list = { value: arr[i], rest: list };
    }

    return list;
}

function listToArray(list) {
    array = [];

    for (var x = list; x.value !== undefined; x = x.rest) {
        array.push(x.value);
    }
    return array;
}

function prepend(value, rest) {
    return { value: value, rest: rest };
}

function nth(list, y) {
    if (y === 0)
        return list.value;
    else
        return nth(list.rest, y - 1);
}

array = [1,2,3]

console.log(arrayToList(array));
console.log(listToArray(arrayToList(array)));
console.log(prepend(10, prepend(20, null)));
console.log(nth(arrayToList(array), 1));