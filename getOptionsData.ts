let key = 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==';
let baseUrl = 'https://api.countrystatecity.in/v1';

export const getCountries = async () => {
    try {
        const url = `${baseUrl}/countries`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "X-CSCAPI-KEY": key,
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();
        return data;
    } catch (err) {
        return `get countries error`;
    }
};

export const getStates = async (countryName: string) => {
    try {
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
        return data;
    } catch (err) {
        return `get states error`;
    }
};

export const getCities = async (country: string, state: string) => {
    try {
        const states = await getStates("India");
        const stateO = states.find((s: any) => s.name.toLowerCase() === state.toLowerCase());

        const url = `${baseUrl}/countries/${stateO.country_iso2}/states/${stateO.iso2}/cities`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "X-CSCAPI-KEY": key,
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();
        return data;
    } catch (err) {
        return `get cities error`;
    }
};


// Experience levels
export const experiences = [
    "Internship",
    "Fresher",
    "1 year",
    "2 year",
    "3 year",
    "4 year",
    "5 year",
    "6 year",
    "7 year",
    "8 year",
    "Above 8 year",
    "Senior",
    "Director",
    "Executive",
];

// Job Type 
export const JobTypes = [
    "Full Time",
    "Permanent",
    "Contract",
];

// Job Mode
export const JobMode = [
    "Hybrid",
    "On Site",
    "Remote",
];
