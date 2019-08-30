import * as React from 'react';

class Filterbox extends React.Component<Services.FilterBox> {
  

  render = () => {
    return (
      <div className="grid-x grid-padding-x">
        <h3>Enter a term to filter by</h3>
        <div className="medium-12 cell">
          <input type="text" value={this.props.filterBoxText} onChange={this.props.filterBoxChangeHandler} />
        </div>
      </div>
    )
  }
}

export default Filterbox;