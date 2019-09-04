///<reference path='../../typings/app.d.ts'/>

export async function loadAwards():Promise<Services.AwardData> {
  // NOTE: relative to local public folder
  return await fetch("/academic-award.json")
  .then((response:any) => {
    return response.json();
  })
  .catch((error: any) => { console.error("Error loading data from remote.");
  return {};
  });
}

export function populatePrograms(dataToSearch:Services.AwardData[]):string[] {
  let extractedProgramList:string[] = [];
  for(let a in dataToSearch) {
    if(!extractedProgramList.includes(dataToSearch[a].eligibilityProgram)) {
      // NOTE: we don't have this term in the list yet, add it
      extractedProgramList.push(dataToSearch[a].eligibilityProgram);
    }
  }
  return extractedProgramList;
}

// NOTE: converts raw Award Data records into records we can filter
export function convertAwardData(awardData: Services.AwardData[]): Services.AwardDataSearchable[] {
  //console.log(awardData);
  let returnAwardData: Services.AwardDataSearchable[] = [];
  for(let i=0; i<awardData.length; i++) {
    let recordData:Services.AwardDataSearchable = {
      accountType: awardData[i].accountType as string,
      aidType: awardData[i].aidType as string,
      amount: awardData[i].amount as string,
      deadline: awardData[i].deadline as string,
      description: awardData[i].description as string,
      eligibilityProgram: awardData[i].eligibilityProgram as string,
      eligibilityRequirements: awardData[i].eligibilityRequirements as string, 
      name: awardData[i].name as string,
      notes: awardData[i].notes as string,
      renewalRequirements: awardData[i].renewalRequirements as string,
      selectionBody: awardData[i].selectionBody as string,
      studentStatus: (typeof awardData[i].studentStatus !== "undefined")? awardData[i].studentStatus.join() as string : "",
      tags: (typeof awardData[i].tags !== "undefined") ? awardData[i].tags.join() as string : ""
    };
    returnAwardData.push(recordData);
  }
  
  return returnAwardData;
}

// NOTE: given an object and key, returns the key value
// (needed for type assertion since Object.keys doesn't directly satisfy a type trying to match key value pairs with filter)
export function prop<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

