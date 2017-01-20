#include "../MainScript.jsx"

try {
    executeTests();
    alert("All tests passed");
    }
catch(e) {
    alert("Test not successful: " + e);
    }


function executeTests() {
    //dropboxDownloadTest();
    
    //werbemittelherstellerTest();
    
    //multipleImagesTest();
    
   // googleDriveTest(); 

  //  multipleFileFormatsTest(); 

  // sortByPositionTest(); 

  // addCategoryTest();

    demoTest();
}

function testDocument(document, imageCount) {
    if(document == null)
        throw "Invalid Document";
        
    assertEquals(imageCount, document.allGraphics.length, buildImageMessage(imageCount, document.allGraphics.length));
    }

function testPageCount(document, pageCount) {
    if(document == null)
        throw "Invalid Document";
        
    assertEquals(pageCount, document.pages.length, buildPageMessage(pageCount, document.pages.length));
    }

function assertEquals(expected, actual, message) {
    if(expected != actual) {
        throw message;
        }
    }

function buildImageMessage(expectedImageCount, actualImageCount) {
    return "The expected image count should be " + expectedImageCount + " but was " + actualImageCount;
    }

function buildPageMessage(expectedPageCount, actualPageCount) {
    return "The expected image count should be " + expectedPageCount + " but was " + actualPageCount;
    }

function test(testfilePath, imageCount, pageCount) {
    var doc = main(testfilePath);
    testDocument(doc, imageCount);
    testPageCount(doc, pageCount);
    }

function dropboxDownloadTest() {
    test('/Users/admin/Desktop/Indesign/tests/dropboxDownloadTest', 1, 1);
    }

function werbemittelherstellerTest() {
    test('/Users/admin/Desktop/Indesign/tests/werbemittelherstellerTest', 1, 1);
    }

function multipleImagesTest() {
    test('/Users/admin/Desktop/Indesign/tests/multipleImagesTest', 5, 2);
    }

function googleDriveTest() {
    test('/Users/admin/Desktop/Indesign/tests/googleDriveTest', 1, 1);
    }

function multipleFileFormatsTest() {
    test('/Users/admin/Desktop/Indesign/tests/multipleFileFormatsTest', 6, 2);
    }

function sortByPositionTest() {
    test('/Users/admin/Desktop/Indesign/tests/sortByPositionTest', 3, 3);
    }

function addCategoryTest() {
    test('/Users/admin/Desktop/Indesign/tests/addCategoryTest', 3, 6);
    }

function demoTest() {
    test('/Users/admin/Desktop/Indesign/tests/demoTest', 3, 6);
    }