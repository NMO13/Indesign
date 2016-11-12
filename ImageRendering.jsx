#include "GetURLs.jsx"

function renderImages(images) {
    var url = "https://bilder.ottoversand.at/asset/mmo/baur_format_p/16191566.jpg";
    downloadImages (url);
    }

function downloadImages(url) {
    var imageData = GetURL(url,true);
    var filename = getFilename(url);
    
    var image = saveImageToHD(imageData, filename, "~/Desktop/test");
    var page = document.pages.item(0);
    var rect = page.rectangles.add();
    //rect.geometricBounds = [0, 100, 100, 200];
    rect.place(image);
    rect.fit (FitOptions.FRAME_TO_CONTENT);
    rect.fit (FitOptions.PROPORTIONALLY);
    rect.fit (FitOptions.CENTER_CONTENT);
    
    var xOffset = (rect.geometricBounds[3] - rect.geometricBounds[1]) / 2;
    //rect.geometricBounds = [rect.geometricBounds[0], rect.geometricBounds[1] + xOffset, rect.geometricBounds[2], rect.geometricBounds[3] + xOffset];
    rect.move([100, 0]);
    }

function getFilename(url) {
      var fileName = url.split("/");
      fileName = fileName[fileName.length - 1]; 
      return fileName;
    }

function saveImageToHD(imageData, filename, path) { 
    var imagePath = File(path + "/"+ filename);
    if (imageData != null && imageData.body != null) {
        imagePath.open("w");
        imagePath.encoding = "BINARY";
        imagePath.write(imageData.body);
        imagePath.close();
       }
    return imagePath;
    }