declare namespace Services {


  interface AppProps {

  }

  interface AppState {
    programs: string[],
    awardData: object,
    filterBoxText: string,
    resultSet: object[]
  }

  interface FilterBox {
    filterBoxText: string, 
    filterBoxChangeHandler: function
  }

  interface ProgramProps {
    programList: string[] | undefined
  }

  interface ResultsProps {
    resultSet: object[]
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
}