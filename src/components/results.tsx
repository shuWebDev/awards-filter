import * as React from 'react';
import * as UtilServices from '../util/util';

class Results extends React.Component<Services.ResultsProps> {

  displayResults = (resultSet:Services.AwardData<string|number|boolean|object>[]) => {
    let listItems = [];
    for(let i=0; i<resultSet.length; i++) {
      // NOTE: some fields have HTML formatting that doesn't get rendered, but shows up in the data as plain text, we need to strip that for proper display. These fields usually stem from being Rich Text from CommonSpot
      let description = UtilServices.prop(resultSet[i], "description");
      description = description.replace(/(<([^>]+)>)/ig,"");
      // NOTE: format the deadline date to en-US format
      let deadline = new Date(UtilServices.prop(resultSet[i], "deadline"));
      let formattedDeadline = deadline.toLocaleDateString("en-US", {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'});
      
      // NOTE: push the record into the list items array
      listItems.push(
        <div key={`item-${i}`}>
          <h3><a href={UtilServices.prop(resultSet[i], "url")} rel="noreferer noopener" >{UtilServices.prop(resultSet[i], "name")}</a></h3>
          <p>{description}</p>
          <ul>
            <li><strong>Account Type:</strong> {UtilServices.prop(resultSet[i], "accountType")}</li>
            <li><strong>Amount:</strong> ${UtilServices.prop(resultSet[i], "amount")}</li>
            <li><strong>Deadline:</strong> {formattedDeadline}</li>
            <li><strong>Availability:</strong> {(UtilServices.prop(resultSet[i], "available"))? "Available" : "Not Currently Available"}</li>
          </ul>
        </div>
      );
    }

    return listItems;
  }
  
  render() {
    if(this.props.resultSet.length) {
      return (
        <div className="grid-x grid-padding-x">
          <div className="cell medium-12">
            <div id="results-display-area">
              {this.displayResults(this.props.resultSet)}
            </div>
          </div>
        </div>
      )
    } else {
      return <p>No Results to Display.</p>
    }
  }
}

export default Results;