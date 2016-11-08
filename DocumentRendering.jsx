﻿#include "StringMapping.jsx"


function renderDescription(textFrame, description) {
    var font = new FontInfo(7.5, "Helvetica Neue LT Pro	57 Condensed", document.colors.itemByName("Black"));
    setFontAndText(description, font, textFrame);
    newLine(textFrame);
    }

function renderName(textFrame, name) {
    var font = new FontInfo(11, "Helvetica Neue LT Pro	77 Bold Condensed", document.colors.itemByName("Black"));
    setFontAndText(name, font, textFrame);
    newLine(textFrame);
    }

function renderSize(textFrame, size) {
    newLine(textFrame);
    var text = "Maße/Größe(n) ";    
    var font = new FontInfo(7.5, "Helvetica Neue LT Pro	57 Condensed", document.colors.itemByName("Black"));
    setFontAndText(text + size, font, textFrame);
    newLine(textFrame);
    }

function renderColorAndShape(textFrame, cas) {
    newLine(textFrame);
    var text = "Farben: ";
    var font = new FontInfo(7.5, "Helvetica Neue LT Pro	57 Condensed", document.colors.itemByName("Black"));
    setFontAndText(text + cas, font, textFrame);
    newLine(textFrame);
    }

function renderSuggestedPrice(textFrame, suggestedPrice) {
    var text = "Richtpreis: ";
    var font = new FontInfo(7.5, "Helvetica Neue LT Pro	57 Condensed", document.colors.itemByName("Black"));
    setFontAndText(text + suggestedPrice, font, textFrame);
    newLine(textFrame);
    }

function renderArticleNumber(textFrame, articleNumber) {
    var font0 = new FontInfo(10, "Helvetica Neue LT Pro	77 Bold Condensed", document.colors.itemByName("Paper"));
    setFontAndText("> 1.0", font0, textFrame);
    
    var font1 = new FontInfo(10, "Helvetica Neue LT Pro	77 Bold Condensed", document.colors.itemByName("Black"));
    setFontAndText("    ", font1, textFrame);
    
    var font2 = new FontInfo(7.5, "Helvetica Neue LT Pro	77 Bold Condensed", document.colors.itemByName("Black"));
    setFontAndText(articleNumber, font2, textFrame);
    
    newLine(textFrame);
    }

function renderUnbrandedArticlePricesHeader(textFrame) {
    newLine(textFrame);
    var text = "Staffel & Stück-Preise:";
    var font0 = new FontInfo(6, "Helvetica Neue LT Pro	77 Bold Condensed", document.colors.itemByName("Black"));
    setFontAndText(text, font0, textFrame);
    }

function renderUnbrandedArticlePrices(textFrame, unbrandedPrices, page) {
    newLine(textFrame);
    return createUnbrandedArticleTable(textFrame, unbrandedPrices, page);
    }

function renderPosition(textFrame, prevFrame, position) {
    var text = "Veredelungsfläche: ";
    
    var brandingsFrame =  textFrame.insertionPoints[-1].textFrames.add();
    brandingsFrame.geometricBounds = [prevFrame.geometricBounds[2], textFrame.geometricBounds[1], prevFrame.geometricBounds[2] + 20, textFrame.geometricBounds[3]];     
    brandingsFrame.textFramePreferences.autoSizingType = AutoSizingTypeEnum.HEIGHT_ONLY;
    brandingsFrame.textFramePreferences.autoSizingReferencePoint = AutoSizingReferenceEnum.TOP_LEFT_POINT;
    var font = new FontInfo(7.5, "Helvetica Neue LT Pro	57 Condensed", document.colors.itemByName("Black"));
    setFontAndText(text  + position, font, brandingsFrame);
    return brandingsFrame; 
    }

function renderBrandingsHeader(textFrame, prevFrame, page) {
     var text = "Veredelung pro Stück";
     
     var brandingsFrame =  textFrame.insertionPoints[-1].textFrames.add();
     brandingsFrame.geometricBounds = [prevFrame.geometricBounds[2] + 50, textFrame.geometricBounds[1], prevFrame.geometricBounds[2] + 200, textFrame.geometricBounds[3]];     
     
     brandingsFrame.textFramePreferences.autoSizingType = AutoSizingTypeEnum.HEIGHT_ONLY;
     brandingsFrame.textFramePreferences.autoSizingReferencePoint = AutoSizingReferenceEnum.TOP_LEFT_POINT;
     
     
     
     var font0 = new FontInfo(6, "Helvetica Neue LT Pro	77 Bold Condensed", document.colors.itemByName("Black"));
     setFontAndText(text, font0, brandingsFrame);
     return brandingsFrame;
    }

