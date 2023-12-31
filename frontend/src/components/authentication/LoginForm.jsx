//src/components/authentiacation/LoginForm.jsx
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useUserActions } from "../../hooks/user.actions"; 


function LoginForm(){
    const [validated, setValidated] = useState(false);
    const [form, setForm] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState(null);
    const userActions = useUserActions();

    const hadleSubmit = (event) => {
        event.preventDefault();
        const loginForm = event.currentTarget;
        if (loginForm.checkValidity() === false) {
            event.stopPropagation();
        }
        setValidated(true);
        const data = {
            email: form.email,
            password: form.password,
        };
        userActions.login(data).catch((err) => {
            if (err.message) {
                setError(err.request.response);
            }
        })
    }


    return (
        <Form
        id = "registration-form"
        className = "border p-4 rouded"
        noValidate
        validated = {validated}
        onSubmit = {hadleSubmit}>

            <Form.Group className = "mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                value = {form.email}
                onChange = {
                    (e) => setForm({
                        ...form,
                        email: e.target.value
                    })
                }
                required
                type = "text"
                placeholder = "Enter username"
                />
                <Form.Control.Feedback type = "invalid">
                    This filed is required.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                value={form.password}
                minLength="8"
                onChange={
                    (e) => setForm({
                            ...form, password: e.target.value 
                    })
                }
                required
                type="password"
                placeholder="Password"
                />
                <Form.Control.Feedback type="invalid">
                    Please provide a valid password.
                </Form.Control.Feedback>
            </Form.Group>

            <div className = "text-content text-danger">
                {error && <p>{error}</p>}
            </div>

            <Button variant = "primary" type = "submit">
                Login
            </Button>
        </Form>
    );
}

export default LoginForm;

