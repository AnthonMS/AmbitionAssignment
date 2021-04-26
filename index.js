const { response } = require('express');
const express = require('express');
const app = new express();
const port = 8000;
 
// app.get('/', (req, res) => res.send("Hello World!"));
app.use(express.static(__dirname + '/public'));
 
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
 
app.get('/', (request, response) => {
    response.sendFile(__dirname + '/public/home.html');
});