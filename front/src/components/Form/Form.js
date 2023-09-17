import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Input from "../Input/Input";
import { Button, Col, Row } from "react-bootstrap";

const CustomForm = ({
  fields,
  onSubmit,
  submitButtonText,
  resetButtonText,
  submitDisabled = false
}) => {
  const initialFormData = {};

  fields.forEach(field => {
    initialFormData[field.name] = "";
  });

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClear = e => {
    setFormData(initialFormData);
    onSubmit({});
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {fields.map(field => (
        <Input
          key={field.name}
          type={field.type}
          placeholder={field.placeholder}
          name={field.name}
          value={formData[field.name]}
          onChange={handleChange}
        />
      ))}
      <Row>
        <Col xs="auto">
          <Button type="submit" disabled={submitDisabled}>
            {submitButtonText}
          </Button>
        </Col>
        <Col xs="auto">
          <Button onClick={handleClear}>{resetButtonText}</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default CustomForm;
