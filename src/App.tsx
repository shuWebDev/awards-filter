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
    // NOTE: initially, resultSet is all records, so to prevent changing the base data set, awardData which is our gold copy from the fetch, we work with the resultSet, also so we can apply multiple filters to the same data set 
    if((this.state.resultSet.length) && (this.state.filterBoxText !== "")) {
      let filterByTextResultSet = generateResultListing(this.state.resultSet, this.state.filterBoxText);
      this.setState({
        resultSet: filterByTextResultSet
      });
    } else {
      // NOTE: we have nothing to filter by so reset the resultSet to initial
      if(this.state.filterBoxText === "") {
        this.setState({
          resultSet: this.state.awardDataSearchable 
          // NOTE: this.state.awardDataSearchable will eventually be swapped out to use the original data once our search function is able to ignore record fields with data types it isn't currently working with. i.e., we are searching by a text string and it comes across a number or boolean, behavior would be to ignore that record property and move to the next string field.
        });
      }
    }
    return;
  }

  componentDidMount = () => {
    // NOTE: load our initial data
    UtilServices.loadAwards()
    .then((response:any) => {
      this.setState({
        awardData: response.data,
        programs: UtilServices.populatePrograms(response.data),
        // TODO: shouldn't need a "sanitized/all string version of the original data, our filtering should be able to check field types and ignore those fields that don't match the data type we are comparin against
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
            <Programs programList={this.state.programs} />
          </div>
          <div className="cell medium-10">
            <FilterBox formSubmitHandler={this.formSubmitHandler} filterBoxText={this.state.filterBoxText} filterBoxChangeHandler={this.handleFilterChange} />
            <Results resultSet={this.state.resultSet} />
          </div>
        </div>
      </main>
    )
  }
}

export default App;
