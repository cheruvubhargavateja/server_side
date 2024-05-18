const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 4000;

const db_url = "mongodb+srv://March:W6PC1Uz3J42n7uoJ@clusterteja.emnhjbo.mongodb.net/?retryWrites=true&w=majority";

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

const tokensRouter = require('./src/routes/tokensRouter')
app.use('/tokens', tokensRouter);

// const corsOptions = {
//     credentials: true,
//     origin: ['http://localhost:3000'] // Whitelist the domains you want to allow
// };


mongoose.connect(db_url, {
    useNewUrlParser: true,
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', ()=> {
    console.log('connected to mongoDB');
})

app.listen(PORT, ()=> {
    console.log('server is up and running in port:', PORT)
});