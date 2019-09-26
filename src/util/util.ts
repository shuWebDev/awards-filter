///<reference path='../../typings/app.d.ts'/>


export async function loadAwards():Promise<Services.AwardData<string|number|boolean|object>> {
  // NOTE: relative to local public folder
  return await fetch("/_cs_apps/data/academic-award.json")
  .then((response:any) => {
    return response.json();
  })
  .catch((error: any) => { console.error(error);
    return {};
  });
}

export function populatePrograms(dataToSearch:Services.AwardData<string|number|boolean|object>[]):string[] {
  let extractedProgramList:string[] = [];
  
  dataToSearch.forEach(record => {
    if(record.eligibilityProgram !== "") {
      if(!extractedProgramList.includes(record.eligibilityProgram)) {
        extractedProgramList.push(record.eligibilityProgram);
      }
    }
  });

  extractedProgramList.sort();
  return extractedProgramList;
}



// NOTE: given an object and key, returns the key value
// (needed for type assertion since Object.keys doesn't directly satisfy a type trying to match key value pairs with filter)
export function prop<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
