const express = require('express')
const app = express()

app.get('/', function (req,res){
	res.send('Hello World!')
})

app.listen(3000,function() {
	console.log('Mon exemple est sur le port 3000')
})