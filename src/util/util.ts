///<reference path='../../typings/app.d.ts'/>


export async function loadAwards<T extends object>(url: string):Promise<T> {
  // NOTE: relative to local public folder
  return await fetch(url)
  .then((response:any) => {
    return response.json();
  })
  .catch((error: any) => { console.error(error);
    return {};
  });
}

export function populatePrograms(dataToSearch:Services.AwardData[]):string[] {
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

export function paginateResults(array:Services.AwardData[], chunkSize:number):Services.AwardData[][] {
  let t0 = performance.now();
  let result:Services.AwardData[][] = [[]];
  
  for(let i=0; i<array.length; i++) {
    const last = result[result.length - 1];
    if(!last || last.length === chunkSize) {
      result.push([array[i]]);
    } else {
      last.push(array[i]);
    }
  }
  let t1 = performance.now();
  console.log(`Pagination took ${t1-t0} milliseconds to complete.`);
  return result;
}


// NOTE: given an object and key of said object, returns the key value
// (needed for type assertion since Object.keys doesn't directly satisfy a type trying to match key value pairs with filter)
export function prop<T, K extends keyof T>(obj: T, key: K):T[K] {
  return obj[key];
}