function renderBrandings(brandingsFrame, brandings) {
     newLine(brandingsFrame);
     var font = new FontInfo(7.5, "Helvetica Neue LT Pro	57 Condensed", document.colors.itemByName("Black"));
     
     for(var i = 0; i < brandings.length; i++) {
         var branding = brandings[i];
         renderBrandingEntry(branding, brandingsFrame);
         renderInitialCosts(branding.initialCosts, brandingsFrame);
         renderFilmCosts(branding.filmCosts, brandingsFrame);
         }
    }

function renderBrandingEntry(branding, brandingsFrame) {
    var font0 = new FontInfo(6, "Helvetica Neue LT Pro	57 Condensed", document.colors.itemByName("Black"));
    setFontAndText(mapBrandingName(branding.name) + ": ", font0, brandingsFrame);
    for(var i = 0; i < branding.scales.length; i++) {
        var scale = branding.scales[i];
        setFontAndText(scale.numberOfArticles, font0, brandingsFrame);
        setFontAndText(" - " + scale.price, font0, brandingsFrame);
        setFontAndText(" / ", font0, brandingsFrame);
        }
    newLine(brandingsFrame);
    }

function renderInitialCosts(initialCosts, brandingsFrame) {
    var font0 = new FontInfo(6, "Helvetica Neue LT Pro	57 Condensed", document.colors.itemByName("Black"));
    setFontAndText("Initiale Kosten: " + initialCosts, font0, brandingsFrame);
    newLine(brandingsFrame);
    }

function renderFilmCosts(filmCosts, brandingsFrame) {
    var font0 = new FontInfo(6, "Helvetica Neue LT Pro	57 Condensed", document.colors.itemByName("Black"));
    setFontAndText("Beschichtungskosten: " + filmCosts, font0, brandingsFrame);
    newLine(brandingsFrame);
    }

function renderMinimumOrderQuantities(brandingsFrame, minimumOrderQuantities) {
    var font0 = new FontInfo(6, "Helvetica Neue LT Pro	57 Condensed", document.colors.itemByName("Black"));
    
    if(minimumOrderQuantities.length > 0) {
        newLine(brandingsFrame);
        setFontAndText("Mindestbestellmenge: ", font0, brandingsFrame);
        }
    for(var i = 0; i < minimumOrderQuantities.length; i++) {
        var quantity = minimumOrderQuantities[i];
        setFontAndText(quantity.condition + " ", font0, brandingsFrame);
        setFontAndText(quantity.quantity, font0, brandingsFrame);
        setFontAndText(" / ", font0, brandingsFrame);
        }
        brandingsFrame.characters[-1].remove();
        brandingsFrame.characters[-1] .remove();
    }

function setFontAndText(text, fontInfo, textFrame) {
    var firstInsertionPoint = textFrame.insertionPoints[-1].index;
    
    setText(text, textFrame);
    
    var textRange = textFrame.characters.itemByRange(textFrame.insertionPoints[firstInsertionPoint],
                textFrame.insertionPoints[-1]);

    textRange.fillColor = fontInfo.fontColor;
    textRange.appliedFont = app.fonts.itemByName(fontInfo.fontName);
    textRange.pointSize = fontInfo.fontSize;
    }

function setText(text, textFrame) {
    textFrame.contents += text;
    }

function newLine(textFrame) {
    textFrame.contents += "\n";
    }


function FontInfo(fontSize, fontName, fontColor) {
    this.fontSize = fontSize;
    this.fontName = fontName;
    this.fontColor = fontColor;
    }

function createUnbrandedArticleTable(textFrame, unbrandedPrices, page) {
    var tf2 = textFrame.insertionPoints[-1].textFrames.add();
    tf2.geometricBounds = [tf2.geometricBounds[0], tf2.geometricBounds[1], tf2.geometricBounds[2], textFrame.geometricBounds[3]];
    tf2.textFramePreferences.autoSizingType = AutoSizingTypeEnum.HEIGHT_ONLY;
    
    var lastTextFrame = null;
    createCell(tf2, unbrandedPrices);
   
    return tf2;
    }

