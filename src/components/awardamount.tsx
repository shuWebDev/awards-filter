import * as React from 'react'; 

class AwardAmount extends React.Component<Services.AwardAmountProps> {
  render() {
    return (
      <React.Fragment>
        <h3>Select Minimum Award Amount</h3>
        {/*<div className="grid-x grid-padding-x">
          <div className="cell medium-2">*/}
            <input type="number" min="0" step="500" name="min-amount" value={this.props.awardAmount} onChange={this.props.awardAmountChangeHandler} />
          {/*</div>
        </div>*/}
      </React.Fragment>
    )
  }
}

export default AwardAmount;