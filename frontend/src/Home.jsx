import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './Home.css';

export default function Home() {
    const navigate = useNavigate();

    // Function to handle refreshing Excel sheet data
    const handleRefresh = () => {
        axios.get('http://localhost:1234/data')
            .then(result => {
                console.log(result); // Handle successful response
            })
            .catch(err => {
                console.log(err); // Handle error
            });
    };

    return (
        <div className="home-container">
            <h1 className="home-title">Home Page</h1>

            {/* Navigation buttons for Forms */}
            <h3 className="navigate-title">Navigate to a Form:</h3>
            <div className="button-container">
                <button className="navigate-button" onClick={() => navigate("/form", { state: { title: "Form A", type: 'a' } })}>
                    Form A
                </button>
                <button className="navigate-button" onClick={() => navigate("/form", { state: { title: "Form B", type: 'b' } })}>
                    Form B
                </button>
            </div>

            <hr className="divider" />

            {/* Button to refresh Excel sheet */}
            <h3 className="refresh-title">Refresh Excel Sheet:</h3>
            <button className="refresh-button" onClick={handleRefresh}>Refresh</button>
        </div>
    );
}
