///<reference path='../typings/app.d.ts'/>
import * as React from 'react';
import Programs from './components/programs';
//import Results from './components/results';
import FilterBox from './components/filterbox';
import * as UtilServices from './util/util';
import { string } from 'prop-types';


class App extends React.Component<Services.AppProps, Services.AppState> {
  constructor(props:Services.AppProps) {
    super(props);

    this.state = {
      programs: [],
      awardData: [],
      awardDataSearchable: [],
      resultSet: [],
      filterBoxText: ""
    }

  }

  // NOTE: handles control of value change in filter text box
  handleFilterChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ 
      filterBoxText: event.currentTarget.value
    });
    return;
  }

  // NOTE: handles form "submission"
  formSubmitHandler = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    
    if((this.state.resultSet.length) && (this.state.filterBoxText !== "")) {
      let filterByTextResultSet = this.generateResultListing(this.state.resultSet, this.state.filterBoxText);
      this.setState({
        resultSet: filterByTextResultSet
      });
    }
    return;
  }

  generateResultListing = (awardData:Services.AwardDataSearchable[], filterBoxText:string, selectedProgram?:string) => {
    // NOTE: our return set
    let returnableResultSet:Services.AwardDataSearchable[] = [];

    // NOTE: get the keys for each award record (array of key names as strings)
    for(let i=0; i<1; i++) {
      let currentRecord:Services.AwardDataSearchable = awardData[i];
      const keys:any = Object.keys(currentRecord);
      // NOTE: cycle through the list of key names, get their values
      for(let i=0; i<keys.length; i++) {
        //console.log(UtilServices.prop(currentRecord, keys[i]));
        filterBoxText = filterBoxText.toLowerCase();
        //console.log(`${filterBoxText} : ${UtilServices.prop(currentRecord, keys[i])}`);
        if((UtilServices.prop(currentRecord, keys[i])).toLowerCase().includes(filterBoxText)) {
          //console.log("yes");
          //console.dir(currentRecord);
          returnableResultSet.push(currentRecord);
        } 
      }
    }

    return returnableResultSet; // NOTE: we will end up returning an object array with the records that match what we are looking for
  }

  componentDidMount = () => {
    UtilServices.loadAwards()
    .then((response:any) => {
      //let programList = UtilServices.populatePrograms(response.data);
      //let searchableAwardsData = UtilServices.convertAwardData(response.data);
      //console.log(UtilServices.convertAwardData(response.data));
      this.setState({
        awardData: response.data,
        programs: UtilServices.populatePrograms(response.data),
        awardDataSearchable: UtilServices.convertAwardData(response.data),
        resultSet: UtilServices.convertAwardData(response.data)
      });
    });
  }

  render = () => {
    return (
      <main>
        <div className="grid-x grid-margin-x">
          <div className="cell medium-2">
            {/*<button onClick={this.buttonHandler}>Click Me</button>*/}
            <FilterBox formSubmitHandler={this.formSubmitHandler} filterBoxText={this.state.filterBoxText} filterBoxChangeHandler={this.handleFilterChange} />
          </div>
        </div>
      </main>
    )
  }
}

export default App;
