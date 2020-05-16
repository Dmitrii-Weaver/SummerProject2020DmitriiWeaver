const box = {
    locked: true,
    unlock() { this.locked = false; },
    lock() { this.locked = true; },
    _content: [],
    get content() {
        if (this.locked) throw new Error("Locked!");
        return this._content;
    }
};

function withBoxUnlocked(body) {
    if (box.locked) {
        box.unlock()
    }
    try {
        body()
        console.log(box.content)
    }
    finally {
        if (!box.locked) {
            box.lock()
        }
    }
}



try {
    withBoxUnlocked(function () {
        throw new Error("Pirates on the horizon! Abort!");
    });
} catch (e) {
    console.log("Error raised: " + e);
}

withBoxUnlocked(function () {
    box.content.push("gold piece");
});
console.log(box.locked);
  // → true