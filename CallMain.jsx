﻿#include "MainScript.jsx"

try {
    var path = '/Users/admin/Desktop/InDesignStuff';
    
    var kneiko = 'gafhkneik7';
    
    AllArticlesOfAllSuppliers = 'get-articles-of-all-suppliers';
    
   
    LogfilePath = path;
    
    logInfo("Starting...");
    main(path, AllArticlesOfAllSuppliers);
}
catch(e) {
    logCritical("An exception occured: " + e);
    alert(e);
    }

function logMe(input, level) {
    
     var now = new Date();

     var output = now.toTimeString() + "-- " + level + ' :' + input;

     $.writeln(output);

     var logFile = File(LogfilePath + "/logfile.txt");

     logFile.open("a");

     logFile.writeln(output);

     logFile.close();

}

function logCritial(input) {
    logMe(input, 'Critical');
    }

function logInfo(input) {
    logMe(input, 'Info');
    }