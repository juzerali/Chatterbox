var express = require('express');
var	routes = require('./routes');
var	visitors = [];

var app = module.exports = express.createServer();



app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');
  app.register(".html", require("jqtpl").express);
  app.set("view options", { layout: false });
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('dev', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes		

app.get('/', function(req,res){
		res.render(__dirname + '/views/index.html', {author: "Juzer Ali"});
});

app.listen(process.env['app_port'] || 8080);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

 var everyone = require("now").initialize(app);
 everyone.now.distributeMessage = function(message){
  everyone.now.receiveMessage(this.now.name, message);
};	

everyone.now.addName = function(name){
	var self = this;
	//console.log(name,self.name);
	var index = visitors.indexOf(name);
	if(index >= 0) visitors.splice(index,1);
	visitors.unshift(name);
	//console.log(visitors)
	everyone.now.populateVisitors(visitors);
}