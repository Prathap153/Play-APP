import { useEffect, useState } from "react";
import { FetchSports } from "../../apis/ApiServices";
import { Link } from "react-router-dom";
import './SportsDetails.css';

const SportsDetails = () => {

    const [sports, setSports] = useState([]);

    useEffect(() => {
        allSports();
    }, []);

    const allSports = () => {
        FetchSports().then((res) => {
            console.log("allsports", res);
            setSports(res);
        })
            .catch((err) => {
                console.log("Error at allSports", err);
            })
    }
    return (
        <div>
            <h3>Available Games </h3>
            {sports.length > 0 ? (
                <div className="sports-container">
                    {sports.map((sport) => (
                        <Link to={`/sports/${sport.id}`} key={sport.id} className="sport-card" >
                            <img src={sport.images[0]} alt={sport.name} style={{ width: '100%', maxWidth: '420px' }} />
                            <h2>{sport.name}</h2>
                            <p><strong>Sport:</strong> {sport.type}</p>
                            <p><strong>Price:</strong> ${sport.price}</p>
                            <p><strong>Rating:</strong> {sport.rating}*</p>
                            {/* <button>Details</button> */}
                        </Link>
                    ))}
                </div>
            ) : (
                <p>No sports available at the moment.</p>
            )}
        </div>
    );
}

export default SportsDetails;

