# Indesign

Code for product catalog

## Installation

Open the scripts panel in InDesign (Window > Automation > Scripts in CS3 and CS4; or Window > Utilities > Scripts in CS5 or later), then right-click on User. Hold the cmd-Key and double click on User. Now Finder should open. Inside the folder that opens, there is a folder called Scripts. Put your scripts inside that.
Any script inside the Scripts folder will show up immediately in InDesign. No need to restart the program.

Open the "CallMain.jsx" file. The main function has two parameters which need to be adjusted:
- The absolute folder path which contains the json files.
- The absolute folder path where the downloaded images will be stored temporarily. A folder called "image" has to be created, where this path points to. For example, if the path is "Users/admin/desktop", then you have to create the "image" folder at "Users/admin/desktop".

To run the script, click on "CallMain.jsx" in the scripts panel. Indesign should immediately start to create a new document and execute the script.
