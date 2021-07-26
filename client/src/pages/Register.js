import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";

function Register() {
  const [values, setValues] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const onChange = () => {};

  const onSubmit = () => {}

  return (
    <div>
      <Form onSubmit={onSubmit} noValidate>
        <h1>Register</h1>
        <Form.Input
          label="Username"
          placeholder="Username..."
          name="username"
          value={values.username}
          onChange={onChange}
        />
        <Form.Input
          label="Email"
          placeholder="Email..."
          name="Email"
          value={values.email}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password..."
          name="Password"
          value={values.password}
          onChange={onChange}
        />
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password..."
          name="Confirm Password"
          value={values.confirmPassword}
          onChange={onChange}
        />
        <Button type="submit" primary>
            Register
        </Button>
      </Form>
    </div>
  );
}

export default Register;