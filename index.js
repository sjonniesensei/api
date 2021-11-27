const { request, response } = require('express');
const express = require('express');
const Datastore = require('nedb');


const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () =>{ 
    console.log(`listening at ${port}`);
 });
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/getapi', (request, response) => {
    database.find({}, (err, data) =>{
        if (err){
            response.end();
            return;
        }
        response.json(data);
    })
});

app.post('/apiV1', (request, response) =>{
    console.log(request.body);

    const data = request.body;
    database.insert(data);
    response.json({
        latitude: data.latitude,
        longitude: data.longitude
    });
});