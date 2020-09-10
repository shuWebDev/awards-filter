import * as React from 'react'; 

const AwardAmount:React.FunctionComponent<Services.AwardAmountProps> = (props) => {
  
  return (
    <React.Fragment>
      <fieldset>
        <label>Min Amount</label>
          <input type="number" min="0" step="500" name="min-amount" value={props.awardAmount} onChange={props.awardAmountChangeHandler} />
      </fieldset>
    </React.Fragment>
  );
}

export default AwardAmount;