#include "ImageDownload.jsx"
function renderImages(images, page, greyBox) {
    logInfo('Starting image rendering.');
    var posX, posY = 0;
    var largestY = greyBox.geometricBounds[0];
    logInfo(images.length + ' images to render.');
    var imageCounter = 0;
    for(var i = 0; i < images.length; i++) {
        var url = images[i].url;
        if(url == "")
            continue;
        
        url = modifyImageUrl(url);
        downloadImages(url);
        var image = processDownloadedFile(TempImageDir);
        if(i == 0) {
            renderMainImage(image, page, greyBox, imageCounter + 1);
            }
        else {
            if(imageCounter % 3 == 1) {
                posX = 0;
                posY = largestY;
                }
            var prevBounds = renderComplementaryImage(image, page, imageCounter + 1, posX, posY);
            if(prevBounds[1]  > largestY) {
                largestY = prevBounds[1];
                }
            posX = prevBounds[0];
            }
        imageCounter++;
        }
    logInfo('Completed image rendering');
    }

function modifyImageUrl(url) {
    var parsedUrl = getParsedUrl(url);
    if(parsedUrl.address == 'www.zertuscloud.com') {
        url = url + '/download';
        }
    else if(parsedUrl.address == 'www.werbemittelhersteller.com') {
        url = url.replace('?id=', '?down=');
        }
        
    return url;
    }

function getParsedUrl(url) {
    return parseUrl(url);
    }

function renderMainImage(image, page, greyBox, imageCounter) {
    logInfo('Rendering main image.');
    var rect = placeImageInRect(image, page);
    if(rect == null)
        return;
    if(page.side == PageSideOptions.RIGHT_HAND && page.index != 0) {        
        rect.move([greyBox.geometricBounds[3] + 210, greyBox.geometricBounds[0]]);
        createImageCounterFrame(page, greyBox.geometricBounds[3], greyBox.geometricBounds[0], imageCounter);
        }
    else {
        rect.move([greyBox.geometricBounds[3], greyBox.geometricBounds[0]]);
        createImageCounterFrame(page, greyBox.geometricBounds[3], greyBox.geometricBounds[0], imageCounter);
        }   
    }

function renderComplementaryImage(image, page, imageCounter, posX, posY) {
    logInfo('Rendering complementary image.');
    var rect = placeImageInRect(image, page);
    if(rect == null) {
        return [posX, posY];
        }
    if(page.side == PageSideOptions.LEFT_HAND) {
        posX -= rect.geometricBounds[3] - rect.geometricBounds[1];
        createImageCounterFrame(page, posX, posY, imageCounter);
        rect.move([posX, posY]);
        }
    else {
        var offset;
        if(page.index == 0)
            offset = 210;
        else
            offset = 420;
        rect.move([posX + offset, posY]);
        
        if(page.index > 0) {
            offset = 210;
            }
        createImageCounterFrame(page, posX + offset, posY, imageCounter);
        posX += rect.geometricBounds[3] - rect.geometricBounds[1];
        }
    return [posX, rect.geometricBounds[2]];
    }

function placeImageInRect(image, page) {
    var rect = page.rectangles.add();
    var isValidImage = false;
    try {
        rect.place(image);
        var image = rect.images[0];
        rect.fit (FitOptions.FRAME_TO_CONTENT);    
        rect.fit (FitOptions.PROPORTIONALLY);
        rect.fit (FitOptions.CENTER_CONTENT);
        
        isValidImage = true;
        
        rect.resize(CoordinateSpaces.innerCoordinates, AnchorPoint.centerAnchor, ResizeMethods.REPLACING_CURRENT_DIMENSIONS_WITH, [80, 80]);
        image.resize(CoordinateSpaces.innerCoordinates, AnchorPoint.centerAnchor, ResizeMethods.REPLACING_CURRENT_DIMENSIONS_WITH, [80, 80]);
        rect.strokeWeight = 0; 
    }
    catch(e) {
        
        if(isValidImage == false) {
            var color = document.colors.itemByName("color2");
            rect.fillColor = color;
            var gb = rect.geometricBounds;
            gb[2] = gb[2] + 10;
            gb[3] = gb[3] + 10;
            rect.geometricBounds = gb;
            logCritical('Could not create rectangle for image');
            } 
        }
    return rect;
    }

