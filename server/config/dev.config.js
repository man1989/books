function getConfig(){
    return {
        port: process.env.APP_PORT || 3033,
        db: {
            port: "5433",
            hostname: "localhost",
            database: "bookish",
            username: process.env.PG_USER,
            password: process.env.PG_PASSWORD
        }
    };
}