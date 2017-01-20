function mapBrandingName(brandingString) {
   var strArray = brandingString.split(' ');
   
   if(strArray[0] == "print") {
       return buildPrintString(strArray[1]);
       }
   else if(strArray[0] == "additional") {
        return buildAdditionalColorBrandingString()
       }
   else if(strArray[0] == "digital") {
        return buildDigitalPrintString(strArray[2]);
       }
   else if(brandingString == "branding using engraving") {
        return buildBrandingUsingEngravingString(brandingString);
       }
   else if(brandingString == "branding using etching") {
        return buildBrandingUsingEtchingString(brandingString)
       }
   else if(brandingString == "branding using stitching") {
        return buildBrandingUsingEtchingString(brandingString)
       }
   else if(strArray[0] == "user") {
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