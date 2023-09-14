//src/pages/Login.jsx
import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/authentication/LoginForm";
import ForgotPassword from "../components/authentication/ForgotPasswordForm";

function Login() {

    return (
        <div className = "container">
            <div className = "row">
                <div className = "col-md-6 p-5">
                    <div className = "content text-center px-4">
                        <h1 className = "text-primary">
                            Welcom to Postagram!
                        </h1>
                        <p>
                            Login now and start enjoying! <br />
                            Or if you don't have and account, please{" "}
                            <Link className="text-decoration-none" to = "/register/">register</Link>.
                        </p>
                        <hr/>
                        <p  className = "d-flex justify-content-center">
                                <a href="https://postgram.hamzabakkour.se/api/schema/swagger-ui/#/" className="link-info p-3 text-decoration-none" >API</a>
                                <a href="https://github.com/HamzaBakkour/Postgram/" className="link-info p-3 text-decoration-none">Source code</a>

                        </p>
                    </div>
                </div>
                <div className = "col-md-6 p-5">
                    <LoginForm />
                    <ForgotPassword />
                </div>
            </div>
        </div>
    );
}

export default Login;
