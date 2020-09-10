import * as React from 'react';

class Programs extends React.Component<Services.ProgramProps> {


  render() {
    return (
      <>
      <label>Categories</label>
      <select multiple>
        <option value="showboat">Showboat</option>
        <option value="redwing">Redwing</option>
        <option value="narcho">Narcho</option>
        <option value="hardball">Hardball</option>
        <option value="softball">Softball</option>
      </select>
      </>
    )
  }
}

export default Programs;