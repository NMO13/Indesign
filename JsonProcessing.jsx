function parseAllJsonFiles(directory) {
        var folder = new Folder(directory);
    var files = folder.getFiles();
    if(files.length == 0) {
        alert("The download of the image file was not successful");
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
    file.open('r');
    var content = file.read();

    content = "(" + content + ")";

    var obj;
    try {
    obj = eval(content);
    }
    catch(error)
    {
        $.writeln (error);
        }

    file.close();
    return obj;
}

