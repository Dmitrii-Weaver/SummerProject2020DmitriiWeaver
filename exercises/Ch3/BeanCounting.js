function CountChars(word, char){
    count = 0
    for(let letter of word){
        if (letter == char)
        count ++ 

    }
    return count 
}
theword = "aeasfasegfsdrgrdsgsrgfwaesdfwaedaesfasefdf"

console.log(CountChars(theword, "d"))