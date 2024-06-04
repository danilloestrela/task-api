export const databaseConfig = {
    type: process.env?.DATABASE_TYPE?.toLocaleLowerCase() || 'json'
};
