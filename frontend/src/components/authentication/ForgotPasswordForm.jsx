import { Container, Row, Col, Card, Stack, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Toaster from '../Toaster';


function ForgotPassword() {
    const [form, setForm] = useState({
        email: '',
    });

    const [ toaster, setToaster ] = useState({
        title: "",
        show: false,
        message: "",
        type: "",
    });

    const [validated, setValidated] = useState(false);
    const [error, setError] = useState(null);

    const [showForm, setShowForm] = useState(false);
    const showFormHandler = (event) => {
        event.preventDefault();
        setShowForm(!showForm);
    }

    const handlesupmit = (event) => {
        event.preventDefault();
        const resetForm = event.currentTarget;
        if (resetForm.checkValidity() === false) {
            event.stopPropagation();
        }
        
        const data = {
            email: form.email,
        };
        
        axios.post("https://postgram.hamzabakkour.se/api/password_reset/", data)
        .then(() => {
            setToaster({
                type: "info",
                message: `An email with a reset link was sent to ${form.email}`,  
                show: true,
                title: "Password reset",
                delay: 20000
            });
            setValidated(true);
            setForm({});
        
        })
        .catch((err) => {
            if (err.message) {
                setError(err.request.response);
            }
        });
    };


    return (
        <div className='pt-3'>
        <form>
            <Link className='text-primary text-decoration-none' onClick={showFormHandler}>Forgot your password? </Link>
        </form>

        {showForm && (
            <>
                <Form
                    id='reset-password-form'
                    className='mt-3'
                    noValidate
                    validated={validated}
                    onSubmit={handlesupmit}
                >

                    <Form.Group>
                        <Form.Control
                        value={form.email}
                        onChange={e =>
                            setForm({
                            ...form,
                            email: e.target.value,
                            })
                        }
                        required
                        type='text'
                        placeholder='Enter your email to recive a reset link'
                        />
                    </Form.Group>

                    <div className = "text-content text-danger">
                        {error && <p>{error}</p>}
                    </div>

                    <Button className='mt-2' variant='primary' type='submit'>
                    Submit
                    </Button>

                </Form>

            <Toaster
            title = {toaster.title}
            message = {toaster.message}
            type = {toaster.type}
            showToast = {toaster.show}
            onClose = {() => setToaster({ ...toaster, show: false})}
            delay = {toaster.delay}/>

            </>
        )}
        </div>
    )
}

export default ForgotPassword;
