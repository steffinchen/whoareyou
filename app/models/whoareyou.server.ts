import { AgePrediction } from "./age-prediction.type";
import { GenderPrediction } from "./gender-prediction.type";
import { NationalityPrediction } from "./nationality-prediction.type";

export async function predictAll(name: string) {
    const [age, gender, nationality] = await Promise.all([predictAge(name), predictGender(name), predictNationality(name)]);
    return { age, gender, nationality }
}

export async function predictGender(name: string): Promise<GenderPrediction> {
    return makeCall(name, `https://api.genderize.io`);
}

export async function predictAge(name: string): Promise<AgePrediction> {
    return makeCall(name, `https://api.agify.io`);

}

export async function predictNationality(name: string): Promise<NationalityPrediction> {
    const result: NationalityPrediction = await makeCall(name, `https://api.nationalize.io`);
    const countryCodes = result.country.map(c => c.country_id);
    const countries = await lookUpCountryCodes(countryCodes);
    const updatedCountries = result.country.map(c => {
        return { ...c, countryName: countries.find((cc: { cca2: string }) => cc.cca2 == c.country_id).name.common }
    });
    return { ...result, country: updatedCountries };

}

export async function lookUpCountryCodes(codes: string[]) {
    const res = await fetch(`https://restcountries.com/v3.1/alpha?codes=${codes.join(",")}`)
    return await res.json();
}

async function makeCall(name: string, url: string) {
    const res = await fetch(`${url}?name=${name}`)
    return await res.json();
}
