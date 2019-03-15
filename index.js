const express = require('express')
const app = express()

app.get('/', function (req,res){
	res.send('Hello World!')
})

var port = process.env.PORT || 8080;

app.listen(port);

console.log('Mon exemple est sur le port 8080');
