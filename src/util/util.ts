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

export function paginateResults(array:Services.AwardData<string|number|boolean|object>[], chunkSize:number):Services.AwardData<string|number|boolean|object>[][] {

  let result:Services.AwardData<string|number|boolean|object>[][] = [[]];
  
  for(let i=0; i<array.length; i++) {
    const last = result[result.length - 1];
    if(!last || last.length === chunkSize) {
      result.push([array[i]]);
    } else {
      last.push(array[i]);
    }
  }

  return result;
}


// NOTE: given an object and key, returns the key value
// (needed for type assertion since Object.keys doesn't directly satisfy a type trying to match key value pairs with filter)
export function prop<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