function createImageCounterFrame(page, posX, posY, imageCounter) {
    var tf = page.textFrames.add();
    tf.geometricBounds = [posY, posX + 1, posY + 30, posX + 30];
    var font0 = new FontInfo(10, "The Sans Bold-	Bold Plain", document.colors.itemByName("Black"));
    setFontAndText("> " + imageCounter + ".0", font0, tf, 0);
    tf.fit(FitOptions.FRAME_TO_CONTENT); 
    }

function processDownloadedFile(directory) {
    var folder = new Folder(directory);
    var files = folder.getFiles();
    if(files.length == 0) {
        logCritical("The download of the image file was not successful");
        return null;
        }
    for(i = 0; i < files.length; i++) {
        var file = new File(files[i]);
        var extension = getExtension(file);
        
        if(extension == "zip") {
            logInfo('Unzipping ' + file + '.');
            unzip(file, directory);
            var image = findImage(directory);
            if(image == null) {
                logCritical('Image was not found in zip');
                }
            return image;
           }           
        else if(isKnownExtension(extension)) {
            copyToAllImages(file);
            file.open("r");
            return file;
            }
        }
    logCritical('The extension of the file ' + file + ' was not recognized.');
    return null;
    }

function copyToAllImages(file) {
    file = modifyImageName(file);
    if(KeepImages == true && file != null) {
        addFileNumber(file);
        copyImage(file, AllImageDir);
        }
    }

function modifyImageName(file) {
    var dec = decodeURIComponent(file.name);
    var str = dec.replace(/\s/g, '');
    str = str.replace(/[^a-zA-Z. ]/g, 'x');
    file.rename(str);
    return file;
    }
// we want a distinct filename before we copy it (avoid name clashes)
function addFileNumber(file) {
    var newName = FileCounter + file.name;
    file.rename(newName);
    }

function isKnownExtension(extension) {
    return extension =='jpg' || extension == 'jpeg' || extension == 'tif' || extension == 'png' || extension == 'psd' || extension =='eps' || extension == 'pdf' || extension == 'ai';
    }

function findImage(directory) {
    var folder = new Folder(directory);
    var files = folder.getFiles();
    if(files.length == 0) {
        alert("The download of the image file was not successful");
        return;
        }
    
    for(i = 0; i < files.length; i++) {
        var file = files[i];      
        if(file instanceof File) {
            var extension = getExtension(file);
            if(isKnownExtension(extension)) {
                copyToAllImages(file);
                file.open("r");
                return file;
            }
        }
        else if(file instanceof Folder) {
            var file = findImage(file);
            return file;
        }
    }
    return null;
    }

function getExtension(file) {
    var filename =  file.name.split('.').pop();
    return filename.toLowerCase();
    }

function removeQueryString(file) {
    //todo does not work if file name is aa.bbb.zip
    var extension = getExtension(file);
    var extensionParts = extension.split("?");
    var fileParts = file.name.split(".");
    var newFileName = fileParts[0] + '.' + extensionParts[0];
    file.rename(newFileName);
    }

function unzip(file, directory) {
    try {
            app.doScript('do shell script "unzip -o ' + file +  ' -d ' + directory + '"', ScriptLanguage.applescriptLanguage);
        }
        catch(e)
        {
            alert(e);
            throw e;
        }
    }

function parseUrl(url) {
   url=url.replace(/([a-z]*):\/\/([-\._a-z0-9A-Z]*)(:[0-9]*)?\/?(.*)/,"$1/$2/$3/$4");
   url=url.split("/");
 
   if (url[2] == "undefined") url[2] = "80";
   var res = url[url.length - 1].split("?");
   
   var queryParameter = "";
   if(res.length > 1)
       queryParameter = res[1];
    
   url.push(queryParameter);
   
   var parsedURL = 
   {
      protocol: url[0].toUpperCase(),
      address: url[1],
      port: url[2],
      queryString:url[url.length - 1],
      path: ""
      };

    url = url.slice(3);
    parsedURL.path = url.join("/");
  
    if(parsedURL.port != null) {
        if (parsedURL.port.charAt(0) == ':')
        {
           parsedURL.port = parsedURL.port.slice(1);
        }

        if (parsedURL.port != "")
        {
           parsedURL.port = parseInt(parsedURL.port);
        }
      
        if (parsedURL.port == "" || parsedURL.port < 0 || parsedURL.port > 65535)
        {
          parsedURL.port = 80;
        }
    }

    parsedURL.path = parsedURL.path;
  
    return parsedURL;
    }
