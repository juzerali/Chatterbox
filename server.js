var express = require('express')
,	routes = require('./routes')
,	visitors = [];

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

	
app.listen(16464);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

 var everyone = require("now").initialize(app);
 everyone.now.distributeMessage = function(message){
  everyone.now.receiveMessage(this.now.name, message);
};

everyone.now.addName = function(name){
	var index = visitors.indexOf(name);
	if(index >= 0) visitors.splice(index);
	visitors.unshift(name);
}
	