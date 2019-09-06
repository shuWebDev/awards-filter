import * as React from 'react';

class Filterbox extends React.Component<Services.FilterBox> {
  

  render = () => {
    return (
      <div className="grid-x grid-padding-x">
        <h3>Enter a term to filter by</h3>
        <div className="medium-12 cell">
          <input id="filterbox-text" className="cell medium-6" type="text" onChange={this.props.filterBoxChangeHandler} value={this.props.filterBoxText}/>
        </div>
      </div>
    )
  }
}

export default Filterbox;