import * as React from 'react';

class Filterbox extends React.Component<Services.FilterBox> {
  
  render = () => {
    const filterBoxConfig = this.props.filterBoxProps;
    return (
      <div>
        <label><strong>Enter keywords</strong><br />(optional)
          <input id="filterbox-text"  placeholder={filterBoxConfig.filterBoxPlaceholder} type="text" onChange={filterBoxConfig.filterBoxChangeHandler} value={filterBoxConfig.filterBoxText} />
        </label>
      </div>
    )
  }
}

export default Filterbox;