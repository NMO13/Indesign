﻿#include "ImageDownload.jsx"
function renderImages(images, page, greyBox) {
    var posX, posY;
    var largestY = 0;
    for(var i = 0; i < images.length; i++) {
        var url = images[i].url;
        url = modifyImageUrl(url);
        var directory = downloadImages(url);
        var image = processDownloadedFile(directory);
        if(i == 0) {
            renderMainImage(image, page, greyBox, i + 1);
            }
        if(i == 1) {
            addPage();
            page = getLastPage();
            posX = 0;
            posY = 20;
            }
        if(i > 0) {
            if(i % 4 == 0) {
                posX = 0;
                posY = largestY;
                }
            var prevBounds = renderComplementaryImage(image, page, i + 1, posX, posY);
            posX += prevBounds[0];
            if(prevBounds[1] > largestY) {
                largestY = prevBounds[1];
                }
            }
        }
    }

function modifyImageUrl(url) {
    var parsedUrl = getParsedUrl(url);
    if(parsedUrl.address == 'www.dropbox.com') {
        }
    else if(parsedUrl.address == 'drive.google.com' || parsedUrl.address == 'docs.google.com') {
        }
    else if(parsedUrl.address == 'www.werbemittelhersteller.com') {
        }
    else
        throw parsedUrl.address + " is an invalid hoster";
        
    return url;
    }

function getParsedUrl(url) {
    return parseUrl(url);
    }

function renderMainImage(image, page, greyBox, imageCounter) {
    var rect = page.rectangles.add();
    rect.place(image);
    rect.fit (FitOptions.FRAME_TO_CONTENT);
    rect.fit (FitOptions.PROPORTIONALLY);
    rect.fit (FitOptions.CENTER_CONTENT);
    rect.strokeWeight = 0;
    
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
    var rect = page.rectangles.add();
    rect.place(image);
    rect.fit (FitOptions.FRAME_TO_CONTENT);
    rect.fit (FitOptions.PROPORTIONALLY);
    rect.fit (FitOptions.CENTER_CONTENT);
    if(page.side == PageSideOptions.RIGHT_HAND && page.index != 0) {
        rect.move([posX + 210, posY]);
        createImageCounterFrame(page, posX, posY, imageCounter);
        }
    else {
        rect.move([posX, posY]);
        createImageCounterFrame(page, posX, posY, imageCounter);
        }
    return [rect.geometricBounds[3] - rect.geometricBounds[1], rect.geometricBounds[2] - rect.geometricBounds[0]];
    }

function createImageCounterFrame(page, posX, posY, imageCounter) {
    var tf = page.textFrames.add();
    tf.geometricBounds = [posY + 5, posX + 5, posY + 30, posX + 30];
    var font0 = new FontInfo(10, "The Sans Bold-	Bold Plain", document.colors.itemByName("Black"));
    setFontAndText("> " + imageCounter + ".0", font0, tf, 0);
    tf.fit(FitOptions.FRAME_TO_CONTENT); 
    }

function processDownloadedFile(directory) {
    var folder = new Folder(directory);
    var files = folder.getFiles();
    if(files.length == 0) {
        alert("The download of the image file was not successful");
        return;
        }
    for(i = 0; i < files.length; i++) {
        var file = new File(files[i]);
        var extension = getExtension(file);
        
        if(extension == "zip") {
            unzip(file, directory);
            var image = findImage(directory);
            if(image == null) {
                alert('Image was not found in zip');
                throw new Error('Image was not found in zip');
                }
            return image;
           }           
        else if(extension =='jpg' || extension == 'jpeg' || extension == 'tif' || extension == 'psd' || extension =='eps')
        {
            file.open("r");
            return file;
            }
        }
    alert('Unrecognized file type: ' + extension);
    throw new Error('Unrecognized file type');
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
            if(extension =='jpg' | extension == 'jpeg') {
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
    return file.name.split('.').pop();
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

    parsedURL.path = parsedURL.path;
  
    return parsedURL;
    }
