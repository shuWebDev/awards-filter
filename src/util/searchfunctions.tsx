///<reference path='../../typings/app.d.ts'/>
import * as UtilServices from "./util";

// NOTE: our master filtering function, calls more specific functions to do more granular filtering of the data
function generateResultListing (awardData:Services.AwardData<string|number|boolean|object>[], filterBoxText:string, selectedPrograms:string[]) {
  // NOTE: our final result set after all filters applied
  let returnableResultSet:Services.AwardData<string|number|boolean|object>[] = [];
  
  // NOTE: Precedence of search:
  // 1. Left-side Category (Program)
  // 2. Filter Textbox String
  // 3. Amount Range (determined by sliders, coming soon)
  
  // NOTE: filter by category
  
  returnableResultSet = searchByProgram(awardData,selectedPrograms);
  // NOTE: filter those results by text string
  returnableResultSet = searchByText(returnableResultSet,filterBoxText);

  // TODO: filter by award dollar value range

  return returnableResultSet;
}



function searchByProgram(awardData:Services.AwardData<string|number|boolean|object>[], selectedPrograms:string[]) {
  let returnableResultSet:Services.AwardData<string|number|boolean|object>[] = [];

  
  // NOTE: cycle through the records
  //console.log(selectedPrograms.length);
  if(selectedPrograms.length) {
    for(let i=0; i<awardData.length; i++) {
      // NOTE: see if any of our selected programs match what the eligibility program is for this record
      for(let program in selectedPrograms) {
        // NOTE: if we find a match
        if(awardData[i].eligibilityProgram === selectedPrograms[program]) {
          // NOTE: push the record to the result set, stop checking if other programs match, and break out to check the next record 
          returnableResultSet.push(awardData[i]);
          break;
        }
      }
    }
  } else {
    // NOTE: in this case user unchecks all program category boxes, set results back to all records
    returnableResultSet = awardData;
  }

  return returnableResultSet;
}



// NOTE: filter results that contain a (string) property that matches a string from an input box
function searchByText(awardData:Services.AwardData<string|number|boolean|object>[], filterBoxText:string) { 
 // NOTE: our return set
 let returnableResultSet:Services.AwardData<string|number|boolean|object>[] = [];
 filterBoxText = filterBoxText.toLowerCase();

 // NOTE: get the keys for each award record (array of key names as strings)
 for(let i=0; i<awardData.length; i++) {
   let currentRecord:Services.AwardData<string|number|boolean|object> = awardData[i];
   const keys:string[] = Object.keys(currentRecord);
   
   // NOTE: cycle through the list of key names, get their values
   for(let i=0; i<keys.length; i++) {
     let recordProp = UtilServices.prop(currentRecord, keys[i])
     if(typeof recordProp === "string") {
       // NOTE: for filter textbox search, we only care about comparing to string fields in each record, ignore the numbers, booleans, etc
       if(recordProp.toLowerCase().includes(filterBoxText)) {
         // NOTE: if we have a record that contains a field with a match to our filter text, push it to the result set array
         returnableResultSet.push(currentRecord);
         break; // NOTE: break out, we found a match, so we don't include this record again in the result set if multiple fields contain the search string
       } 
     }
   }
 }

 return returnableResultSet; // NOTE: we will end up returning an object array with the records that match what we are looking for
}



export { generateResultListing }
