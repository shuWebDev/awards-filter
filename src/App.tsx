///<reference path='../typings/app.d.ts'/>
import * as React from 'react';
import Programs from './components/programs';
import Results from './components/results';
import FilterBox from './components/filterbox';
import * as UtilServices from './util/util';
import { generateResultListing } from './util/searchfunctions';



class App extends React.Component<Services.AppProps, Services.AppState> {
  constructor(props:Services.AppProps) {
    super(props);

    this.state = {
      programs: [],
      selectedPrograms: [],
      awardData: [],
      resultSet: [],
      filterBoxText: ""
    }
  }

  componentDidMount = () => {
    // NOTE: load our initial data
    UtilServices.loadAwards()
    .then((response:any) => {
      this.setState({
        awardData: response.data,
        programs: UtilServices.populatePrograms(response.data),
        resultSet: response.data
      });
    });
  }

  // NOTE: handles form "submission"
  // NOTE: should handle application of all filtering at once
  formSubmitHandler = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    // NOTE: initially, resultSet is all records, so to prevent changing the base data set, awardData which is our gold copy from the fetch, we work with the resultSet, also so we can apply multiple filters to the same data set 
    // NOTE: move handling of filterbox value changes to its own event handler that will update in state as the value changes, no actual calls to filtering here, save that for Submit button's handler
    let filterBox = document.querySelector("#filterbox-text") as HTMLInputElement;
    let filterBoxText = filterBox.value;
    if((this.state.resultSet.length) && (filterBoxText !== "")) {
      let filterByTextResultSet = generateResultListing(this.state.resultSet, filterBoxText, this.state.selectedPrograms);
      this.setState({
        resultSet: filterByTextResultSet
      });
    } else {
      // NOTE: we have nothing to filter by so reset the resultSet to initial
      if(filterBoxText === "") {
        this.setState({
          resultSet: this.state.awardData,
          filterBoxText: filterBoxText 
        });
      }
    }
    return;
  }

  resetDataHandler = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      resultSet: this.state.awardData
    });
    return;
  }

  // NOTE: should just handle adding/subtracting program names from state depending on whih ones are checked. No actual call to search methods here
  programCheckboxHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    // NOTE: inspect the incoming checkbox value
    //let value = event.target.value;
    let selectedPrograms = this.state.selectedPrograms;
    //console.log(`Target Value: ${event.target.value}`);
    if(event.target.checked) {
      // NOTE: check the list of current checked programs/categories
      if(!selectedPrograms.includes(event.target.value)) {
        // NOTE: if it's not already in the list, add it
        //console.log(`selectedPrograms does not include ${event.target.value}`);
        selectedPrograms.push(event.target.value);
      } 
    } else {
      // NOTE: if the box is now unchecked, see if the now unchecked program/category is in our list of active filters 
      if(selectedPrograms.includes(event.target.value)) {
        // NOTE: remove it from the list
        //console.log(`selectedPrograms includes ${event.target.value}`);
        selectedPrograms.splice(selectedPrograms.indexOf(event.target.value), 1);
      }
    }
    
    this.setState({
      selectedPrograms: selectedPrograms
    });

    return;
  }

  render = () => {
    if(this.state.awardData.length && this.state.resultSet.length) {
      return (
        <main>
          <div className="grid-x grid-margin-x">
            <div className="cell medium-2">
              <Programs programList={this.state.programs} programCheckboxHandler={this.programCheckboxHandler} />
            </div>
            <div className="cell medium-10">
              <FilterBox formSubmitHandler={this.formSubmitHandler} resetDataHandler={this.resetDataHandler} />
              <p style={{"color" : "red", "fontWeight" : "bold"}}>Press Submit to apply all selected filtering.</p>
              <Results resultSet={this.state.resultSet} />
            </div>
          </div>
        </main>
      )
    } else {
      return (
        <main>
        <div className="grid-x grid-margin-x">
          <div className="cell medium-2">
            <p>Loading...</p>
          </div>
          <div className="cell medium-10">
            <p>Loading...</p>
          </div>
        </div>
      </main>
      )
    }
  }
}

export default App;
