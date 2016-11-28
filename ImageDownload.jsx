//myScript = "alert('hello world!');";
//myScript = "echo hello & echo.world";
//app.doScript(myScript, ScriptLanguage.UNKNOWN);

function downloadImages(url) {
    var name = "batchfile.bat";

    var directory = (new File($.fileName)).parent.parent;
    directory = directory.fsName;
    var filename = createWindowsFilename("images", url, directory);
    
    var batchFile = writeWindowsBatchCode(url, name, filename, directory);
    batchFile.execute();
    
    while(batchFile.exists) {
        $.sleep(1000);
        $.writeln("waiting for image download\n");
    }
    $.writeln("download completed");
    return filename;
    }

function writeWindowsBatchCode(url, name, filename, directory) {
        batchFile = new File(directory + "\\" + name);
        batchFile.open("w");
        batchFile.writeln(
        'start /wait "" "C:\\Users\\Martin\\Downloads\\curl.exe" -L -o ' +  filename  + ' --create-dirs ' + url + '\n' +
        'DEL "%~f0"'
        );
        return batchFile;
    }

function createWindowsFilename(foldername, url, directory) {
    filenameCounter = 0;
    var filename = directory + '\\images\\' + filenameCounter + ".jpg";
    filenameCounter++;
    return filename
    
    }

function getFilename(url) {
      var fileName = url.split("/");
      fileName = fileName[fileName.length - 1]; 
      return fileName;
    }

// Or use a hard coded path to the file
// var file = File("~/Desktop/hello world.txt");

// Open the file for reading
/*
file.open("r");
var result = file.execute();

// busy wait
while(file.exists) {
    $.sleep(1000);
    $.writeln("waiting for finish\n");
    }
$.writeln("finish");


var val = $.getenv("download");


$.writeln(result);*/