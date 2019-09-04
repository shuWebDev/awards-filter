declare namespace Services {


  interface AppProps {

  }

  interface AppState {
    programs: string[],
    awardData: Services.AwardData[],
    filterBoxText: string,
    resultSet: Services.AwardDataSearchable[],
    awardDataSearchable: Services.AwardDataSearchable[]
  }

  interface FilterBox {
    filterBoxText: string, 
    filterBoxChangeHandler: function,
    formSubmitHandler: function
  }

  interface ProgramProps {
    programList: string[] | undefined
  }

  interface ResultsProps {
    resultSet: Services.AwardDataSearchable[]
  }

  interface AwardData {
    accountType: string,
    aidType: string,
    amount: string,
    applicationFormInternal: object,
    applicationFormExternal: object,
    applicationProcedures: string,
    available: boolean,
    bnrFund: number,
    category: string[],
    deadline: string,
    description: string,
    eligibilityProgram: string,
    eligibilityRequirements: string, 
    name: string,
    notes: string,
    pageID: number,
    renewalRequirements: string,
    selectionBody: string,
    studentStatus: string[],
    tags: string[],
    url: string,
    uuid: string
  }

  interface AwardDataSearchable {
    accountType: string;
    aidType: string;
    amount: string;
    deadline: string;
    description: string;
    eligibilityProgram: string;
    eligibilityRequirements: string; 
    name: string;
    notes: string;
    renewalRequirements: string;
    selectionBody: string;
    studentStatus: string;
    tags: string;
    
  }
}

