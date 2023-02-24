import { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { predictAll } from "~/models/whoareyou.server";

export async function loader({ request }: LoaderArgs) {
    const url = new URL(request.url);
    const name = url.searchParams.get("name");
    return name ? predictAll(name) : null;
}

export default function Result() {
    const result = useLoaderData<typeof loader>();
    return result ? <div className="p-4">
        <h2 className="text-xl">Result for {result.age.name}</h2>
        <div>Age: {result.age.age}</div>
        <div>Gender: {result.gender.gender} (Probability: {result.gender.probability * 100}%)</div>
        <div>Nationality
            <ul className="list-disc list-inside">
                {result.nationality.country.map(country =>
                    (<li key={country.country_id}>{country.countryName || country.country_id} (Probability: {country.probability * 100}%)</li>))}
            </ul>
        </div>
    </div> : <div></div>
}