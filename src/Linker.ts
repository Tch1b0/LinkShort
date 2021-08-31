/**
 * This class represents A shortcut ressource
 */
export class Linker {
    short: string;
    token!: string;

    /**
     *
     * @param destination Where the link is pointing to
     * @param short The preferred short name
     */
    constructor(public destination: string, short?: string) {
        if (short != undefined) {
            this.short = short;
        }
    }

    /**
     *
     * @returns The generated `short`
     */
    generateShort() {
        let short = Math.random().toString(16).substr(2, 8);
        this.short = short;
        return short;
    }

    /**
     *
     * @returns The generated `token`
     */
    generateToken() {
        let token = Math.random().toString(16).substr(2, 15);
        this.token = token;
        return token;
    }
}
