import React from 'react';
import InputContainer from '../InputContainer/InputContainer';
import classes from './input.module.css';
function Input(
  { label, type, defaultValue, onChange, onBlur, name, error },
  ref //created by the register func in LoginPage.js file
) {
  const getErrorMessage = () => { //gives a specific error based on the error types
    if (!error) return;
    if (error.message) return error.message;
    //defaults
    switch (error.type) {
      case 'required':
        return 'This Field Is Required';
      case 'minLength':
        return 'Field Is Too Short';
      default:
        return '*';
    }
  };

  return ( //responsible for wrapping the input in a box and label
    //ref,name,onchange,onblur are created from the register func from loginpage.js file 
    <InputContainer label={label}> 
      <input
        defaultValue={defaultValue}
        className={classes.input}
        type={type}
        placeholder={label}
        ref={ref}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <div className={classes.error}>{getErrorMessage()}</div>}
    </InputContainer>
  );
}

export default React.forwardRef(Input);
