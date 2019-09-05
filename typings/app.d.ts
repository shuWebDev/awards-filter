declare namespace Services {


  interface AppProps {

  }

  interface AppState {
    programs: string[],
    selectedPrograms: string[],
    awardData: Services.AwardData[],
    resultSet: Services.AwardData[],
  }

  interface FilterBox {
    formSubmitHandler: function,
    resetDataHandler: function
  }

  interface ProgramProps {
    programList: string[] | undefined,
    programCheckboxHandler: function
  }

  interface ResultsProps {
    resultSet: Services.AwardData[]
  }

  interface AwardData<TValue> {
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
    uuid: string,
    [key: string]: TValue;
  }
}

