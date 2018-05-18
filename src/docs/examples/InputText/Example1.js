import React, { Component } from 'react';
import InputText from '@accessdev/arc-ui-react/InputText';

export default () => {
    return (
      <div>
        <h2>Basic Examples</h2>
        <hr /><br />
        <div style={{width: '275px'}}>
            <InputText placeHolder='Placeholder text' 
                       label='Normal Field' />
            <InputText placeHolder='Placeholder text' 
                       label='Field with onChange (see console)'
                       onChange={event => console.log(event.target.value)} />
            <InputText placeHolder='Placeholder text' 
                       label='Normal Field (focused)'
                       value='This is normal text' />
            <InputText placeHolder='Placeholder text' 
                       label='Normal Field (disabled)'
                       value='This is disabled text' 
                       isDisabled={true} />
            <InputText placeHolder='Placeholder text' 
                       label='Normal Field (error)'
                       value='This is error text'
                       isError={true} />
            <InputText placeHolder='Placeholder text' 
                       label='Normal Field (error w/helper)'
                       value='This is error text'
                       errorMsg="Here is some error text"
                       isError={true} />
            <InputText placeHolder='Placeholder text no Label' />
            <InputText placeHolder='Max Length 10'
                       maxLength={10} />
            <InputText label='Blank Input' />
            <InputText label='Custom Width'
                       width='400px' />
        </div>
      </div>
    );
}