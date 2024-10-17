import { useState, useEffect } from "react";
import { FetchSports } from "../../apis/ApiServices";
import { useParams, Link } from "react-router-dom";
import './SearchByCity.css';

const SearchByCity = () => {
    const { city } = useParams();
    const [searchCity, setSearchCity] = useState([]);
    const [selectedSport, setSelectedSport] = useState("All");
    const [selectedArea, setSelectedArea] = useState("All");
    const [sportsOptions, setSportsOptions] = useState([]);
    const [areaOptions, setAreaOptions] = useState([]);

    useEffect(() => {
        searchBy(city);
    }, [city]);

    const searchBy = async (city) => {
        try {
            const res = await FetchSports();
            const foundByCity = res.filter((s) => s.city.toLowerCase() === city.toLowerCase());
            setSearchCity(foundByCity);

            // Extract unique sports
            const uniqueSports = [...new Set(foundByCity.map(s => s.type))];
            setSportsOptions(uniqueSports);

            // Extract unique areas based on filtered sports
            const uniqueAreas = [...new Set(foundByCity.map(s => s.location))];
            setAreaOptions(uniqueAreas);

            // Reset selection
            setSelectedSport("All");
            setSelectedArea("All");
        } catch (error) {
            console.log("Error fetching sport details:", error);
        }
    };

    const handleSportChange = (event) => {
        setSelectedSport(event.target.value);
        // Reset area selection when sport changes
        setSelectedArea("All");
    };

    const handleAreaChange = (event) => {
        setSelectedArea(event.target.value);
    };

    const filteredSports = searchCity.filter((sport) => {
        const sportMatch = (selectedSport === "All" || sport.type === selectedSport);
        const areaMatch = (selectedArea === "All" || sport.location === selectedArea);
        return sportMatch && areaMatch;
    });

    return (
        <div>
            <h2>Available Games in {city}</h2>
            <label htmlFor="sport-filter">Filter by Sport: </label>
            <select id="sport-filter" value={selectedSport} onChange={handleSportChange}>
                <option value="All">All</option>
                {sportsOptions.map((sport) => (
                    <option key={sport} value={sport}>{sport}</option>
                ))}
            </select>

            <label htmlFor="area-filter">Filter by Area:</label>
            <select id="area-filter" value={selectedArea} onChange={handleAreaChange}>
                <option value="All">All</option>
                {areaOptions.map((area) => (
                    <option key={area} value={area}>{area}</option>
                ))}
            </select>

            <div>
                {filteredSports.length > 0 ? (
                    <div className="sports-container">
                        {filteredSports.map((sport) => (
                            <Link to={`/sports/${sport.id}`} key={sport.id} className="sport-card">
                                <img src={sport.images[0]} alt={sport.name} style={{ width: '100%', maxWidth: '420px' }} />
                                <h2>{sport.name}</h2>
                                <p><strong>Sport:</strong> {sport.type}</p>
                                <p><strong>Price:</strong> ${sport.price}</p>
                                <p><strong>Rating:</strong> {sport.rating} *</p>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <h2> we will arrive soon to our {city}</h2>
                )}
            </div>
        </div>
    );
};

export default SearchByCity;
