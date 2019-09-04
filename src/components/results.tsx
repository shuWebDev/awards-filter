import * as React from 'react';
import * as UtilServices from '../util/util';

class Results extends React.Component<Services.ResultsProps> {

  displayResults = (resultSet:Services.AwardData[]) => {
    let listItems = [];
    for(let i=0; i<resultSet.length; i++) {
      listItems.push(<li key={`item-${i}`}>{UtilServices.prop(resultSet[i], "name")}</li>);
    }

    return listItems;
  }
  
  render() {
    if(this.props.resultSet.length) {
      return (
        <div className="grid-x grid-padding-x">
          <div className="cell medium-12">
            <h2>Results of filtering go here.</h2>
            <ul className="no-bullet">
              {this.displayResults(this.props.resultSet)}
            </ul>
          </div>
        </div>
      )
    } else {
      return <p>No Results to Display.</p>
    }
  }
}

export default Results;