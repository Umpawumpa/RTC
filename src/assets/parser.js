'use strict';

var fs = require('fs');
var nodePath = require('path');

var path = nodePath.join(__dirname, 'data'); 
var folders = fs.readdirSync(path);

var systems = []

var pathsArray = [];
for (var folder of folders) {
  var folderContains = fs.readdirSync(__dirname + '/data' + '/' + folder);
  var folderPaths = [];  
  
  for (var file of folderContains) {
    var filePath = __dirname + '/data' + '/' + folder + '/' + file;
    folderPaths.push(filePath);
  }

  pathsArray.push({
    name: folder,
    files: folderPaths
  });
}

class System {
  constructor(dataObject) {
    var parseFile = function(path) {
      var str = fs.readFileSync(path, 'utf-8')
      return str.split('<br />').join('')
                .split('</sub>').join('')
                .split('<sup>').join('')
                .split('</sup>').join('')
                .split('\r\n\r\n').join('')
                .split('\r\n').join('')
                .split('&deg').join('')
                .split('&#37;').join('\u2103');
    }

    var data = {
      code: dataObject.name,
      name: dataObject.files[2],
      manufacturer: dataObject.files[3],
      details: dataObject.files[4]
    }

    this.code = data.code;
    this.name = parseFile(data.name);
    this.manufacturer = parseFile(data.manufacturer);
    this.details = parseFile(data.details);
  }
}

for (var dataSlice of pathsArray) {
  var system = new System(dataSlice);
  systems.push(system);
}

var json = JSON.stringify(systems); 
var outputPath = nodePath.join(__dirname, 'data.json');

fs.writeFileSync(outputPath, json);
console.log('Done.');
