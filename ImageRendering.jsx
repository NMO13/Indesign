#include "ImageDownload.jsx"

renderImages(null);
function renderImages(images) {
    //var url = "https://bilder.ottoversand.at/asset/mmo/baur_format_p/16191566.jpg";
    //var url = "https://www.dropbox.com/s/1xny3ot2xmcwwh9/BottleBag_FG.jpg";
    var url = "https://www.dropbox.com/s/1xny3ot2xmcwwh9/BottleBag_FG.jpg?dl=1";
    //var url = "https://photos-4.dropbox.com/t/2/AAAV4KpHEPI8Max1tG__Bb5q9Ohh5ehOaCabOnrXhIJC1g/12/245532824/jpeg/32x32/3/1480089600/0/2/BottleBag_FG.jpg/EKfgkt0BGNMFIAcoBw/acm6LxX0hEbdkra_VILfHL-Un1Yv-utaRUgnq2SpaPA?size_mode=3&dl=0&size=2048x1536";
    render (url);
    }

function render(url) {
    var filename = downloadImages(url);
    image = loadImage(filename);
    
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

function loadImage(filename) {
    var image = new File(filename);
    image.open("r");
    return image;
    }