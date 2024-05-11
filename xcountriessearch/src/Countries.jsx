import { useEffect, useState } from "react";

const Tile = ({name, img, alt}) => {
    return (
    <div 
        className="countryCard"
        style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "200px",
        border: "1px solid black",
        borderRadius: "8px",
        padding: "10px",
        marginLeft: "10px",
        marginTop :"10px"
    }}>
        <img src={img} alt={alt} style={{width: "100px", height: "100px"}}/>
        <h3>{name}</h3>
    </div>
    )
}

const Countries = () => {
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);

    const fetchCountries = async () => {
        try {
            const result = await fetch("https://restcountries.com/v3.1/all");
            const data = await result.json();
            setCountries(data);
            setFilteredCountries(data);
            return data;
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(()=> {
        fetchCountries();
    }, []);

    const handleChange = (e) => {
        const query = e.target.value;
        console.log(query);
        const newCountries = countries.filter((country) => country.name.common.includes(query));
        setFilteredCountries(newCountries);
    }

    return (
        <div style={{
            display:"flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px"
        }}>
            <div><input style={{width: "100vh", height: "30px"}} onChange={handleChange} type="text" placeholder="Search for countries..."/></div>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap"
            }}>
                {filteredCountries.map((country, idx) => <Tile key={idx} name={country.name.common} img={country.flags.png} alt={country.flags.alt}/>)}
            </div>
        </div>
    )
}

export default Countries;