import * as React from 'react';


class Programs extends React.Component<Services.ProgramProps> {

  generateProgramList = (programList:string[]) => {
    let generatedList = [];
    let key = Date.now();
    for(let program in programList) {
      // NOTE: bring in a UUID package to assign UUIDs when a key or ID is needed?
      key++;
      generatedList.push(<li key={key}><a href="# ">{programList[program]}</a></li>);
    }
    return generatedList;
  }

  render() {
    if(typeof this.props.programList !== 'undefined') {
      return (
        <React.Fragment>
        <h3>Programs</h3>
        <p>(based on the current result set)</p>
          <ul className="no-bullet">
            {this.generateProgramList(this.props.programList)}
          </ul>
        </React.Fragment>
      )
    } else {
      return <span>Loading Categories...</span>;
    }
  }
}

export default Programs;