const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const db = require('./dbconnection');

//DB 연결
db.connect((err) => {
    err?console.log('db connection failed ...'):console.log('db connection success ...');
});

//router path
const routes = require('./router/router');

// bodyParser
app.use(bodyParser.json());

app.use('/api', routes);

// server
app.listen(3000, (err)=> {
    if(err) throw err;
    console.log('server running...');
})