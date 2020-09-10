declare var dataPath: string;

declare namespace Services {
  interface AppProps {}

  interface AppState {
    programFilterDisplayed: boolean,
    programs: string[],
    selectedPrograms: string[],
    awardData: Services.AwardData[],
    resultSet: Services.AwardData[][],
    filterBoxText: string,
    filterBoxPlaceholder: string,
    awardAmountBox: number,
    resultsPerPage: number,
    currentPage: number,
    categoryData: Category[]
  }

  interface FilterBox {
    filterBoxProps: {
      filterBoxChangeHandler: function,
      filterBoxText: string,
      filterBoxPlaceholder: string
    }
  }

  interface ProgramProps {
    programList: string[] | undefined | void;
  }

  interface ResultsProps {
    resultSet: Services.AwardData[]
  }

  interface AwardAmountProps {
    awardAmountChangeHandler: function,
    awardAmount: number
  }

  interface Category {
    pageID: string,
    description: string,
    title: string,
    uuid: string,
    type: string[],
    imageSmall: object
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
    [key: string]: TValue;
  }
}

