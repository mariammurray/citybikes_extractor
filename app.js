const fs = require('fs');

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
    const json = JSON.parse(content)
    console.log(filename, json.instances[0]);
    return;
}, (e) => {
    // on Error
    console.log("Something went wrong", e);
})