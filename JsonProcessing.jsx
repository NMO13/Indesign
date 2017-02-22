function parseAllJsonFiles(directory) {
    var folder = new Folder(directory);
    var files = folder.getFiles();
    if(files.length == 0) {
        throw new Error('No Json file was found in directory ' + directory);
        return;
        }
    
    var articlesArray = new Array();
    for(i = 0; i < files.length; i++) {
        var file = files[i];
        var extension = file.name.split('.').pop();
        if(file instanceof File && extension == 'json') {
            articlesArray.push(parseJson(file));
        }
    }
    articlesArray = [].concat.apply([], articlesArray);
    return articlesArray;
}

function parseJson(file) {
    file.encoding = "UTF-8";
    file.open('r');
    var content = file.read();

    content = "(" + content + ")";

    var obj;
    try {
    obj = eval(content);
    }
    catch(error)
    {
        throw new Error('Could not parse file ' + file);
        }

    file.close();
    return obj;
}

