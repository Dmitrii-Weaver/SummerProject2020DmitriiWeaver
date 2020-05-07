

function deepEqual (a, b) {
    if (a === b) {
      return true;
    }
    else if (typeof a == "object" && typeof b == "object" && a != null && b != null) {
      if (Object.keys(a).length != Object.keys(b).length)
        return false;
  
      for (var i in a) {
        if (b.hasOwnProperty(i))
        {  
          if (! deepEqual(a[i], b[i]))
            return false;
        }
        else
          return false;
      }
  
      return true;
    }
    else 
      return false;
  }

x = { value: 1, rest: { value: 2, rest: { value: 3, rest: {} } } }
y = { value: 1, rest: { value: 2, rest: { value: 3, rest: {} } } }


console.log(deepEqual(x, y))