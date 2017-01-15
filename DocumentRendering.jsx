#include "StringMapping.jsx"


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

function renderPosition(textFrame, position) {
    var text = "Veredelungsfläche: ";
    var font0 = new FontInfo(6, "Helvetica Neue LT Pro	57 Condensed", document.colors.itemByName("Black"));
    
    var firstInsertionPoint = textFrame.parentStory.insertionPoints[-1].index;
    textFrame.parentStory.insertionPoints[-1].contents = "\n";
    setFontAndTextParentStory(text + position, font0, textFrame);
    }

function renderBrandingsHeader(textFrame, page) {
     var text = "Veredelung pro Stück";     
     var font0 = new FontInfo(6, "Helvetica Neue LT Pro	77 Bold Condensed", document.colors.itemByName("Black"));
     textFrame.parentStory.insertionPoints[-1].contents = "\n";
     setFontAndTextParentStory(text, font0, textFrame);
    }

function renderBrandings(textFrame, brandings) {
     textFrame.parentStory.insertionPoints[-1].contents = "\n";
     var font = new FontInfo(7.5, "Helvetica Neue LT Pro	57 Condensed", document.colors.itemByName("Black"));
     
     for(var i = 0; i < brandings.length; i++) {
         var branding = brandings[i];
         renderBrandingEntry(branding, textFrame);
         renderInitialCosts(branding.initialCosts, textFrame);
         renderFilmCosts(branding.filmCosts, textFrame);
         }
    }

function renderBrandingEntry(branding, textFrame) {
    var font0 = new FontInfo(6, "Helvetica Neue LT Pro	57 Condensed", document.colors.itemByName("Black"));
    textFrame.parentStory.insertionPoints[-1].contents = "\n";
    setFontAndTextParentStory(mapBrandingName(branding.name) + ": ", font0, textFrame);
    for(var i = 0; i < branding.scales.length; i++) {
        var scale = branding.scales[i];
        setFontAndTextParentStory(scale.numberOfArticles, font0, textFrame);
        setFontAndTextParentStory(" - " + scale.price, font0, textFrame);
        setFontAndTextParentStory(" / ", font0, textFrame);
        }
    }

function renderInitialCosts(initialCosts, textFrame) {
    textFrame.parentStory.insertionPoints[-1].contents = "\n";
    var font0 = new FontInfo(6, "Helvetica Neue LT Pro	57 Condensed", document.colors.itemByName("Black"));
    setFontAndTextParentStory("Initiale Kosten: " + initialCosts, font0, textFrame);
    }

function renderFilmCosts(filmCosts, textFrame) {
    textFrame.parentStory.insertionPoints[-1].contents = "\n";
    var font0 = new FontInfo(6, "Helvetica Neue LT Pro	57 Condensed", document.colors.itemByName("Black"));
    setFontAndTextParentStory("Beschichtungskosten: " + filmCosts, font0, textFrame);
    }

function renderMinimumOrderQuantities(textFrame, minimumOrderQuantities) {
    var font0 = new FontInfo(6, "Helvetica Neue LT Pro	57 Condensed", document.colors.itemByName("Black"));
    
    if(minimumOrderQuantities.length > 0) {
        textFrame.parentStory.insertionPoints[-1].contents = "\n";
        setFontAndTextParentStory("Mindestbestellmenge: ", font0, textFrame);
        }
    for(var i = 0; i < minimumOrderQuantities.length; i++) {
        var quantity = minimumOrderQuantities[i];
        setFontAndTextParentStory(quantity.condition + " ", font0, textFrame);
        setFontAndTextParentStory(quantity.quantity, font0, textFrame);
        setFontAndTextParentStory(" / ", font0, textFrame);
        }
        textFrame.characters[-1].remove();
        textFrame.characters[-1] .remove();
    }

function setFontAndTextParentStory(text, fontInfo, textFrame) {            
      try {
            var firstInsertionPoint = textFrame.insertionPoints[-1].index;
            
            textFrame.parentStory.insertionPoints[-1].contents = text;
            
            var textRange = textFrame.characters.itemByRange(textFrame.insertionPoints[firstInsertionPoint],
                        textFrame.insertionPoints[-1]);

            textRange.fillColor = fontInfo.fontColor;
            textRange.appliedFont = app.fonts.itemByName(fontInfo.fontName);
            textRange.pointSize = fontInfo.fontSize;
            }
            catch(e) {
                alert (e);
        }
    }

function setFontAndText(text, fontInfo, textFrame) {
    try {
        var firstInsertionPoint = textFrame.insertionPoints[-1].index;
        
        setText(text, textFrame);
        
        var textRange = textFrame.characters.itemByRange(textFrame.insertionPoints[firstInsertionPoint],
                    textFrame.insertionPoints[-1]);

        textRange.fillColor = fontInfo.fontColor;
        textRange.appliedFont = app.fonts.itemByName(fontInfo.fontName);
        textRange.pointSize = fontInfo.fontSize;
        }
        catch(e) {
            alert (e);
        }
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
  /*  var tf2 = textFrame.insertionPoints[-1].textFrames.add();
    tf2.geometricBounds = [tf2.geometricBounds[0], tf2.geometricBounds[1], tf2.geometricBounds[2], textFrame.geometricBounds[3]];
    tf2.textFramePreferences.autoSizingType = AutoSizingTypeEnum.HEIGHT_ONLY;*/
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
          // textFrame.insertionPoints[-1].textFrames.add();
            dup.anchoredObjectSettings.insertAnchoredObject  
            (  
                textFrame.insertionPoints[-1] ,  
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
            // Maybe we need a separator character between the frames
            textFrame.parentStory.insertionPoints[-1].contents = "  ";  
        }
          
        // Remove the frame we built on the spread:  
        frameWithTable.remove();        
    }

function centerInFrame(textFrame) {
    textFrame.paragraphs[0].justification = Justification.CENTER_ALIGN;  
    textFrame.verticalJustification = VerticalJustification.CENTER_ALIGN;
    }