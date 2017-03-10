#include "StringMapping.jsx"


function renderDescription(textFrame, description) {
    var font = new FontInfo(7.5, "Helvetica Neue LT Pro	57 Condensed", document.colors.itemByName("Black"));
    setFontAndText(description, font, textFrame, 8);
    setFontAndText("\n", font, textFrame, 8);
    }

function renderName(textFrame, name) {
    var font = new FontInfo(11, "Helvetica Neue LT Pro	77 Bold Condensed", document.colors.itemByName("Black"));
    setFontAndText(name, font, textFrame, 14);
    newLine(textFrame);
    }

function renderSize(textFrame, size) {
    newLine(textFrame);
    var text = "Maße/Größe(n): ";    
    var font = new FontInfo(7.5, "Helvetica Neue LT Pro	57 Condensed", document.colors.itemByName("Black"));
    setFontAndText(text + size, font, textFrame, 8);
    newLine(textFrame);
    }

function renderColorAndShape(textFrame, cas) {
    var text = "Farben: ";
    var font = new FontInfo(7.5, "Helvetica Neue LT Pro	57 Condensed", document.colors.itemByName("Black"));
    setFontAndText(text + cas, font, textFrame, 8);
    newLine(textFrame);
    }

function renderSuggestedPrice(textFrame, suggestedPrice) {
    var text = "Richtpreis: ";
    var font = new FontInfo(7.5, "Helvetica Neue LT Pro	57 Condensed", document.colors.itemByName("Black"));
    if(suggestedPrice != "") {
        setFontAndText(text + suggestedPrice + " €", font, textFrame, 8);
        }
    else {
        setFontAndText(text, font, textFrame, 8);
        }
    newLine(textFrame);
    }

function renderArticleNumber(textFrame, articleNumber) {
    var font0 = new FontInfo(10, "The Sans Bold-	Bold Plain", document.colors.itemByName("Paper"));
    setFontAndText("> 1.0", font0, textFrame, 15.21);
    
    var font1 = new FontInfo(10, "Helvetica Neue LT Pro	77 Bold Condensed", document.colors.itemByName("Black"));
    setFontAndText("    ", font1, textFrame, 15.21);
    
    var font2 = new FontInfo(7.5, "Helvetica Neue LT Pro	77 Bold Condensed", document.colors.itemByName("Black"));
    setFontAndText(articleNumber, font2, textFrame, 14);
    
    newLine(textFrame);
    }

function renderUnbrandedArticlePricesHeader(textFrame) {
    var font2 = new FontInfo(6, "Helvetica Neue LT Pro	47 Light Condensed", document.colors.itemByName("Black"));
    setFontAndText("\n", font2, textFrame, 7);
    
    var text = "Staffel & Stück-Preise:";
    var font0 = new FontInfo(6, "Helvetica Neue LT Pro	77 Bold Condensed", document.colors.itemByName("Black"));
    setFontAndText(text, font0, textFrame, 7);
    }

function renderUnbrandedArticlePrices(textFrame, unbrandedPrices, page) {
    newLine(textFrame);
    createUnbrandedArticleTable(textFrame, unbrandedPrices, page);
    }

function renderPosition(textFrame, position) {
    var font0 = new FontInfo(6, "Helvetica Neue LT Pro	57 Condensed", document.colors.itemByName("Black"));
    setFontAndTextParentStory("\n", font0, textFrame, 7);
    var text = "Veredelungsfläche: ";
    setFontAndTextParentStory(text + position, font0, textFrame, 7);
    }

function renderBrandingsHeader(textFrame) {
     var text = "Veredelung pro Stück:";     
     var font0 = new FontInfo(6, "Helvetica Neue LT Pro	77 Bold Condensed", document.colors.itemByName("Black"));
     textFrame.parentStory.insertionPoints[-1].contents = "\n";
     setFontAndTextParentStory(text, font0, textFrame, 7);
    }

function renderPositionAndBrandings(textFrame, brandings, position) {
    var font0 = new FontInfo(6, "Helvetica Neue LT Pro	77 Light Condensed", document.colors.itemByName("Black"));
    setFontAndTextParentStory("\n", font0, textFrame, 7);
    
     var brandingsHeaderAlreadyRendered = false;
     if(position != "") {
         renderBrandingsHeader(textFrame);
         renderPosition(textFrame, position);
         brandingsHeaderAlreadyRendered = true;
         }
     for(var i = 0; i < brandings.length; i++) {
         var branding = brandings[i];
         brandingsHeaderAlreadyRendered= renderBrandingEntry(branding, textFrame, brandingsHeaderAlreadyRendered);
         if(branding.initialCosts != '') {
            renderInitialCosts(branding.initialCosts, textFrame);
            if(brandingsHeaderAlreadyRendered == false) {
                renderBrandingsHeader(textFrame);
                brandingsHeaderAlreadyRendered = true;
            }
         }
            
         if(branding.filmCosts != '') {
            renderFilmCosts(branding.filmCosts, textFrame);
            if(brandingsHeaderAlreadyRendered == false) {
                renderBrandingsHeader(textFrame);
                brandingsHeaderAlreadyRendered = true;
            }

         }
     }
    }

