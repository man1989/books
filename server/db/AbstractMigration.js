export default class AbstractMigration {
    constructor(db = null, filename = null) {
        if (new.target === AbstractMigration) {
            throw new TypeError("cannot Inntanntiate Abstract class")
        }
        this.#checkAbstractMethod();
        this.db = db;
        this.filename = filename;
    }
    #checkAbstractMethod() {
        if (this.migrate === AbstractMigration.prototype.migrate) {
            throw new TypeError("Please implement abstract method migrate()");
        }
    }
    async run() {
        await this.start();
        await this.migrate();
        await this.rollback();
        await this.finish();
        await this.updateMigration();
    }
    async start() {
        console.log(`Starting migration for ${this.constructor.name}`);
    }
    async finish() {
        console.log("Finishing migration");
    }
    async migrate() {
        throw new TypeError("Method migrate() mus be implemented");
    }
    async rollback() { }

    async updateMigration() {
        console.log(`adding to migration ${this.filename}`)
        await this.db`INSERT INTO migration(filename) values(${this.filename});`
    }
}