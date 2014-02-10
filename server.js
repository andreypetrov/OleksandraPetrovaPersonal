
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var requirejs = require('requirejs');


//Email add on
var sendgrid  = require('sendgrid')(
    process.env.SENDGRID_USERNAME,
    process.env.SENDGRID_PASSWORD,
    {api: 'smtp'}
);

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

sendgrid.send({
    to: 'rokanor@gmail.com',
    from: 'sender@example.com',
    subject: 'Hello World',
    text: 'Sending email with NodeJS through SendGrid!'
}, function(err, json) {
    if (err) { return console.error(err); }
    console.log(json);
});


//app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});



