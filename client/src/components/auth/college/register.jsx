import "../auth.css";

const Register = ({ display }) => {
    return display ? (
        <div>
            <div className="heading">Register as a college representative</div><br />
            <div className="auth-form">
                <form>
                    <div className="register-label"><i className="fas fa-user"></i> Name</div>
                    <input className="form-input" type="text" name="name" />
                    <div className="register-label"><i className="fas fa-university"></i> College Name</div>
                    <input className="form-input" type="text" name="collegeName" />
                    <div className="register-label"><i className="fas fa-envelope"></i> Email</div>
                    <input className="form-input" type="email" name="email" />
                    <div className="register-label"><i className="fas fa-mobile-alt"></i> Mobile</div>
                    <input className="form-input" type="number" name="mobile" />
                    <div className="register-label"><i className="fas fa-key"></i> Password</div>
                    <input className="form-input" type="password" name="pass" />
                    <br /><br />
                    <div className="submit-button"><i className="fas fa-user-plus"></i> register</div>
                </form>
            </div>
        </div>
    ) : null;
};

export default Register;
