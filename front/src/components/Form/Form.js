import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Input from "../Input/Input";
import { Button } from "react-bootstrap";

const CustomForm = ({
  fields,
  onSubmit,
  submitButtonText,
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
      <Button type="submit" disabled={submitDisabled}>
        {submitButtonText}
      </Button>
    </Form>
  );
};

export default CustomForm;
