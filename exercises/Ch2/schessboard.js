size = 10;
output="";
string="";

for (count = 0; count < size; count++){
    string="";
    for(letter = 0; letter < size; letter++){
        if (letter % 2 !=0){
            string += "#"
        }
        else if(letter % 2 == 0){
            string += "_"
        }
    }
    if (count % 2 !=0){
        output += string + "\n"
    }
    else if (count % 2 == 0){
        let reversed = "";
        for (let char of string){
            reversed = char + reversed;
        }
        output += reversed + "\n"
    }
}
console.log(output)