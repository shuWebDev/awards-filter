import * as React from 'react';

class Results extends React.Component<Services.ResultsProps> {

  
  render() {
    return (
      <div>
        <h2>Results of filtering go here.</h2>
        {this.props.resultSet}
      </div>
    )
  }
}

export default Results;