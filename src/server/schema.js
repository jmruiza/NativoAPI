import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull
} from 'graphql';

import DB from './definition';

const User = new GraphQLObjectType({
    name: 'User',
    description: 'This represents a User',
    fields: () => {
        return {
            id: {
                type: GraphQLString,
                resolve(user){
                    return user.id;
                }
            },
            token: {
                type: GraphQLString,
                resolve(user){
                    return user.token;
                }
            },
            email: {
                type: GraphQLString,
                resolve(user){
                    return user.email;
                }
            },
            name: {
                type: GraphQLString,
                resolve(user){
                    return user.name;
                }
            },
            password: {
                type: GraphQLString,
                resolve(user){
                    return user.password;
                }
            },
            language: {
                type: GraphQLString,
                resolve(user){
                    return user.language;
                }
            },
            plan: {
                type: GraphQLString,
                resolve(user){
                    return user.plan;
                }
            },
            interest: {
                type: new GraphQLList(Interest),
                resolve(user){
                    return user.getInterests()
                }
            }
        }
    }
});

const Interest = new GraphQLObjectType({
    name: 'Interest',
    description: 'Object type, represent Interest model',
    fields: () => {
        return {
            id: {
                type: GraphQLInt,
                resolve(interest){
                    return interest.id;
                }
            },
            section: {
                type: GraphQLString,
                resolve(interest){
                    return interest.section;
                }
            },
            user: {
                type: User,
                resolve(interest){
                    return interest.getUser()
                }
            }
        }
    }
});

const Progress = new GraphQLObjectType({
   name: 'Progress',
   description:  'Object type, represent Progress model',
   fields: () => {
       return {
           powerUps: {
               type: new GraphQLList(PowerUps),
               resolve(progress){
                   return progress.getPowerUps()
               }
           },
           level: {
               type: GraphQLInt,
               resolve(progress){
                   return progress.level;
               }
           },
           experience: {
               type: GraphQLInt,
               resolve(progress){
                   return progress.experience;
               }
           },
           worlds: {
               type: new GraphQLList(Worlds),
               resolve(progress){
                   return progress.getWorlds()
               }
           }
       }
   }
});

const PowerUps = new GraphQLObjectType({
    name: 'PowerUps',
    description:  'Object type, represent PowerUps model',
    fields: () => {
        return {
            type: {
                type: GraphQLString,
                resolve(power_up){
                    return power_up.type;
                }
            },
            amount: {
                type: GraphQLInt,
                resolve(power_up){
                    return power_up.amount;
                }
            },
        }
    }
});

const Worlds = new GraphQLObjectType({
    name: 'Worlds',
    description:  'Object type, represent Worlds model',
    fields: () => {
        return {
            id: {
                type: GraphQLString,
                resolve(world){
                    return world.id;
                }
            },
            status: {
                type: GraphQLString,
                resolve(world){
                    return world.status;
                }
            },
            classes: {
                type: new GraphQLList(Classes),
                resolve(world){
                    return world.getClasses()
                }
            }
        }
    }
});

// TODO: Optimize, use alias instead worlds = planets
const Planets = new GraphQLObjectType({
    name: 'Planets',
    description:  'Object type, represent Planets model',
    fields: () => {
        return {
            id: {
                type: GraphQLString,
                resolve(world){
                    return world.id;
                }
            },
            status: {
                type: GraphQLString,
                resolve(world){
                    return world.status;
                }
            },
            name:{
                type: GraphQLString,
                resolve(world){
                    return world.name;
                }
            },
            image:{
                type: GraphQLString,
                resolve(world){
                    return world.image;
                }
            },
            monster:{
                type: GraphQLString,
                resolve(world){
                    return world.monster;
                }
            },
            classes: {
                type: new GraphQLList(Classes2),
                resolve(world){
                    return world.getClasses2()
                }
            }
        }
    }
});

const Classes = new GraphQLObjectType({
    name: 'Classes',
    description:  'Object type, represent Classes model',
    fields: () => {
        return {
            id: {
                type: GraphQLString,
                resolve(assignment){
                    return assignment.id;
                }
            },
            stars: {
                type: GraphQLString,
                resolve(assignment){
                    return assignment.stars;
                }
            }
        }
    }
});

// TODO: Optimize, use alias instead Classes = Classes2
const Classes2 = new GraphQLObjectType({
    name: 'Classes2',
    description:  'Object type, represent Classes model',
    fields: () => {
        return {
            name: {
                type: GraphQLString,
                resolve(assignment){
                    return assignment.id;
                }
            },
            resource: {
                type: new GraphQLList(Resources),
                resolve(assignment){
                    return assignment.getResources()
                }
            },
            game: {
                type: new GraphQLList(Games),
                resolve(assignment){
                    return assignment.Games()
                }
            }
        }
    }
});

const Resources = new GraphQLObjectType({
    name: 'Resources',
    description:  'Object type, represent Resource model',
    fields: () => {
        return {
            type: {
                type: GraphQLString,
                resolve(resource){
                    return resource.type;
                }
            },
            resourceJson: {
                type: GraphQLString,
                resolve(resource){
                    return resource.resourceJson;
                }
            }
        }
    }
});

const Games = new GraphQLObjectType({
    name: 'Games',
    description:  'Object type, represent Game model',
    fields: () => {
        return {
            type: {
                type: GraphQLString,
                resolve(game){
                    return game.type;
                }
            },
            gameJson: {
                type: GraphQLString,
                resolve(game){
                    return game.resourceJson;
                }
            }
        }
    }
});

/**
 * root Query
 */
const Query = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',

    fields: () => {
        return {
            users: {
                type: new GraphQLList(User),
                args:{
                    id:{ type: GraphQLInt }
                },
                resolve(root, args){
                    return DB.models.user.findAll({where: args});
                }
            },
            progress: {
                type: new GraphQLList(Progress),
                args:{
                    id:{ type: GraphQLInt }
                },
                resolve(root, args){
                    return DB.models.progress.findAll({where: args});
                }
            },
            planets: {
                type: new GraphQLList(Planets),
                args:{
                    id:{ type: GraphQLInt }
                },
                resolve(root, args){
                    return DB.models.world.findAll({where: args});
                }
            },
        }
    }
});

/**
 * TODO: Mutations [POST, UPDATE, DELETE]
 */
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Functions to create stuff',
    fields(){
    }
});

const Schema = new GraphQLSchema({
    query: Query,
    //mutation: Mutation
});

export default Schema;
