///<reference path='../typings/app.d.ts'/>
import * as React from 'react';
import Programs from './components/programs';
import Results from './components/results';
import FilterBox from './components/filterbox';
import AwardAmount from './components/awardamount';
import * as UtilServices from './util/util';
import { generateResultListing } from './util/searchfunctions';
import styles from './index.module.css';


class App extends React.Component<Services.AppProps, Services.AppState> {
  constructor(props:Services.AppProps) {
    super(props);

    this.state = {
      programFilterDisplayed: false,
      programs: [],
      selectedPrograms: [],
      awardData: [],
      resultSet: [],
      filterBoxText: "",
      filterBoxPlaceholder: `ex: "Endowment", "Max", "memorial"...`,
      awardAmountBox: 0
    }
  }

  displayProgramFilter = () => {
    if(this.state.programFilterDisplayed) {
      this.setState({
        programFilterDisplayed: false
      });
    } else {
      this.setState({
        programFilterDisplayed: true
      });
    } 
  }

  displayBadges = () => {
    if(this.state.selectedPrograms.length) {
      let output = [];
      for(let i=0; i<this.state.selectedPrograms.length; i++) {
        if((this.state.selectedPrograms.length > 1) && (i < this.state.selectedPrograms.length -1)) {
          output.push(<li><em>"{this.state.selectedPrograms[i]}"</em>, </li>);
        } else {
          output.push(<li><em>"{this.state.selectedPrograms[i]}"</em></li>);
        }
      }
      return (
      <div>
        <label>Applied Program Filters:
          <ul className={styles.pfbadgelist}>
          {output}
          </ul>
        </label>
      </div>  
      );
    } else {
      return null;
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
      awardAmountBox: 0
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
    
    returnableResultSet = generateResultListing(this.state.awardData, this.state.filterBoxText, this.state.selectedPrograms, this.state.awardAmountBox);

    this.setState({
      resultSet: returnableResultSet
    });

    return;
  }

  programsFilterCloseHandler = () => {
    this.setState({
      programFilterDisplayed: false
    });
  }

  render = () => {
    if(this.state.awardData.length) {
      if(this.state.programFilterDisplayed) {
        {/* Program filter selection screen is active */}
        return (
          <div className={`grid-x grid-margin-x`}>
            <div className="cell medium-12">
              <Programs programList={this.state.programs} programCheckboxHandler={this.programCheckboxHandler} programsFilterCloseHandler={this.programsFilterCloseHandler} />
            </div>
          </div> 
        )
      } else {
        {/* we aren't currently showing the program checkboxes */}
        const filterBoxProps = {
          filterBoxChangeHandler: this.filterBoxChangeHandler,
          filterBoxText: this.state.filterBoxText,
          filterBoxPlaceholder: this.state.filterBoxPlaceholder
        };
        return (
          <main>
            <form onSubmit={this.formSubmitHandler}>
              <div className="grid-x grid-margin-x">
                <div className="cell medium-12">
                  <div className="grid-x grid-margin-x">
                    <div className="cell medium-9 small-12">
                      <FilterBox filterBoxProps={filterBoxProps} />
                    </div>
                    <div className="cell medium-3 small-12">
                      <AwardAmount awardAmountChangeHandler={this.awardAmountChangeHandler} awardAmount={this.state.awardAmountBox} />
                    </div>
                  </div>
                  <div className="grid-x grid-margin-x">
                    <div className="small-12 cell">
                    {(this.state.selectedPrograms.length)? this.displayBadges() : null}
                    </div>
                  </div>
                  <div className="button-group">
                    <input className="button" type="button" value="Select Programs" onClick={this.displayProgramFilter} />
                    <input id="filter-reset" type="button" className="button" onClick={this.resetDataHandler} defaultValue="Reset All" />
                    <input className="button" type="submit" value="Submit" />
                  </div>
                  <p><strong>Press Submit to apply all selected filtering.</strong></p>
                  <hr />
                  <Results resultSet={this.state.resultSet} />
                </div>
              </div>
            </form>
          </main>
        )
      } 
    } else {
      {/* default rendering if there is no data yet */}
      return (
        <main>
        <div className="grid-x grid-margin-x">
          <div className="cell medium-12">
            <div className="panel">
              <h3><i className="fas fa-sync fa-spin"></i>&nbsp;Loading content...</h3>
            </div>
          </div>
        </div>
      </main>
      )
    }
  }
}

export default App;
