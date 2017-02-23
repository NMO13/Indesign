function downloadImages(url) {
    if(KeepImages == false) {
        clearDir(TempImageDir);
    }
    downloadImage(url, TempImageDir);
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

function downloadMerchantSpecificImages(files) {
    logInfo('Downloading merchant specific images');
    for(var i = 0; i < files.length; i++) {
        var url = files[i].url;
        if(url == "") {
            continue;
            }
        downloadImage(url, MerchantImages);
        }
    }