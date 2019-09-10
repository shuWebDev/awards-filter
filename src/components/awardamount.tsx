import * as React from 'react'; 

class AwardAmount extends React.Component<Services.AwardAmountProps> {
  render() {
    return (
      <React.Fragment>
        <label><strong>Minimum Amount</strong><br />(optional)
          <input type="number" min="0" step="500" name="min-amount" value={this.props.awardAmount} onChange={this.props.awardAmountChangeHandler} />
        </label>
      </React.Fragment>
    )
  }
}

export default AwardAmount;