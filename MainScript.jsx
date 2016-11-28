﻿#include "JsonProcessing.jsx"
#include "DocumentRendering.jsx"
#include "ImageRendering.jsx"
// main code starts here

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

var parentFrame = insertType(0)

var json = parseJson();
if(json != null) {
    fillTextFrame(json, parentFrame);
}


$.writeln("finished");

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
    documentPreference.pagesPerDocument = 9; // just for testing
    return myDocument;
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

function insertType(pageIndex) {
    var page = document.pages.item(0);
    var parentFrame = page.textFrames.add();
    parentFrame.geometricBounds = [6.899, 7.007, 1, 100];
    var color = document.colors.itemByName("color0");
    parentFrame.textFramePreferences.autoSizingType = AutoSizingTypeEnum.HEIGHT_ONLY;
    parentFrame.textFramePreferences.autoSizingReferencePoint = AutoSizingReferenceEnum.TOP_LEFT_POINT;

    
    parentFrame.fillColor = color;
    parentFrame.fillTint = 23;
    return parentFrame;
    }

function fillTextFrame(json, parentFrame) {
    var page = document.pages.item(0);
   
    var textFrame = parentFrame.insertionPoints[-1].textFrames.add();
  //  var textFrame = page.textFrames.add();
    textFrame.geometricBounds = [10, 10, 100, 100];
    textFrame.textFramePreferences.autoSizingType = AutoSizingTypeEnum.HEIGHT_ONLY;
    textFrame.textFramePreferences.autoSizingReferencePoint = AutoSizingReferenceEnum.TOP_LEFT_POINT;
    
 //   textFrame.textFramePreferences.autoSizingType = AutoSizingTypeEnum.HEIGHT_ONLY;
 //   textFrame.textFramePreferences.autoSizingReferencePoint = AutoSizingReferenceEnum.TOP_LEFT_POINT;
    
    renderArticleNumber(textFrame, json.doc.articleFormData.catalogData.articleNrInCatalog);
    renderName(textFrame, json.doc.articleFormData.articleData.name);
    renderDescription(textFrame, json.doc.articleFormData.articleData.description);
    renderSize(textFrame, json.doc.articleFormData.articleData.size);
    renderColorAndShape(textFrame, json.doc.articleFormData.articleData.colorAndShape);
    renderSuggestedPrice(textFrame, json.doc.articleFormData.unbrandedArticlePrice.suggestedPrice);
    renderUnbrandedArticlePricesHeader(textFrame)
    var prevFrame = renderUnbrandedArticlePrices(textFrame, json.doc.articleFormData.unbrandedArticlePrice.unbrandedArticleScales, page);
    prevFrame = renderPosition(textFrame, prevFrame, json.doc.articleFormData.brandings[0].position);
    var brandingsFrame = renderBrandingsHeader(textFrame, prevFrame, page);
    renderBrandings(brandingsFrame, json.doc.articleFormData.brandings);
    renderMinimumOrderQuantities(brandingsFrame, json.doc.articleFormData.minimumOrderQuantities);
    renderImages(json.doc.images);
    //todo fit parent frame
    }