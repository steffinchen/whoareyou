
export async function doSearch(name: string) {
    const res = await fetch(`https://api.genderize.io?name=${name}`);
    const json = await res.json();
    return json;
}