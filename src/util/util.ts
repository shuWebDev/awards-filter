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