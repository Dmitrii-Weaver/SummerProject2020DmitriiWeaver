function Loop (value, test, body, update){
    for (let i = value; test(value) == true; value = update(value)){
        body(value)
    }
}

Loop(4, x => x >= 1, console.log, x => x - 1)