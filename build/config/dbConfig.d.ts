type Database = {
    Host: string;
    User: string;
    password: string;
    db: string;
    dialect: 'mysql' | 'postgres' | 'sqlite';
    pool: {
        max: number;
        min: number;
        idle: number;
        acquire: number;
    };
};
declare const dbConfig: Database;
export default dbConfig;
//# sourceMappingURL=dbConfig.d.ts.map