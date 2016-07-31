
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

const CLIMATIC = [1,2,3,4,5,6,7,8,9,10,11,12, 23,24];//klimatick numbers
const MECHANIC = [16,17,18,19,20,21,22];//mech numbers
const VACUUM = [13,14,15];//vacuum numbers

var meachnicSystems = 
  systems.filter((s) => MECHANIC.indexOf(parseInt(s.code)) > -1);

var vacuumSystems = 
  systems.filter((s) => VACUUM.indexOf(parseInt(s.code)) > -1);

var climaticSystems = 
  systems.filter((s) => CLIMATIC.indexOf(parseInt(s.code)) > -1);


///////////////////////////////////////////////////////////////////////////////
// SERVER
///////////////////////////////////////////////////////////////////////////////

var app = express();
 
app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.render('layout', {climsystems: climaticSystems,vacsystems: vacuumSystems,meachsystems: meachnicSystems, indexClass: 'active' });
});

// app.get('/contacts', function(req, res) {
//   res.render('contacts', { contactsClass: 'active' });
// });

// app.get('/services', function(req, res) {
//   res.render('services', { servicesClass: 'active' });
// });

// app.get('/mechanic', function(req, res) {    
//   res.render('mechanic', { meachsystems: meachnicSystems, equipmentClass: 'active' });
// });

// app.get('/vacuum', function(req, res) {
//   res.render('vacuum', { vacsystems: vacuumSystems, equipmentClass: 'active' });
// });

// app.get('/climatic', function(req, res) {
//   res.render('climatic',{ climsystems: climaticSystems, equipmentClass: 'active' });
// });
app.get('/contacts', function(req, res) {
  res.render('contacts', { contactsClass: 'active' });
});

app.get('/services', function(req, res) {
  res.render('services', { servicesClass: 'active' });
});

app.get('/mechanic', function(req, res) {    
  res.render('mechanic', { systems: meachnicSystems, equipmentClass: 'active' });
});

app.get('/vacuum', function(req, res) {
  res.render('vacuum', { systems: vacuumSystems, equipmentClass: 'active' });
});

app.get('/climatic', function(req, res) {
  res.render('climatic',{ systems: climaticSystems, equipmentClass: 'active' });
});


///////////////////////////////////////////////////////////////////////////////
// E-MAIL
///////////////////////////////////////////////////////////////////////////////
app.post('/mail', function(req, res) {
  console.log('asdasdas');
  console.log(res.body);
});
///////////////////////////////////////////////////////////////////////////////
// THE END
///////////////////////////////////////////////////////////////////////////////
app.listen(port, function() { console.log('Listening on ' + port + '..')});