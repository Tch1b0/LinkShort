/**
 * This class represents A shortcut ressource
 */
export class Linker {
    short!: string;
    token!: string;

    /**
     * @param destination Where the link is pointing to
     * @param short The preferred short name
     */
    constructor(public destination: string, short?: string, token?: string) {
        if (short !== undefined) {
            this.short = short;
        }
        if (token !== undefined) {
            this.token = token;
        }
    }

    /**
     * Generate a new token, which is directly stored in this instance
     * @returns The generated `short`
     */
    generateShort(): string {
        let short = Math.random().toString(16).substr(2, 8);
        this.short = short;
        return short;
    }

    /**
     * Generate a new token, which is directly stored in this instance
     * @returns The generated `token`
     */
    generateToken(): string {
        let token = Math.random().toString(16).substr(2, 15);
        this.token = token;
        return token;
    }

    toJSON(): object {
        return {
            destination: this.destination,
            short: this.short,
            token: this.token,
        };
    }

    /**
     * Create a `Linker` object from JSON data
     * @param data The `JSON` data
     * @returns A new Linker object
     */
    static fromJson(data: object): Linker {
        return new Linker(data["destination"], data["short"], data["token"]);
    }
}
