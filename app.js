const fs = require('fs');
const pg = require('pg');
const conString = "postgres://maria:postgres374@localhost:5432/city_bikes_db";
const client = new pg.Client(conString);
client.connect();



function readFiles(dirname, onFileContent, onError) {
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      onError(err);
      return;
    }
    filenames.forEach(function(filename) {
      fs.readFile(dirname + filename, 'utf-8', function(err, content) {
        if (err) {
          onError(err);
          return;
        }
        onFileContent(filename, content);
      });
    });
  });
}

readFiles('data/', (filename, content) => {
    // Read the content
    const json = JSON.parse(content);
    for (let i in json.instances){
        console.log(json.instances[i].meta.city)
    }

    
    return;
}, (e) => {
    // on Error
    console.log("Something went wrong", e);
})