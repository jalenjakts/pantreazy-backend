const config = require('api/config.js');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
    
    try{
        // create db if it doesn't already exist
        const { host, port, user, password, database } = config.database;
        const connection = await mysql.createConnection({ host, port, user, password });
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

        // connect to db
        const sequelize = new Sequelize(database, user, password, { 
            host: config.database.host,
            dialect: 'mysql' 
        });

        // init models and add them to the exported db object
        db.Account = require('../accounts/account.model')(sequelize);
        db.RefreshToken = require('../accounts/refresh-token.model')(sequelize);
        db.Pantry = require('../food/pantry.model')(sequelize);

        // define relationships
        db.Account.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
        db.RefreshToken.belongsTo(db.Account);
        
        db.Account.hasOne(db.Pantry, { onDelete: 'CASCADE' });
        db.Pantry.belongsTo(db.Account);
        // sync all models with database
        await sequelize.sync();
    }
    catch{
        
    }
}