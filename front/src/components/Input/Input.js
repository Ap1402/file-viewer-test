import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const Input = ({ type, placeholder, value, onChange, name }) => {
  return (
    <InputGroup className="mb-3">
      <Form.Control
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </InputGroup>
  );
};

export default Input;
