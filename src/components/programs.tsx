import * as React from 'react';


class Programs extends React.Component<Services.ProgramProps> {

  generateProgramList = (programList:string[]) => {
    let generatedList = [];
    for(let program in programList) {
      generatedList.push(
        <div key={`${programList[program]}`}>
          <input type="checkbox" id={`${programList[program]}`} name={programList[program]} onClick={this.props.programCheckboxHandler} defaultValue={programList[program]} /><span> {programList[program]}</span>
        </div>
      );
    }
    return generatedList;
  }

  render() {
    if(typeof this.props.programList !== 'undefined') {
      return (
        <React.Fragment>
        <h3>Programs</h3>
          <aside>
            {this.generateProgramList(this.props.programList)}
          </aside>
        </React.Fragment>
      )
    } else {
      return <span>Loading Categories...</span>;
    }
  }
}

export default Programs;