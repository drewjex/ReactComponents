import React, { Component } from 'react';
import InputText from '@accessdev/arc-ui-react/InputText';

export default () => {
    return (
      <div>
        <h2>Validation Examples</h2>
        <hr /><br />
        <InputText placeHolder='Required field with Validation' 
                   isRequired={true} 
                   isInline={true}
                   width='275px'
                   validate={value => value === 'hi'}/>
        <InputText icon='http://webiconspng.com/wp-content/uploads/2017/01/Calendar-High-Resolution-PNG-Icon.png' 
                   onClickIcon={event => console.log("You clicked the calendar!")}
                   validate={value => /^\d{4}$/.test(value) }
                   isInline={true}
                   width='275px'
                   errorMsg="Value must be a 4-digit number"
                   placeHolder='Validate 4 digit number' />
        <InputText placeHolder='Required field with Error Msg + label' 
                   label='Please type "hi"'
                   isRequired={true} 
                   isInline={true}
                   width='275px'
                   errorMsg='Value must be "hi"'
                   onBlur={event => console.log(event)}
                   validate={value => value === 'hi'} />
      </div>
    )
}