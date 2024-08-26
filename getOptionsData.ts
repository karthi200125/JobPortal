
let key = process.env.CUNTRY_STATE_CITY_KEY;
let baseUrl = process.env.CUNTRY_STATE_CITY_BASEURL

export const getCountries = async () => {
    try {
        const url = `${baseUrl}/countriescountries`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "X-CSCAPI-KEY": key,
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();

        return data.map((country: any) => country.name);
    } catch (err) {
        return "get countries error";
    }
};

export const getStates = async (countryName: string) => {
    try {
        console.log(countryName)
        const countries = await getCountries();
        const country = countries.find((c: any) => c.name.toLowerCase() === countryName.toLowerCase());

        const url = `${baseUrl}/countries/${country.iso2}/states`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "X-CSCAPI-KEY": key,
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();

        return data.map((state: any) => state.name);        
    } catch (err) {
        return "get states error";
    }
};

export const getCities = async (countryName: string, stateName: string) => {
    try {
        const states = await getStates(countryName);
        const state = states.find((s: any) => s.name.toLowerCase() === stateName.toLowerCase());

        const url = `${baseUrl}/countries/${state.iso2}/states/${state.iso2}/cities`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "X-CSCAPI-KEY": key,
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();
        return data.map((city: any) => city.name).sort();
    } catch (err) {
        return "get cities error";
    }
};

// Experience levels
export const experiences = [
    "Internship",
    "Entry Level",
    "Associate",
    "Mid Senior",
    "Director",
    "Executive",
];

// Job Type 
export const JobTypes = [
    "Internship",
    "Entry Level",
    "Associate",
    "Mid Senior",
    "Director",
    "Executive",
];

// Job Mode
export const JobMode = [
    "Internship",
    "Entry Level",
    "Associate",
    "Mid Senior",
    "Director",
    "Executive",
];
