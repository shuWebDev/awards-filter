///<reference path='../typings/app.d.ts'/>
import * as React from 'react';
import Programs from './components/programs';
import Results from './components/results';
import FilterBox from './components/filterbox';
import * as UtilServices from './util/util';


class App extends React.Component<Services.AppProps, Services.AppState> {
  constructor(props:Services.AppProps) {
    super(props);

    this.state = {
      programs: [],
      awardData: {},
      filterBoxText: "",
      resultSet: []
    }
  }

  handleFilterChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ 
      filterBoxText: event.currentTarget.value
    });
    // TODO: Add a call to a function that will use the current value of the search string to return matching records in the data set
  }

  componentDidMount = () => {
    UtilServices.loadAwards()
    .then((response:any) => {
      this.setState({
        awardData: response.data,
        programs: UtilServices.populatePrograms(response.data) 
      });
    });
  }

  render = () => {
    return (
      <main>
        <div className="grid-x grid-margin-x">
          <aside className="medium-2 cell">
            <Programs programList={this.state.programs} />
          </aside>
          <section className="medium-10 cell">
            <FilterBox filterBoxText={this.state.filterBoxText} filterBoxChangeHandler={this.handleFilterChange} />
            <Results resultSet={this.state.resultSet} />
          </section>
        </div>
      </main>
    )
  }
}

export default App;
