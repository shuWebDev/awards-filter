import * as React from 'react';

class Filterbox extends React.Component<Services.FilterBox> {
  

  render = () => {
    return (
      <div className="grid-x grid-padding-x">
        <h3>Enter a term to filter by</h3>
        <div className="medium-12 cell">
          <form className="grid-x grid-padding-x" onSubmit={this.props.formSubmitHandler}>
            <input className="cell medium-6" type="text" value={this.props.filterBoxText} onChange={this.props.filterBoxChangeHandler} /><input className="button cell medium-1" type="submit" value="submit" />
          </form>
        </div>
      </div>
    )
  }
}

export default Filterbox;