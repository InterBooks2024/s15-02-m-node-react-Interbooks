import { useEffect, useState } from "react";

export const SelectCountry = ({onChange}) => {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState({});
    const [userCountry, setUserCountry] = useState(selectedCountry);
  
    useEffect(() => {
      fetch(
        "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
      )
        .then((response) => response.json())
        .then((data) => {
          setCountries(data.countries);
          setSelectedCountry(data.userSelectValue);
          setUserCountry(selectedCountry)
        });
    }, []);

    const handleChange = (event) => {
        const value = event.target.value;
        setUserCountry(value)
        onChange(value);
      };

  return (
        <select name="select" 
                className="my-2 px-[20px] w-full outline-none border-2 border-zinc-400 rounded-[20px] text-base h-10 placeholder:text-zinc-300" 
                value={userCountry}
                onChange={handleChange}
        >
            {countries.map((country) => (
            <option key={country.value} value={country.label}>
                {country.label}
            </option>
            ))}
        </select>
  )
}