function renderBrandingEntry(branding, textFrame, brandingsHeaderAlreadyRendered) {
    var font0 = new FontInfo(6, "Helvetica Neue LT Pro	57 Condensed", document.colors.itemByName("Black"));
    
    var brandingNameAlreadyRendered = false;
    var atLeastOneItemRendered = false;
    for(var i = 0; i < branding.scales.length; i++) {
        var scale = branding.scales[i];
        if(scale.numberOfArticles == "" && scale.price == "")
            continue;
            
        if(brandingsHeaderAlreadyRendered == false) {
            renderBrandingsHeader(textFrame);
            brandingsHeaderAlreadyRendered = true;
            }
        if(brandingNameAlreadyRendered == false) {
            textFrame.parentStory.insertionPoints[-1].contents = "\n";
            setFontAndTextParentStory(mapBrandingName(branding.name) + ": ", font0, textFrame, 7);
            brandingNameAlreadyRendered = true;
            }
        atLeastOneItemRendered = true;
        setFontAndTextParentStoryWithThousandsSeparator(scale.numberOfArticles, font0, textFrame, 7);
        setFontAndTextParentStory(" – " + scale.price + " €", font0, textFrame, 7);
        setFontAndTextParentStory(" / ", font0, textFrame, 7);
        }
    if(atLeastOneItemRendered == true) {
        textFrame.characters[-1] .remove();
        textFrame.characters[-1] .remove();
        }
    return brandingsHeaderAlreadyRendered;
    }

function renderInitialCosts(initialCosts, textFrame) {
    textFrame.parentStory.insertionPoints[-1].contents = "\n";
    var font0 = new FontInfo(6, "Helvetica Neue LT Pro	57 Condensed", document.colors.itemByName("Black"));
    setFontAndTextParentStory("Initiale Kosten: " + initialCosts + " €", font0, textFrame, 7);
    }

function renderFilmCosts(filmCosts, textFrame) {
    textFrame.parentStory.insertionPoints[-1].contents = "\n";
    var font0 = new FontInfo(6, "Helvetica Neue LT Pro	57 Condensed", document.colors.itemByName("Black"));
    setFontAndTextParentStory("Beschichtungskosten: " + filmCosts + " €", font0, textFrame, 7);
    }

function renderMinimumOrderQuantities(textFrame, minimumOrderQuantities) {
    var font0 = new FontInfo(6, "Helvetica Neue LT Pro	57 Condensed", document.colors.itemByName("Black"));
    
    var minimumOQTitleAlreadyRendered = false;
    var atLeastOneQuantityPresent = false;
    for(var i = 0; i < minimumOrderQuantities.length; i++) {
        var quantity = minimumOrderQuantities[i];
        
        if(quantity.condition == '' && quantity.quantity == '') {
                continue;
            }
        
        if(minimumOQTitleAlreadyRendered == false) {
            textFrame.parentStory.insertionPoints[-1].contents = "\n";
            setFontAndTextParentStory("Mindestbestellmenge: ", font0, textFrame, 7);
            minimumOQTitleAlreadyRendered = true;
            }
        setFontAndTextParentStory(quantity.condition + " ", font0, textFrame, 7);
        setFontAndTextParentStoryWithThousandsSeparator(quantity.quantity, font0, textFrame, 7);
        setFontAndTextParentStory(" / ", font0, textFrame, 7);
        atLeastOneQuantityPresent = true;
        }
        if(atLeastOneQuantityPresent == true) {
            textFrame.characters[-1].remove();
            textFrame.characters[-1] .remove();
        }
    }

function setFontAndTextParentStory(text, fontInfo, textFrame, leadingVal) {            
      try {
            var firstInsertionPoint = textFrame.insertionPoints[-1].index;
            
            textFrame.parentStory.insertionPoints[-1].contents = text;
            
            var textRange = textFrame.characters.itemByRange(textFrame.insertionPoints[firstInsertionPoint],
                        textFrame.insertionPoints[-1]);
            textRange.tracking = 30;
            textRange.leading = leadingVal;

            textRange.fillColor = fontInfo.fontColor;
            textRange.appliedFont = app.fonts.itemByName(fontInfo.fontName);
            textRange.pointSize = fontInfo.fontSize;
            }
            catch(e) {
                alert (e);
        }
    }

