declare var dataPath: string;

declare namespace Services {
  interface AppProps {}

  interface AppState {
    programFilterDisplayed: boolean,
    programs: string[],
    selectedPrograms: string[],
    awardData: Services.AwardData[],
    resultSet: Services.AwardData[],
    filterBoxText: string,
    filterBoxPlaceholder: string,
    awardAmountBox: number
  }

  interface FilterBox {
    filterBoxProps: {
      filterBoxChangeHandler: function,
      filterBoxText: string,
      filterBoxPlaceholder: string
    }
  }

  interface ProgramProps {
    programList: string[] | undefined,
    programCheckboxHandler: function,
    programsFilterCloseHandler: function
  }

  interface ResultsProps {
    resultSet: Services.AwardData[]
  }

  interface AwardAmountProps {
    awardAmountChangeHandler: function,
    awardAmount: number
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

