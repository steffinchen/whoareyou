
import { Form, Outlet, useSearchParams } from "@remix-run/react";
import * as React from "react";
import { ActionArgs, json, redirect } from "@remix-run/node";
import { requireUserId } from "~/session.server";

export async function action({ request }: ActionArgs) {
    const formData = await request.formData();
    const name = formData.get("name");

    if (typeof name !== "string" || name.length === 0) {
        return json(
            { errors: { name: "Name is required", body: null } },
            { status: 400 }
        );
    }

    return redirect(`/whoareyou?name=${name}`);
}

export default function WhoAreYouIndexPage() {
    const nameRef = React.useRef<HTMLInputElement>(null);

    const [searchParams] = useSearchParams();
    const name = searchParams.get("name") ?? "";

    return (
        <div className="flex h-full min-h-screen flex-col">
            <div className="p-4">
                <Form
                    method="get"
                    action="?index"
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 8,
                        width: "80%",
                    }}
                >
                    <div>
                        <label className="flex w-full flex-col gap-1">
                            <input
                                ref={nameRef}
                                placeholder="Your Name"
                                name="name"
                                defaultValue={name}
                                className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"

                            />
                        </label>
                    </div>
                    <button type="submit"
                        className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400">Go</button>
                </Form>
            </div>
            <Outlet></Outlet>
        </div>
    );


}