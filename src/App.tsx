///<reference path='../typings/app.d.ts'/>
import * as React from 'react';
import Programs from './components/programs';
import Results from './components/results';
import FilterBox from './components/filterbox';
import AwardAmount from './components/awardamount';
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
      filterBoxText: "",
      awardAmountBox: 500
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

  resetDataHandler = (event: React.FormEvent<HTMLInputElement>) => {
    // NOTE: clear all checked Program boxes
    
    let checkboxes:HTMLInputElement[] = Array.from(document.querySelectorAll<HTMLInputElement>(".programs-checkbox"));

    for(let i=0; i<checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
    
    this.setState({
      resultSet: this.state.awardData,
      selectedPrograms: [],
      awardAmountBox: 500
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


  filterBoxChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      filterBoxText: (event.target as HTMLInputElement).value
    });

    return;
  }

  awardAmountChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      // NOTE: since a numeric input's value is actually a string, we need to parse the numeric value to work with it
      awardAmountBox: parseInt((event.target as HTMLInputElement).value)
    });
    return;
  }

  // NOTE: handles form "submission"
  // NOTE: should handle application of all filtering at once
  formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    let returnableResultSet:Services.AwardData<string|number|object|boolean>[];

    // NOTE: send the data off to the filtering function to be filtered
    let filterSet = [this.state.awardData, this.state.filterBoxText, this.state.selectedPrograms, this.state.awardAmountBox];
    
    returnableResultSet = generateResultListing(this.state.awardData, this.state.filterBoxText, this.state.selectedPrograms, this.state.awardAmountBox);

    this.setState({
      resultSet: returnableResultSet
    });

    return;
  }

  render = () => {
    if(this.state.awardData.length) {
      return (
        <main>
          <h2>Filter Academic Awards</h2>
          <form onSubmit={this.formSubmitHandler}>
            <div className="grid-x grid-margin-x">
              <div className="cell medium-2">
                <Programs programList={this.state.programs} programCheckboxHandler={this.programCheckboxHandler} />
              </div>
              <div className="cell medium-10">
                <FilterBox filterBoxChangeHandler={this.filterBoxChangeHandler} filterBoxText={this.state.filterBoxText} />
                <AwardAmount awardAmountChangeHandler={this.awardAmountChangeHandler} awardAmount={this.state.awardAmountBox} />
                <input className="button cell medium-1" type="submit" value="Submit" />
                <input id="filter-reset" type="button" className="button cell medium-1" onClick={this.resetDataHandler} defaultValue="Reset All" />
                <p style={{"color" : "red", "fontWeight" : "bold"}}>Press Submit to apply all selected filtering.</p>
                <hr />
                <Results resultSet={this.state.resultSet} />
              </div>
            </div>
          </form>
        </main>
      )
    } else {
      return (
        <main>
        <div className="grid-x grid-margin-x">
          <div className="cell medium-2">
            <p>Loading...</p>
          </div>
        </div>
      </main>
      )
    }
  }
}

export default App;
