#include "JsonProcessing.jsx"
#include "DocumentRendering.jsx"
#include "ImageRendering.jsx"
#include "FileOperations.jsx"
// main code starts here

function main(parentDir, entity)
{
    var entityDir = parentDir + '/' + entity;
    recreateDir(entityDir);
    downloadArticlesFromEntity(entity, entityDir);
    TempImageDir = recreateDir(entityDir + '/tempImages');
    MerchantImages = recreateDir(entityDir + '/merchantFiles');
    setupDocument();

    var color = document.colors.add();
    color.properties = {
        name: "color0",
        model: ColorModel.PROCESS,
        space: ColorSpace.CMYK,
        colorValue: [14, 7, 6, 88]
        };

    var color = document.colors.add();
    color.properties = {
        name: "color1",
        model: ColorModel.PROCESS,
        space: ColorSpace.CMYK,
        colorValue: [0, 0, 0, 0]
        };
    logMe('Document successfuly created.');

    var articles = parseAllJsonFiles(entityDir);
    sortByCategory(articles);
    logMe('Sorting of articles completed.');
    
    logMe(articles.length + ' articles to render.');
    for(var i = 0; i < articles.length; i++) {
        logMe('Rendering article ' + i + '.');
        fillTextFrame(articles[i]);
        logMe('Completed article rendering');
        if(i < articles.length - 1)
            addPage();
    }

    logMe('Finished');
    return document;
}

function setupDocument() {
    var myDocument = app.documents.add();
    var documentPreference = myDocument.documentPreferences;
    documentPreference.pageSize = "A4";
    documentPreference.facingPages = true;
    documentPreference.intent = DocumentIntentOptions.PRINT_INTENT;
    
    setRulerAndUnits();
    setPageMargins();
    setDocumentBleed(documentPreference);
    setDocumentSlug(documentPreference);
    return myDocument;
    }

function addPage() {
    var pageRef = document.pages.item(document.pages.length - 1);
    document.pages.add(LocationOptions.AFTER, pageRef);
    }

function getLastPage() {
    return document.pages.item(document.pages.length - 1);
    }

function setRulerAndUnits() {
    //Set the measurement units and ruler origin.
    document.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.MILLIMETERS;
    document.viewPreferences.verticalMeasurementUnits = MeasurementUnits.MILLIMETERS;
    document.viewPreferences.rulerOrigin = RulerOrigin.pageOrigin;
    }

function setPageMargins() {
    //Get a reference to the first master spread.
    var myMasterSpread = document.masterSpreads.item(0);
    //Get a reference to the margin preferences of the first page in the master spread.
    var myMarginPreferences = myMasterSpread.pages.item(0).marginPreferences;
    //Now set up the page margins and columns.
    myMarginPreferences.left = 0;
    myMarginPreferences.top = 0;
    myMarginPreferences.right = 0;
    myMarginPreferences.bottom = 0;
    myMarginPreferences.columnCount = 1;
    myMarginPreferences.columnGutter = "4.233mm";
    //Page margins and columns for the right-hand page.
    var myMarginPreferences = myMasterSpread.pages.item(1).marginPreferences;
    myMarginPreferences.left = 0;
    myMarginPreferences.top = 0;
    myMarginPreferences.right = 0;
    myMarginPreferences.bottom = 0;
    myMarginPreferences.columnCount = 1;
    myMarginPreferences.columnGutter = "4.233mm";
    }

function setDocumentBleed(documentPreference) {
    documentPreference.documentBleedUniformSize = false;
    documentPreference.documentBleedBottomOffset = "3mm";
    documentPreference.documentBleedInsideOrLeftOffset = "3mm";
    documentPreference.documentBleedOutsideOrRightOffset = "3mm";
    documentPreference.documentBleedTopOffset = "3mm";
    }

function setDocumentSlug(documentPreference) {
    documentPreference.documentSlugUniformSize = false;
    documentPreference.slugBottomOffset = "0mm";
    documentPreference.slugInsideOrLeftOffset = "0mm";
    documentPreference.slugRightOrOutsideOffset = "0mm";
    documentPreference.slugTopOffset = "0mm";
    }

function createGreyBox(page) {
    var parentFrame = page.textFrames.add();
    var color = document.colors.itemByName("color0");

    
    parentFrame.fillColor = color;
    parentFrame.fillTint = 23;
    return parentFrame;
    }

function fillTextFrame(json) {
    var page = getLastPage();
    var greyParentBox = createGreyBox(page);
   
    var textFrame = page.textFrames.add();
    textFrame.geometricBounds = [10, 10, 250, 100];
    
    logMe('Started with text rendering.');
    renderArticleNumber(textFrame, json.articleFormData.catalogData.articleNrInCatalog);
    renderName(textFrame, json.articleFormData.articleData.name);
    renderDescription(textFrame, json.articleFormData.articleData.description);
    renderSize(textFrame, json.articleFormData.articleData.size);
    renderColorAndShape(textFrame, json.articleFormData.articleData.colorAndShape);
    renderSuggestedPrice(textFrame, json.articleFormData.unbrandedArticlePrice.suggestedPrice);
    renderUnbrandedArticlePricesHeader(textFrame)
    renderUnbrandedArticlePrices(textFrame, json.articleFormData.unbrandedArticlePrice.unbrandedArticleScales, page);
    renderPosition(textFrame, json.articleFormData.brandings[0].position);
    renderBrandings(textFrame, json.articleFormData.brandings);
    renderMinimumOrderQuantities(textFrame, json.articleFormData.minimumOrderQuantities);
    textFrame.fit(FitOptions.FRAME_TO_CONTENT);
    logMe('Completed text rendering.');
    
    fitBoxes(textFrame, greyParentBox);
    renderImages(json.articleFormData.images, page, greyParentBox);
    downloadMerchantSpecificImages(json.articleFormData.merchantSpecificFiles);
    }

function fitBoxes(textFrame, greyParentBox) {
    var padding = 3;
    textFrame.move([20 + padding, 20 + padding]);
    greyParentBox.geometricBounds = [20, 20, textFrame.geometricBounds[2] + padding, textFrame.geometricBounds[3] + padding];
    
    }

function sortByCategory(jsons) {
    for(var i = 1; i < jsons.length; i++) {
        var j = i;
        var pos0 = jsons[j-1].articleFormData.catalogData.positionInCatalog;
        var pos1 = jsons[j].articleFormData.catalogData.positionInCatalog;
        while(j > 0 && pos0 > pos1) {
            var temp = jsons[j-1];
            jsons[j-1] = jsons[j];
            jsons[j] = temp;
            j = j - 1;
            }
        }
    }

function executeScript(script) {
       try {
        app.doScript(script, ScriptLanguage.applescriptLanguage);
    }
    catch(e) {
        throw e;
        }
    }