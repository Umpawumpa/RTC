
var fs = require('fs');
var express = require('express');

const port = process.argv[2];

if (!port) {
  throw Error('Port was not provided.. Exiting.');
}

///////////////////////////////////////////////////////////////////////////////
// DATA
///////////////////////////////////////////////////////////////////////////////

var data = fs.readFileSync(__dirname + '/assets/data.json', 'utf-8');
var systems = JSON.parse(data);

const CLIMATIC = [1,2,3,4,5,6,7,8,9,10,11,12];
const MECHANIC = [16,17,18,19,20,21,22];
const VACUUM = [13,14,15];

var meachnicSystems = 
  systems.filter((s) => CLIMATIC.indexOf(parseInt(s.code)) > -1);

var vacuumSystems = 
  systems.filter((s) => MECHANIC.indexOf(parseInt(s.code)) > -1);

var climaticSystems = 
  systems.filter((s) => VACUUM.indexOf(parseInt(s.code)) > -1);


///////////////////////////////////////////////////////////////////////////////
// SERVER
///////////////////////////////////////////////////////////////////////////////

var app = express();
 
app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.render('about');
});

app.get('/contacts', function(req, res) {
  res.render('contacts');
});

app.get('/services', function(req, res) {
  res.render('services');
});

app.get('/mechanic', function(req, res) {    
  res.render('mechanic', { systems: meachnicSystems });
});

app.get('/vacuum', function(req, res) {
  res.render('vacuum', { systems: vacuumSystems });
});

app.get('/climatic', function(req, res) {
  res.render('climatic',{ systems: climaticSystems });
});

///////////////////////////////////////////////////////////////////////////////
// E-MAIL
///////////////////////////////////////////////////////////////////////////////
app.post('/mail', function(req, res) {
  console.log('asdasdas');
  console.log(res.body);
});

app.listen(port, function() { console.log('Listening on ' + port + '..')});