function createCell(textFrame, unbrandedPrices) {
        // Let's build a text frame with a table somewhere on the spread:  
        var frameWithTable = app.documents[0].layoutWindows[0].activeSpread.textFrames.add  
        (  
            {  
                geometricBounds : [0,0,100,16],  
                strokeWidth : 0,  
                strokeColor : "None",  
                fillColor : "None" 
            }  
        );  
          
        // Adding a table:  
        
        var table = frameWithTable.insertionPoints[0].tables.add();
       // table.rows.everyItem().autoGrow = false;
        table.bodyRowCount = 2;
        table.columnCount = 1;
        table.width = 12;
        table.height = 7;
        table.rows.everyItem().bottomEdgeStrokeColor = "Paper";
        table.rows.everyItem().topEdgeStrokeColor = "Paper";
        table.rows.everyItem().leftEdgeStrokeColor = "Paper";
        table.rows.everyItem().rightEdgeStrokeColor = "Paper";
        
        table.rows.everyItem().bottomEdgeStrokeWeight = 0.5;
        table.rows.everyItem().topEdgeStrokeWeight = 0.5;
        table.rows.everyItem().leftEdgeStrokeWeight = 0.5;
        table.rows.everyItem().rightEdgeStrokeWeight = 0.5;
          
        // Let's fit the frame to the table:  
        frameWithTable.fit(FitOptions.FRAME_TO_CONTENT);  
          
        // Duplicate and anchor the duplicates to the selected text frame:  
        for(var i=0;i<unbrandedPrices.length;i++)  
        {  
            var dup = frameWithTable.duplicate();  
            dup.anchoredObjectSettings.insertAnchoredObject  
            (  
                textFrame.parentStory.insertionPoints[-1] ,  
                AnchorPosition.INLINE_POSITION  
            );
            
            var cell = dup.tables[0].rows[0].cells[0];
            var font = new FontInfo(6, "Helvetica Neue LT Pro	57 Condensed", document.colors.itemByName("Black"));
            setFontAndText(unbrandedPrices[i].numberOfArticles, font, cell);
            centerInFrame(cell);
            
            cell.topInset = 0;
            cell.rightInset = 0;
            cell.leftInset = 0;
            cell.bottomInset = 0;
            
            cell = dup.tables[0].rows[1].cells[0];
            font = new FontInfo(6, "Helvetica Neue LT Pro	77 Bold Condensed", document.colors.itemByName("Black"));
            setFontAndText(unbrandedPrices[i].price, font, cell);
            centerInFrame(cell);
            
            cell.topInset = 0;
            cell.rightInset = 0;
            cell.leftInset = 0;
            cell.bottomInset = 0;
            
            dup.fit(FitOptions.FRAME_TO_CONTENT); 
            // Maybe we need a separator character between the frames?  
            textFrame.parentStory.insertionPoints[-1].contents = "  ";  
        }  
          
        // Remove the frame we built on the spread:  
        frameWithTable.remove();  
    }

function createHead(coords, page, number) {
    var tf1 = page.textFrames.add();
    
    tf1.geometricBounds = [coords[0], coords[1], coords[0] + 4, coords[1]+ 16];
    var font = new FontInfo(6, "Helvetica Neue LT Pro	57 Condensed", document.colors.itemByName("Black"));
 
    setFontAndText(number, font, tf1);
    centerInFrame(tf1);
    }

function createBody(coords, page, price) {
    var tf1 = page.textFrames.add();
    
    tf1.geometricBounds = [coords[0], coords[1], coords[0] + 4, coords[1]+ 16];

    var font = new FontInfo(6, "Helvetica Neue LT Pro	57 Condensed", document.colors.itemByName("Black"));
    setFontAndText(price, font, tf1);
    centerInFrame(tf1);
    return tf1;
    }

function centerInFrame(textFrame) {
    textFrame.paragraphs[0].justification = Justification.CENTER_ALIGN;  
    textFrame.verticalJustification = VerticalJustification.CENTER_ALIGN;
    }