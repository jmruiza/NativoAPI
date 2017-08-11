import Sequelize from 'sequelize';
import _ from 'lodash';
import faker from 'faker';
import config from './config.js'

faker.locale = 'es_MX';
const STR_CONNECTION = config.database.dialect + "://" +
                       config.database.userName + ":" +
                       config.database.password + "@" +
                       config.database.host + "/" +
                       config.database.dbName;
const Connection = new Sequelize(STR_CONNECTION);

/**
 * Represents a user
 */
const userModel = Connection.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    token: {
        type: Sequelize.STRING,
        allowNull: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            isEmail: true
        }
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: true
    },
    language: {
        type: Sequelize.STRING,
        allowNull: true
    },
    plan: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

/**
 * Represents user's insterests
 */
const interestModel = Connection.define('interest',{
    section: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

/**
 * Represents user's progress
 */
const progressModel = Connection.define('progress', {
    level:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    experience:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
});

/**
 * Represents user's power ups
 */
const powerUpModel = Connection.define('power_up', {
    type:{
        type: Sequelize.STRING,
        allowNull: false
    },
    amount: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

/**
 * Represents user's road (World's played)
 */
const worldModel = Connection.define('world',{
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    image:{
        type: Sequelize.STRING,
        allowNull: false
    },
    monster:{
        type: Sequelize.STRING,
        allowNull: false
    },
});

/**
 * Represents world's class
 */
const classModel = Connection.define('assignment',{
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    //world_id: {},
    //class_id: {},
    stars: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
});

/**
 * Represents world's resource
 */
const resourceModel = Connection.define('resource',{
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    resourceJson: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

/**
 * Represents world's game
 */
const gameModel = Connection.define('game',{
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    gameJson: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

/**
 * Represents game's message
 */
const messageModel = Connection.define('message',{
    ok: {
        type: Sequelize.STRING,
        allowNull: false
    },
    mistake: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

/**
 * Relations definitions
 */
userModel.hasMany(powerUpModel, { onDelete: 'cascade', hooks: true });
userModel.hasMany(worldModel, { onDelete: 'cascade', hooks: true });
userModel.hasMany(interestModel, { onDelete: 'cascade', hooks: true });
interestModel.belongsTo(userModel);
progressModel.belongsTo(userModel);
worldModel.belongsTo(userModel);
powerUpModel.belongsTo(worldModel);
worldModel.hasMany(classModel);
classModel.belongsTo(worldModel);
resourceModel.belongsTo(classModel);
gameModel.belongsTo(classModel);
messageModel.belongsTo(gameModel);

/**
 * Faker data generator
 */

/*
config.fakerData && Connection.sync({
  force: true
}).then( ()=>{
    _.times(10, () => {
        // Create users
        return userModel.create({
            id: faker.internet.password(10),
            token: faker.internet.password(32),
            email: faker.internet.email(),
            name: faker.name.findName(),
            password: "HASH_MD5",
            language: "ES",
            plan: "Free"
        }).then(user => {
            _.times(faker.random.number({min: 2, max: 5}), () => {
                return user.createInterest({
                    section: faker.commerce.productName()
                })
            })
        });
    })
});
*/


export default Connection;