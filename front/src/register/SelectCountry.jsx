import { useEffect, useState } from "react";

export const SelectCountry = ({onChange, id, name, className}) => {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState({});
    const [userCountry, setUserCountry] = useState();
  
    useEffect(() => {
      fetch(
        "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
      )
        .then((response) => response.json())
        .then((data) => {
          setCountries(data.countries);
          setSelectedCountry(data.userSelectValue);
          setUserCountry(data.userSelectValue.label)
        });
    }, []);

    const handleChange = (event) => {
        const value = event.target.value;
        onChange(value);
        setUserCountry(value)
      };

  return (
        <select name={name} 
                id={id}
                className = {className}
                value = {userCountry}
                onChange = {handleChange}
        >
            {countries.map((country) => (
            <option key={country.value} value={country.label}>
                {country.label}
            </option>
            ))}
        </select>
  )
}
