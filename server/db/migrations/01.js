import AbstractMigration from "../AbstractMigration.js"

export default class Migrate extends AbstractMigration{
    async migrate(){
        console.log("Migrating.....");
        await this.db`
        CREATE TABLE IF NOT EXISTS migration(
            migrationId SERIAL PRIMARY KEY, 
            filename varchar(1000), addedon 
            timestamp without time zone default (now() at time zone 'utc')
        );`;
    }
}