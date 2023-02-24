export interface NationalityPrediction {
    name: string;
    country: {
        country_id: string;
        probability: number;
        countryName?: string;
    }[];
}