import "./footer.css";

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-info">
                <div className="footer-info-col">
                    <div className="footer-info-header">Alumni Portal</div>
                    <div className="footer-info-content">
                        Version: 1.0.0-beta <br />
                        Build: e332249
                    </div>
                </div>
                <div className="footer-info-col">
                    <div className="footer-info-header">Developers</div>
                    <div className="footer-info-content">
                        Vardhan: 18B81A0556 <br />
                        Kartik: 18B81A0553 <br />
                        Saindra: 18B81A0543
                    </div>
                </div>
                <div className="footer-info-col">
                    <div className="footer-info-header">Contact us</div>
                    <div className="footer-info-content">
                        viswa.es27@gmail.com<br />
                        valluru.kartik13@gmail.com <br />
                        saiindra70@gmail.com
                    </div>
                </div>
            </div>
            <div className="footer-main">
                <span style={{ color: "gray" }}>Copyright - (c)</span> 2B1B(2021)
            </div>
        </div>
    );
};

export default Footer;
