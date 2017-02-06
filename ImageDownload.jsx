function downloadImages(url) {
    directory = TempImageDir + '/images';
    executeApplescript (url, directory);
    return directory;
    }

function executeApplescript(url, directory) {
    var myAppleScript = 'do shell script "cd ' + directory + ' && rm -fr *"';
    app.doScript(myAppleScript, ScriptLanguage.applescriptLanguage);
    
    myAppleScript = 'do shell script "cd '+ directory + ' && curl -L -O -J ' + url +'"';
    app.doScript(myAppleScript, ScriptLanguage.applescriptLanguage); //todo implement timeout here
    }

function createOSXFilename(foldername, url, directory) {
    filenameCounter = 0;
    var filename = directory + '/images/' + filenameCounter + ".jpg";
    filenameCounter++;
    return filename
    }

function getFilename(url) {
      var fileName = url.split("/");
      fileName = fileName[fileName.length - 1]; 
      return fileName;
    }