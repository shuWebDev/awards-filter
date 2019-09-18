import * as React from 'react';


class Programs extends React.Component<Services.ProgramProps> {

  generateProgramList = (programList:string[]) => {
    let generatedList = [];
    for(let program of programList) {
      generatedList.push(
        <div key={`${program}`}>
          <label htmlFor={`${program}`}>
          <input type="checkbox" id={`${program}`} className="programs-checkbox" name={program} onClick={this.props.programCheckboxHandler} defaultValue={program} /> 
          {program}</label>
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