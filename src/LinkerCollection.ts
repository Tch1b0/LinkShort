import { Linker } from "./Linker";
import redis, { RedisError } from "redis";

/**
 * A class containing all the `Linker` objects needed
 */
export class LinkerCollection {
    redisClient!: redis.RedisClient;

    constructor(
        private useRedis: boolean = true,
        redisPort: number = 6379,
        hostname: string = "localhost",
        public collection: Linker[] = []
    ) {
        if (useRedis) {
            this.redisClient = redis.createClient(redisPort, hostname);
        }
    }

    /**
     * Add a `Linker` object to the collection
     * @param linker The `Linker` object you want to add
     */
    add(linker: Linker): void {
        if (this.findByShort(linker.short) !== undefined) {
            this.removeByShort(linker.short);
        }
        while (this.findByShort(linker.short) !== undefined) {
            linker.generateShort();
        }
        this.collection.push(linker);
        this.save();
    }

    /**
     * Find a `Linker` object by its `short`
     * @param short The `short` you want to search for
     * @returns A `Linker` object or `null`
     */
    findByShort(short: string): Linker | undefined {
        return this.collection.find((linker) => {
            return linker.short === short;
        });
    }

    /**
     * Find a `Linker` object by its `token`
     * @param token The `token` you want to search for
     * @returns A `Linker` object or `null`
     */
    findByToken(token: string): Linker | undefined {
        return this.collection.find((linker) => {
            return linker.token === token;
        });
    }

    /**
     * Find a `Linker` object by its `destination`
     * @param destination The `destination` you want to search for
     * @returns A `Linker` object or `null`
     */
    findByDestination(destination: string): Linker | undefined {
        return this.collection.find((linker) => {
            return linker.destination === destination;
        });
    }

    removeByShort(short: string): void {
        this.collection.splice(
            this.collection.findIndex((linker) => {
                return linker.short === short;
            }),
            1
        );
        this.save();
    }
    removeByToken(token: string): void {
        this.collection.splice(
            this.collection.findIndex((linker) => {
                return linker.token === token;
            }),
            1
        );
        this.save();
    }
    removeByDestination(destination: string): void {
        this.collection.splice(
            this.collection.findIndex((linker) => {
                return linker.destination === destination;
            }),
            1
        );
        this.save();
    }

    safeCollection(): object {
        let obj = {};
        for (let i = 0; i < this.collection.length; i++) {
            let linker = this.collection[i];
            obj[linker.short] = linker.destination;
        }
        return obj;
    }

    /**
     * Save the data in the `redis` database
     */
    save(): void {
        if (this.useRedis) {
            this.redisClient.set("collection", JSON.stringify(this.collection));
        }
    }

    /**
     * Load the data from the `redis` database
     */
    load(): void {
        if (this.useRedis) {
            this.redisClient.get("collection", (_err, reply) => {
                if (reply !== undefined && reply !== null) {
                    let jsonCollection: any = JSON.parse(reply);

                    for (let obj of jsonCollection) {
                        this.collection.push(Linker.fromJson(obj));
                    }
                }
            });
        }
    }
}
