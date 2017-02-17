#include "MainScript.jsx"

try {
    var path = '/Users/admin/Desktop/InDesignStuff';
    
   
    LogfilePath = path;
    
    logMe("Starting...");
    main(path, 'Kneiko');
}
catch(e) {
    logMe("An exception occured: " + e);
    alert(e);
    }

function logMe(input) {
    
     var now = new Date();

     var output = now.toTimeString() + ": " + input;

     $.writeln(output);

     var logFile = File(LogfilePath + "/logfile.txt");

     logFile.open("a");

     logFile.writeln(output);

     logFile.close();

}