function setFontAndTextParentStoryWithThousandsSeparator(text, fontInfo, textFrame, leadingVal) {            
      try {
            var firstInsertionPoint = textFrame.insertionPoints[-1].index;
            
            var wert = parseInt(text);
            if(!isNaN(wert)) {
                text = wert.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                }
            
            textFrame.parentStory.insertionPoints[-1].contents = text;
            
            var textRange = textFrame.characters.itemByRange(textFrame.insertionPoints[firstInsertionPoint],
                        textFrame.insertionPoints[-1]);
            textRange.tracking = 30;
            textRange.leading = leadingVal;

            textRange.fillColor = fontInfo.fontColor;
            textRange.appliedFont = app.fonts.itemByName(fontInfo.fontName);
            textRange.pointSize = fontInfo.fontSize;
            }
            catch(e) {
                alert (e);
        }
    }

function setFontAndText(text, fontInfo, textFrame, leadingVal) {
    try {
        var firstInsertionPoint = textFrame.insertionPoints[-1].index;
        
        setText(text, textFrame);
        
        var textRange = textFrame.characters.itemByRange(textFrame.insertionPoints[firstInsertionPoint],
                    textFrame.insertionPoints[-1]);
        textRange.tracking = 30;
        textRange.leading = leadingVal;

        textRange.fillColor = fontInfo.fontColor;
        textRange.appliedFont = app.fonts.itemByName(fontInfo.fontName);
        textRange.pointSize = fontInfo.fontSize;
        }
        catch(e) {
            alert (e);
        }
    }

function setFontAndTextWithThousandsSeparator(text, fontInfo, textFrame, leadingVal) {
    var wert = parseInt(text);
    if(!isNaN(wert)) {
        text = wert.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }
    setFontAndText (text, fontInfo, textFrame, leadingVal);
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
    createCell(textFrame, unbrandedPrices);
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
        
        table.bodyRowCount = 2;
        table.columnCount = 1;
        table.width = 13;
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
          
        var firstInsertionPoint = textFrame.insertionPoints[-1].index;
        // Duplicate and anchor the duplicates to the selected text frame:  
        for(var i=0;i<unbrandedPrices.length;i++)  
        {
            if(unbrandedPrices[i].numberOfArticles == "" || unbrandedPrices[i].price == "")
                continue;
            var dup = frameWithTable.duplicate();  
           //textFrame.insertionPoints[-1].textFrames.add();
            dup.anchoredObjectSettings.insertAnchoredObject  
            (  
                textFrame.parentStory.insertionPoints[-1] ,  
                AnchorPosition.INLINE_POSITION  
            );
            
            var cell = dup.tables[0].rows[0].cells[0];
            var font = new FontInfo(6, "Helvetica Neue LT Pro	57 Condensed", document.colors.itemByName("Black"));
            setFontAndTextWithThousandsSeparator(unbrandedPrices[i].numberOfArticles, font, cell, 8.5);
            centerInFrame(cell);
            
            cell.topInset = 0;
            cell.rightInset = 0;
            cell.leftInset = 0;
            cell.bottomInset = 0;
            
            cell = dup.tables[0].rows[1].cells[0];
            font = new FontInfo(6, "Helvetica Neue LT Pro	77 Bold Condensed", document.colors.itemByName("Black"));
            setFontAndText(unbrandedPrices[i].price + ' €', font, cell, 8.5);
            centerInFrame(cell);
            
            cell.topInset = 0;
            cell.rightInset = 0;
            cell.leftInset = 0;
            cell.bottomInset = 0;
            
            dup.fit(FitOptions.FRAME_TO_CONTENT); 
            // Maybe we need a separator character between the frames
            textFrame.parentStory.insertionPoints[-1].contents = "  ";  
        }
        var textRange = textFrame.characters.itemByRange(textFrame.insertionPoints[firstInsertionPoint],
                    textFrame.insertionPoints[-1]);
        textRange.leading = 25;
          
        // Remove the frame we built on the spread:  
        frameWithTable.remove(); 
    }

function centerInFrame(textFrame) {
    textFrame.paragraphs[0].justification = Justification.CENTER_ALIGN;  
    textFrame.verticalJustification = VerticalJustification.CENTER_ALIGN;
    }