import * as React from 'react';

class Filterbox extends React.Component<Services.FilterBox> {
  

  render = () => {
    return (
      <div className="grid-x grid-padding-x">
        <h3>Enter a term to filter by</h3>
        <div className="medium-12 cell">
          <form className="grid-x grid-margin-x" onSubmit={this.props.formSubmitHandler}>
            <input id="filterbox-text" className="cell medium-6" type="text" />
            <input className="button cell medium-1" type="submit" value="Submit" />
            <input id="filter-reset" className="button cell medium-1" onClick={this.props.resetDataHandler} defaultValue="Reset All" />
          </form>
        </div>
      </div>
    )
  }
}

export default Filterbox;