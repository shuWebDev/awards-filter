///<reference path='../../typings/app.d.ts'/>
import * as UtilServices from "./util";

// NOTE: our master filtering function, calls more specific functions to do more granular filtering of the data
function generateResultListing (awardData:Services.AwardData[], filterBoxText:string, selectedPrograms:string[], minAwardAmount:number) {
  // NOTE: our final result set after all filters applied
  let returnableResultSet:Services.AwardData[] = awardData;
  
  // NOTE: Precedence of search:
  // 1. Left-side Category (Program)
  // 2. Filter Textbox String
  // 3. Amount
  
  // NOTE: filter by category
  if(selectedPrograms.length) {
    //console.log("filter by program ran");
    returnableResultSet = searchByProgram(awardData,selectedPrograms);
  }
  // NOTE: filter by minimum amount 
  if(minAwardAmount > 0) {
    //console.log("filter by amount ran");
    returnableResultSet = searchByAmount(returnableResultSet, minAwardAmount);
  }

  // NOTE: filter those results by text string
  if(filterBoxText.length) {
    //console.log("filter by filterboxtext ran");
    returnableResultSet = searchByText(returnableResultSet,filterBoxText);
  }

  return returnableResultSet;
}



function searchByProgram(awardData:Services.AwardData[], selectedPrograms:string[]) {
  let returnableResultSet:Services.AwardData[] = [];

  
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



// NOTE: filter results that contain a (string) property that matches a string from an input box. UtilServices.prop is utilized here to properly get the value from a given key in an object to satisfy the type checker

function searchByText(awardData: Services.AwardData[], filterBoxText: string): Services.AwardData[] {
  let t0 = performance.now();
  let resultSet: Services.AwardData[] = [];

  for(let item in awardData) {
    const keys: string[] = Object.keys(awardData[item]);
    for(let i=0; i<keys.length; i++) {
      if(typeof keys[i] === "string") {
        let prop:string = UtilServices.prop(awardData[item],keys[i]);
        if(prop.toString().toUpperCase().includes(filterBoxText.toUpperCase())) {
          if(!resultSet.includes(awardData[item])) {
            resultSet.push(awardData[item]);
          }
        }
      }
    }
  }
  let t1 = performance.now();
  console.log(`searchByText took ${t1-t0} milliseconds to complete.`);
  return resultSet;
}




function searchByAmount(awardData:Services.AwardData[], minAwardAmount:number) {
  let returnableResultSet:Services.AwardData[] = []; 

  for(let i=0; i<awardData.length; i++) {
    // NOTE: value is a string that can either be numeric or "variable"
    
    // NOTE: if the value is a number, test if it fits what we need
    if(typeof awardData[i].amount === "number") {
      if(parseInt(awardData[i].amount) >= minAwardAmount) {
        returnableResultSet.push(awardData[i]);
      }
    } else {
      // NOTE: add the variable ones in too if they are the same category, they still may be relevant
      if(typeof awardData[i].amount === "string") {
        returnableResultSet.push(awardData[i]);
      }
    } 
  }

  return returnableResultSet;
}


export { generateResultListing }
