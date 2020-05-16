class PGroup {
  constructor(arr) {
    this.arr = arr;
  }

  add(item) {
    if (this.has(item) == true) {
      return this;
    }
    return new PGroup(this.arr.concat([item]));
  }

  delete(item) {
    if (this.has(item) == false) {
      return this;
    }
    return new PGroup(this.arr.filter(m => m !== item));
  }

  has(item) {
    return this.arr.includes(item);
  }
}

PGroup.empty = new PGroup([])

let test1 = PGroup.empty.add("4")
let test2 = test1.add("6")
let test3 = test2.delete("4")

console.log(test1.has("4"))
console.log(test2.has("4"))
console.log(test3.has("4"))

