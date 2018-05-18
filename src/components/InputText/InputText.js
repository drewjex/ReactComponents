import React, { Component } from "react"; 
import PropTypes from 'prop-types'; 
import classNames from "classnames";

export default class InputText extends Component { 

    constructor(props) {
        super(props);

        this.state = {
            value: props.value,
            isError: props.isError
        }

        this.isMouseDown = false;
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
          value: nextProps.value
        });
    }

    handleChange = event => {
        const value = event.target.value;
        this.setState({"value":value});
        if ('onChange' in this.props) this.props.onChange(event);
    }

    validateInput = event => {
        this.refs.focusBorderOnFocus.classList.remove('visible');
        this.refs.focusBorder.classList.remove("border-move");

        if ('onBlur' in this.props) {
            this.props.onBlur(event);
        }

        if ('validate' in this.props) {
            if (this.props.validate(this.state.value) || this.state.value === '') {
                this.setState({"isError": false});
            } else {
                this.setState({"isError": true});
            }
        }
    }

    handleMouseDown = event => {
        this.isMouseDown = true;

        const x = event.pageX - event.target.offsetLeft;
        const bodyRect = document.body.getBoundingClientRect();
        const elemRect = event.target.getBoundingClientRect();
        const offsetX = elemRect.left - bodyRect.left;

        this.refs.focusBorder.style.setProperty('--x', `${ x - offsetX }px`);
        this.refs.focusBorder.style.setProperty('--width', `${event.target.offsetWidth - (x - offsetX)}px`);

        this.applyAnimation();
    }

    handleMouseUp = event => {
        this.isMouseDown = false;
    }

    handleFocus = event => {
        if (this.isMouseDown) return;

        this.refs.focusBorder.style.setProperty('--x', `${ event.target.offsetWidth/2 }px`);
        this.refs.focusBorder.style.setProperty('--width', `${event.target.offsetWidth/2}px`);

        this.applyAnimation();
    }

    applyAnimation = () => {
        if (this.refs.focusBorder.classList.contains('border-move')) {
            this.refs.focusBorder.classList.remove("border-move");
            void this.refs.focusBorder.offsetWidth;
        }
        this.refs.focusBorder.classList.add("border-move");

        this.refs.focusBorder.addEventListener('animationend', event => {
            if (event.animationName === 'borderMove' || event.animationName === 'borderMoveError') {
                this.refs.focusBorderOnFocus.classList.add('visible');
            }
        });
    }

    render() { 
        const { 
            placeHolder, 
            label, 
            errorMsg, 
            icon, 
            width,
            maxLength, 
            onClickIcon, 
            isDisabled, 
            isInline, 
            isRequired 
        } = this.props;
        return ( 
            <div className={classNames({
                "input-text__elem" : true,  
                "inline": isInline
            })} style={{"width": `${width}`}}> 
                <label className={classNames({
                    "error": this.state.isError
                })}>
                    {`${label}${isRequired && label ? '*' : ''}`}
                </label>
                <input type='text' 
                       placeholder={label && placeHolder} 
                       value={this.state.value}
                       onChange={this.handleChange}
                       onBlur={this.validateInput}
                       onMouseUp={this.handleMouseUp}
                       onFocus={this.handleFocus}
                       onMouseDown={this.handleMouseDown}
                       className={classNames({
                            "invalid": this.state.isError && 'validate' in this.props, 
                            "error": this.state.isError, 
                            "has-icon": icon
                       })} 
                       disabled={isDisabled} 
                       required={isRequired} 
                       maxLength={maxLength} />
                <span className="focus-border" ref="focusBorder">
                    <i></i>
                    <i></i> {/* first child is sides, last child is top/bottom going left */}
                </span>
                <span className="focus-border-onfocus" ref="focusBorderOnFocus"></span> {/* for animation when clicking and already focused */}
                {icon &&
                    <span className='icon'>
                        <img src={icon} 
                             alt='' 
                             onClick={onClickIcon} />
                    </span>
                }
                {placeHolder && !label &&
                    <span className={classNames({
                        "animated-placeholder": true, 
                        "error-placeholder": this.state.isError
                    })}>
                        {placeHolder}
                    </span>
                }
                {this.state.isError && errorMsg &&
                    <span className='error'>
                        {errorMsg}
                    </span>
                }
            </div>
        ) 
    } 
}

InputText.propTypes = {
    value: PropTypes.string,
    placeHolder: PropTypes.string, 
    label: PropTypes.string, 
    icon: PropTypes.string,
    width: PropTypes.string,
    maxLength: PropTypes.number,
    errorText: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    validate: PropTypes.func,
    isError: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isInline: PropTypes.bool,
    isRequired: PropTypes.bool
};
  
InputText.defaultProps = {
    value: '',
    label: '',
    isError: false,
    isDisabled: false,
    isInline: false,
    isRequired: false
};