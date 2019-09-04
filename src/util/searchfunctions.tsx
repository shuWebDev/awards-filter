///<reference path='../../typings/app.d.ts'/>
import * as UtilServices from "./util";

// NOTE: our master filtering function, calls more specific functions to do more granular filtering of the data
function generateResultListing (awardData:Services.AwardDataSearchable[], filterBoxText:string, selectedProgram?:string) {
  // NOTE: our final result set after all filters applied
  let returnableResultSet:Services.AwardDataSearchable[] = [];
  // NOTE: filter by text string
  returnableResultSet = searchByText(awardData,filterBoxText);
  // TODO: filter by Program/Category
  // TODO: filter by award dollar value range

  return returnableResultSet;
}

// NOTE: filter results that contain a (string) property that matches a string from an input box
function searchByText(awardData:Services.AwardDataSearchable[], filterBoxText:string, selectedProgram?:string) {
 // NOTE: our return set
 let returnableResultSet:Services.AwardDataSearchable[] = [];
 filterBoxText = filterBoxText.toLowerCase();

 // NOTE: get the keys for each award record (array of key names as strings)
 for(let i=0; i<awardData.length; i++) {
   let currentRecord:Services.AwardDataSearchable = awardData[i];
   const keys:any = Object.keys(currentRecord);
   
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
