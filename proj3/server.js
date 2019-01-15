/*
 * server.js - Server for CS496 Project3.
 */

// Assign http module to http variable for server.
var http = require('http');
var url = require('url');
var querystring = require('querystring');

// Use express.
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// Connect this nodejs server with mongoDB.
var  mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/p3');
var db = mongoose.connection;

db.on('error', function(){
	console.log('Connection Failed.');
});

db.once('open', function(){
	console.log('Connected.');
})

var Schema = mongoose.Schema;

// Serrver listen for port with port number 80.
app.listen(80, function(){
	console.log('Server is running...');
});

/*
 * GET - Deals with GET method,
 *       which requests user's schedule info.
 */
app.get('/getschedule', function(req, res){
	// Parse arguments.
	var parsedUrl = url.parse(req.url);
	var parsedQuery = querystring.parse(parsedUrl.query, '&', '=');
	
	// Need two arguments which are user identifier and year/month identifier.
	if (Object.keys(parsedQuery).length != 2){
		res.write('Error: Too many or less arguments');
		res.end();
	}else{
		var user_id = parsedQuery.user;
		var year_month = parsedQuery.year_month;
		
		var Schedule = mongoose.model('Schema', new Schema({user : String, year_month : String, info : [{date : String, content : String}]}), 'schedule');
		var condition = {'user' : user_id, 'year_month' : year_month};
		var get = {'_id' : 0, 'info' : 1};
		
		Schedule.find(condition, get, function(error, data){
			console.log('Get schedule info of user.');
			if (error){
				console.log(error);
			}else{
				// If there's no entity for this user, make it.
				if (data.toString() == ''){
					Schedule.create({'user' : user_id, 'year_month' : year_month, 'info' : []}, function(error){
						if (error){
							console.log(error);
						}else{
							console.log('Create entity for user.');
							// Set the response again.
							Schedule.find(condition, get, function(error, newdata){
								if (error){
									console.log(error);
								}else{
									data = newdata;
									res.setHeader('Content-Type', 'text/json');
									res.write(data.toString());
									res.end();
								}
							});
						}
					});
				}else{
					res.setHeader('Content-Type', 'text/json');
					res.write(data.toString());
					res.end();
				}
			}
		});
		mongoose.deleteModel('Schema');
	}
});

/*
 * POST - Deals with POST method,
 *        which modifies user's schedule info.
 */
app.post('/postschedule', function(req, res){
	console.log('Post schedule info of uesr.');
	// Parse arguments.
	var parsedUrl = url.parse(req.url);
	var parsedQuery = querystring.parse(parsedUrl.query, '&', '=');
	
	// Need two arguments which are user identifier and year/month identifier.
	if (Object.keys(parsedQuery).length != 2){
		res.write('Error: Too many or less arguments.');
		rew.end();
	}else{
		var user_id = parsedQuery.user;
		var year_month = parsedQuery.year_month;
		var new_info = req.body.info;
		
		var Schedule = mongoose.model('Schema', new Schema({user : String, year_month : String, info : [{date : String, content : String}]}), 'schedule');
		var condition = {'user' : user_id, 'year_month' : year_month};
		var update = {'$set' : {'info' : new_info}};
		var option = {upsert : true, new : true, useFindAndModify : false};
		
		Schedule.findOneAndUpdate(condition, update, option, function(error, change){
			if (error){
				console.log(error);
			}else{
				res.setHeader('Content-Type', 'text/json');
				res.write(change.toString());
				res.end();
			}
		});
		mongoose.deleteModel('Schema');
	}
});

app.get('/gettodo', function(req, res){
	console.log('Get todo list info of user.');
	// Parse arguments.
	var parsedUrl = url.parse(req.url);
	var parsedQuery = querystring.parse(parsedUrl.query, '&', '=');
	
	// Need only one argument which is user identifier.
	if (Object.keys(parsedQuery).length != 1){
		res.write('Error: Too many or less arguments.');
		res.end();
	}else{
		var user_id = parsedQuery.user;
		
		var Todo = mongoose.model('Schema', new Schema({user : String, content : String}), 'todo');
		var condition = {'user' : user_id};
		var get = {'_id' : 0, 'content' : 1};
		
		Todo.find(condition, get, function(error, data){
			if (error){
				console.log(error);
			}else{
				// If there's no entity for this user, make it.
				if (data.toString() == ''){
					Todo.create({'user' : user_id, 'content' : ''}, function(error){
						if (error){
							console.log(error);
						}else{
							console.log('Create entity for user.');
							// Set the response again.
							Todo.find(condition, get, function(error, newdata){
								if (error){
									console.log(error);
								}else{
									data = newdata;
									res.setHeader('Content-Type', 'text/json');
									res.write(data.toString());
									res.end();
								}
							});
						}
					});
				}else{
					res.setHeader('Content-Type', 'text/json');
					res.write(data.toString());
					res.end();
				}
			}
		});
		mongoose.deleteModel('Schema');
	}
});

app.post('/posttodo', function(req, res){
	console.log('Post todo list info of user.');
	// Parse arguments.
	var parsedUrl = url.parse(req.url);
	var parsedQuery = querystring.parse(parsedUrl.query, '&', '=');
	
	// Need only one argument which is user identifier.
	if (Object.keys(parsedQuery).length != 1){
		res.write('Error: Too many or less argument.');
		res.end();
	}else{
		var user_id = parsedQuery.user;
		var new_content = req.body.content;
		
		var Todo = mongoose.model('Schema', new Schema({user : String, content : String}), 'todo');
		var condition = {'user' : user_id};
		var update = {'$set' : {'content' : new_content}};
		var option = {upsert : true, new : true, useFindAndModify : false};
		
		Todo.findOneAndUpdate(condition, update, option, function(error, change){
			if (error){
				console.log(error);
			}else{
				res.setHeader('Content-Type', 'text/json');
				res.write(change.toString());
				res.end();
			}
		});
		mongoose.deleteModel('Schema');
	}
});
