function clearDir(directory) {
    var myAppleScript = 'do shell script "cd ' + directory + ' && rm -fr *"';
    executeScript(myAppleScript, ScriptLanguage.applescriptLanguage);
    }

function downloadArticlesFromEntity(entity, directory) { 
    var myAppleScript;
    
    if(entity == AllArticlesOfAllSuppliers)
        myAppleScript = 'do shell script "cd ' + directory + ' && curl 138.68.75.56/get-articles-of-all-suppliers -o all_articles.json"';
    else
        myAppleScript = 'do shell script "cd ' + directory + ' && curl 138.68.75.56/get-articles?merchant-or-supplier-id=' + entity + ' -o ' + entity +'_articles.json"';
    executeScript(myAppleScript);
    }

function recreateDir(directory) {
    deleteDir(directory);
    createDir(directory);
    logInfo('Directory ' + directory + ' successfully recreated.');
    return directory;
    }

function deleteDir(directory) {
    var myAppleScript = 'do shell script "rm -rf ' + directory + '"';
    executeScript(myAppleScript, ScriptLanguage.applescriptLanguage);
    logInfo('Directory ' + directory + ' successfully deleted.');
    }

function createDir(directory) {
    var myAppleScript = 'do shell script "mkdir -p ' + directory + '"';
    executeScript(myAppleScript, ScriptLanguage.applescriptLanguage);
    logInfo('Directory ' + directory + ' successfully created.');
    }

function downloadImage(url, directory) {
    logInfo('Starting to download image from ' + url + '.');
    var retryCounter = 0;
    while(retryCounter < 3)  {
        try {
            myAppleScript = 'do shell script "cd '+ directory + ' && curl -L -O -J --max-time 720 ' + url +'"';
            executeScript(myAppleScript, ScriptLanguage.applescriptLanguage);
            break;
        }
        catch(error) {
            logCritical('Image download attempt number ' + retryCounter + ' was not successful.');
            retryCounter++;
            }
        }
    
    if(retryCounter < 3) {
        logInfo('Image ' + url + ' successfully downloaded.');
        }
    else {
        logCritical('Could not download image ' + url);
        }
    }