import * as React from 'react';
import styles from '../index.module.css';

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
        <div id={styles.programfilterview}>
          <button className={styles.pfbtnclose} onClick={this.props.programsFilterCloseHandler}>&times;</button>
          <button className={`button ${styles.pfbtnapply}`} onClick={this.props.programsFilterCloseHandler}>Apply Filters &raquo;</button>
          <h3>Programs</h3>
          <div className={`${styles.programfilter}`}>
            {this.generateProgramList(this.props.programList)}
          </div>
        </div>
      )
    } else {
      return <span>Loading Categories...</span>;
    }
  }
}

export default Programs;