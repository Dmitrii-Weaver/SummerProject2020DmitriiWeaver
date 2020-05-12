class Group{
    constructor(name){
        this.name = name;
        this.name = []
    }
    add(element){
        for(let i of this.name){
            if (element === i){
                return "this element already exists"
            }
        }
        this.name.push(element)
    }
    delete(element){
        for(let i of this.name){
            if (element === i){
                this.name.splice(this.name.indexOf(i), 1)
                return
            }
        return "this element does not exist"
        }
    }
    has(element){
        for(let i of this.name){
            if (element === i){
                return true
            }
        }
        return false
    }

    static from(array){
        let group = new Group;
        for (let i of array){
            group.add(i);
        }
        return group;
    }
}

class GroupIterator {
    constructor(group) {
        this.group = group;
        this.count = 0
    }

    next() {
        if(this.count >= this.group.items.length){

         return {done: true}
        }

        let value = this.group.items[this.count]
        this.count++;
        output = "{" + value + " done: false}"
        return output
    }
} 

let arr = Group.from([1, 2, 4])
for (let i of Object.keys(arr)) {
    let value = arr[i]
  console.log(value);
}
