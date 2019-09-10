import * as React from 'react';

class Filterbox extends React.Component<Services.FilterBox> {
  

  render = () => {
    return (
      <div>
        <label><strong>Enter keywords</strong><br />(optional)
          <input id="filterbox-text"  type="text" onChange={this.props.filterBoxChangeHandler} value={this.props.filterBoxText}/>
        </label>
      </div>
    )
  }
}

export default Filterbox;