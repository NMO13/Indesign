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
    //return createUnbrandedArticleTable2(textFrame, unbrandedPrices, page);
    return createUnbrandedArticleTable(textFrame, unbrandedPrices, page);
    }

function renderBrandingsHeader(textFrame, prevFrame, page) {
     newLine(textFrame);
     var text = "Veredelung pro Stück";
     
     var brandingsFrame = page.textFrames.add();
     brandingsFrame.geometricBounds = [prevFrame.geometricBounds[0] + 5, textFrame.geometricBounds[1], prevFrame.geometricBounds[0] + 200, textFrame.geometricBounds[3]];     
     
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
         renderBrandingEntry(branding, brandingsFrame)
         newLine(brandingsFrame);
         }
     
     //brandingsFrame.fit(FitOptions.FRAME_TO_CONTENT);
    }

function renderBrandingEntry(branding, brandingsFrame) {
    var font0 = new FontInfo(6, "Helvetica Neue LT Pro	57 Condensed", document.colors.itemByName("Black"));
    setFontAndText(branding.name + ": ", font0, brandingsFrame);
    for(var i = 0; i < branding.scales.length; i++) {
        var scale = branding.scales[i];
        setFontAndText(scale.numberOfArticles, font0, brandingsFrame);
        setFontAndText(" - " + scale.price, font0, brandingsFrame);
        setFontAndText(" / ", font0, brandingsFrame);
        }
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

/*function createUnbrandedArticleTable(textFrame, unbrandedPrices, page) {
    var tf2 = textFrame.insertionPoints[-1].textFrames.add();
    var bounds = tf2.geometricBounds;
    
    var coords = [bounds[0], bounds[1]];
    
    var startX = bounds[1];
    
    coords[0] += 1;
    tf2.remove();
    
    var lastTextFrame = null;
    for(var i = 0; i < 2; i++) {
        createCell(textFrame, page, coords);
    }
    return lastTextFrame;
    }*/

function createUnbrandedArticleTable(textFrame, unbrandedPrices, page) {
    var tf2 = textFrame.insertionPoints[-1].textFrames.add();
    var bounds = tf2.geometricBounds;
    
    var coords = [bounds[0], bounds[1]];
    
    var startX = bounds[1];
    
    coords[0] += 1;
    tf2.remove();
    
    var lastTextFrame = null;
    for(var i = 0; i < unbrandedPrices.length; i++) {
            createHead(coords, page, unbrandedPrices[i].numberOfArticles);
            coords[0] += 4;
            lastTextFrame = createBody(coords, page, unbrandedPrices[i].price);
            
            if((i + 1) % 5 == 0) {
                 coords[0] += 4;
                 coords[0] += 1;
                 coords[1] = startX;
                }
            else {
                coords[0] -= 4;
                coords[1] += 17;
            }
        
        }
    return lastTextFrame;
    }

function createCell(textFrame, page, coords) {
    //textFrame.geometricBounds = [coords[0], coords[1], coords[0] + 12, coords[1]+ 16];
    var tf = textFrame.insertionPoints[-1].textFrames.add();
    
    tf.textFramePreferences.autoSizingType = AutoSizingTypeEnum.HEIGHT_AND_WIDTH;
    var table = tf.tables.add();
    
    table.bodyRowCount = 2;
    table.columnCount = 1;
    table.width = 16;
    
    table.rows[0].autoGrow = false;
    table.rows[1].autoGrow = false;
    table.rows[0].height = 2;
    table.rows[1].height = 2;
    }

function createUnbrandedArticleTable2(textFrame, unbrandedPrices, page) {
    var table = textFrame.tables.add(LocationOptions.AFTER);
    table.bodyRowCount = 2;
    table.columnCount = 1;
    table.width = 10;
    table.height = 5;
    
    table.cells.everyItem().properties = {
        topInset:"1mm", bottomInset:"1.5mm",
        leftEdgeStrokeColor:document.colors.itemByName("Paper"),
        rightEdgeStrokeColor:document.colors.itemByName("Paper"),
        bottomEdgeStrokeColor:document.colors.itemByName("Paper"),
        topEdgeStrokeColor:document.colors.itemByName("Paper")
};
    
    table.cells[0].texts[0].contents = "hudriwoep";
    table.cells[1].texts[0].contents = "hudriwoep";
    return textFrame;
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
    textFrame.textFramePreferences.verticalJustification = VerticalJustification.CENTER_ALIGN;
    }