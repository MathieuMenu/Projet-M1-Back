const express = require('express')
const path = require("path")
const bodyParser = require("body-parser")
const mongo = require("mongoose")

var db = mongo.connect(process.env.MONGODB, function(err, response){
	if(err){ console.log(err); }
	else{ console.log('Connected to ' + db, ' + ', response); }
});

const app = express()

app.use(bodyParser());
app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({extended:true}));


app.use(function (req, res, next){
	res.setHeader('Access-Control-Allow-Origin', '');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
})

//https://mmfront.herokuapp.com

var Schema = mongo.Schema;

var LocationsSchema = new Schema({
	long: { type: Number },
	lat: { type: Number },
	add1: { type: String },
	add2: {type: String},
	add3: {type: String},
	titre: {type: String},
	email: {type: String}
},{versionKey: false});


var model = mongo.model('locations',LocationsSchema,'locations')

app.get('/', function (req,res){
	res.send('Hello World!');
});

app.get('/connected', function (req,res){
	if(db){
		res.send(db);
	}
	else{
		res.send('Ah bah non ...');
	}
	
});

app.post("/api/SaveLocation", function(req,res){
	var mod = new model(req.body);
	mod.save(function(err,data){
		if(err){
			res.send(err);
		}
		else{
			res.send({data:"L'enregistrement est un succés !"});
		}
	});
});

app.get("/api/getLocations",function(req,res){
	model.find({},function(err,data){
		if(err){
			res.send(err);
		}
		else{
			res.send(data);
		}
	});
})

var port = process.env.PORT || 8080;

app.listen(port, function() {
	console.log('Mon back est sur le port 8080');
});


