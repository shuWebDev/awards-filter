import * as React from 'react';

class Filterbox extends React.Component<Services.FilterBox> {
  
  render = () => {
    const filterBoxConfig = this.props.filterBoxProps;
    return (
      <div>
        <fieldset>
          <legend><strong>Enter keywords</strong>(optional)</legend>
            <input id="filterbox-text"  placeholder={filterBoxConfig.filterBoxPlaceholder} type="text" onChange={filterBoxConfig.filterBoxChangeHandler} value={filterBoxConfig.filterBoxText} />
        </fieldset>
      </div>
    )
  }
}

export default Filterbox;