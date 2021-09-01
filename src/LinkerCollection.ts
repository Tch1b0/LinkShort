import { Linker } from "./Linker";
import redis from "redis";

/**
 * A class containing all the `Linker` objects needed
 */
export class LinkerCollection {
    redisClient: redis.RedisClient;

    constructor(
        useRedis: boolean = true,
        redisPort: number = 6379,
        public collection: Linker[] = []
    ) {
        if (useRedis) {
            this.redisClient = redis.createClient(redisPort);
        }
    }

    /**
     * Add a `Linker` object to the collection
     * @param linker The `Linker` object you want to add
     */
    add(linker: Linker) {
        this.collection.push(linker);
        this.save();
    }

    /**
     * Find a `Linker` object by its `short`
     * @param short The short you want to search for
     * @returns A `linker` object or `null`
     */
    findByShort(short: string): Linker | undefined {
        return this.collection.find((linker) => {
            linker.short === short;
        });
    }
    findByToken(token: string): Linker | undefined {
        return this.collection.find((linker) => {
            linker.token === token;
        });
    }
    findByDestination(destination: string): Linker | undefined {
        return this.collection.find((linker) => {
            linker.destination === destination;
        });
    }

    removeByShort(short: string) {
        this.collection.splice(
            this.collection.findIndex((linker) => {
                linker.short === short;
            }),
            1
        );
    }
    removeByToken(token: string) {
        this.collection.splice(
            this.collection.findIndex((linker) => {
                linker.token === token;
            }),
            1
        );
    }
    removeByDestination(destination: string) {
        this.collection.splice(
            this.collection.findIndex((linker) => {
                linker.destination === destination;
            }),
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

    /**
     * Save the data in the `redis` database
     */
    save() {
        this.redisClient.set("collection", JSON.stringify(this.collection));
    }

    /**
     * Load the data from the `redis` database
     */
    load(): void {
        this.redisClient.get("collection", (_err, reply) => {
            if (reply !== undefined) {
                this.collection = JSON.parse(reply, (_key, val) => {
                    Linker.fromJson(val);
                });
            }
        });
    }
}
