class Linker {
    constructor() {
        this.destination = undefined;
        this.short = undefined;
        this.token = undefined;
    }
    generateShort() {
        let short = Math.random().toString(16).substr(2, 8);
        this.short = short;
        return short;
    }
    generateToken() {
        let token = Math.random().toString(16).substr(2, 15);
        this.token = token;
        return token;
    }
}

module.exports = Linker;
