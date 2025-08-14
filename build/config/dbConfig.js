const dbConfig = {
    Host: 'localhost',
    User: 'root',
    password: '',
    db: 'project2database',
    dialect: 'mysql',
    pool: {
        idle: 10000,
        max: 5,
        min: 0,
        acquire: 10000
    }
};
export default dbConfig;
//# sourceMappingURL=dbConfig.js.map