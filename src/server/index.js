import Express from 'express';
import GraphHTTP from 'express-graphql';
import Schema from './schema';

// Configuration file
import config from './config.js';

const APP_PORT = config.APP_PORT;
const app = Express();

app.use(Express.static(__dirname));

app.use('/graphql', GraphHTTP({
    schema: Schema,
    pretty: true,
    graphiql: true
}));

app.listen(APP_PORT, () => {
    console.log(`Started and listening on http://localhost:${APP_PORT}/`);
});


/*
Que tal chicos, me da mucha pena, estoy en una reunion y no creo desocuparme para la hora en que teniamos prevista la llamada

Podriamos vernos despues de las 6?

*/