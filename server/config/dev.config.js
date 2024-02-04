export default {
    db: {
        port: "5433",
        hostname: "localhost",
        database: "bookish",
        username: process.env.PG_USER,
        password: process.env.PG_PASSWORD
    }
}
