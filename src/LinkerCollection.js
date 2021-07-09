class LinkerCollection {
    constructor() {
        this.collection = [];
    }
    findByShort(short) {
        return this.collection.find((linker) => { linker.short == short });
    }
    findByToken(token) {
        return this.collection.find((linker) => { linker.token == token });
    }
    findByDestination(destination) {
        return this.collection.find((linker) => { linker.destination == destination })   ;
    }

    removeByShort(short) {
        this.collection.splice(
            this.collection.findIndex((linker) => { linker.short == short }),
            1
        );
    }
    removeByToken(token) {
        this.collection.splice(
            this.collection.findIndex((linker) => { linker.token == token }),
            1
        );
    }
    removeByDestination(destination) {
        this.collection.splice(
            this.collection.findIndex((linker) => { linker.destination == destination }),
            1
        );
    }
    safeCollection() {
        let arr = [];
        for (let i = 0; i < this.collection.length; i++) {
            let linker = this.collection[i];
            arr.push({ [linker.short]: linker.destination });
        }
        return arr;
    }
}

module.exports = LinkerCollection;