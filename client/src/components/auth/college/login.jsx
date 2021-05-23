import "../auth.css";

const Login = () => {
    return (
        <div className="auth-container">
            <div className="auth-left">
            </div>
            <div className="auth-right">
                <div className="auth-form">
                <form>
                    <div className="label"><i className="fas fa-envelope"></i> Email</div>
                    <input className="form-input" type="email" name="email" />
                    <div className="label"><i className="fas fa-key"></i> Password</div>
                    <input className="form-input" type="password" name="pass" />
                    <br /><br />
                    <div className="submit-button"><i className="fas fa-sign-in-alt"></i> login</div>
                </form>
            </div>
            </div>
        </div>
    )
};

export default Login;
