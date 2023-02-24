import { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { doSearch } from "~/models/whoareyou.server";

export async function loader({ request }: LoaderArgs) {
    const url = new URL(request.url);
    const name = url.searchParams.get("name");
    invariant(name, "name not found");
    return doSearch(name);
}

export default function Result() {
    const result = useLoaderData<typeof loader>();
    return <div>
        <h2>Your result</h2>
        <ul>
            <li>Gender: {result.gender}</li>
            <li>Name: {result.name}</li>
            <li>Probability: {result.probability}</li>
            <li>Count: {result.count}</li>
        </ul>
    </div>
}