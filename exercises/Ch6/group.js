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


let group = Group.from([10, 20]);
console.log(group.has(10));
console.log(group.has(30));
group.add(10);
group.delete(10);
console.log(group.has(10));
