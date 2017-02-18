function mapBrandingName(brandingString) {
   var strArray = brandingString.split(' ');
   
   if(strArray[0] == "print") {
       return buildPrintString(strArray[1]);
       }
   else if(strArray[1] == "print") {
       return buildPrintString(strArray[0]);
       }
   else if(strArray[0] == "additional") {
        return buildAdditionalColorBrandingString()
       }
   else if(strArray[0] == "digital") {
        return buildDigitalPrintString(strArray[2]);
       }
   else if(strArray[1] == "digital") {
        return buildDigitalPrintString(strArray[0]);
       }
   else if(brandingString == "engraving") {
        return buildBrandingUsingEngravingString(brandingString);
       }
   else if(brandingString == "etching") {
        return buildBrandingUsingEtchingString(brandingString)
       }
   else if(brandingString == "stitching") {
        return buildBrandingUsingStitchingString(brandingString)
       }
   else if(strArray[0] == "user-defined") {
        return buildUserDefinedBrandingString(strArray[3]);
       }
   else
   return "Unbekannt";
}

function buildPrintString(number) {
    return "Druck " + number;
    }

function buildAdditionalColorBrandingString() {
    return "Zusätzliche Farbkosten";
    }

function buildDigitalPrintString(number) {
    return "Digitaldruck " + number;
}

function buildBrandingUsingEngravingString(brandingString) {
   return "Veredelung mittels Gravur";
    }

function buildBrandingUsingEtchingString(brandingString) {
   return "Veredelung mittels Ätzen";
    }

function buildBrandingUsingStitchingString(brandingString) {
   return "Veredelung mittels Nähen";
    }

function buildUserDefinedBrandingString(number) {
    return "Benutzerdefinierte Veredelung " + number;
    }