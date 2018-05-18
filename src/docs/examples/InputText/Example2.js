import React, { Component } from 'react';
import InputText from '@accessdev/arc-ui-react/InputText';

export default () => {
    return (
      <div>
        <h2>Examples with Icons</h2>
        <hr /><br />
        <InputText icon='https://image.freepik.com/free-icon/search-interface-symbol_318-41829.jpg' 
                   onClickIcon={event => console.log("You clicked the magnifying glass!")}
                   isInline={true}
                   width='275px'
                   placeHolder='Input with icon img' />
        <InputText icon='https://cdn0.iconfinder.com/data/icons/superuser-web-kit/512/686909-user_people_man_human_head_person-512.png' 
                   onClickIcon={event => console.log("You clicked the person!")}
                   isInline={true}
                   width='275px'
                   label='Icon Label' />
      </div>
    )
}