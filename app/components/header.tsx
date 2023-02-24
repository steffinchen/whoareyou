import { Link, Form } from "@remix-run/react";
import { useOptionalUser } from "~/utils";

export default function Header() {
    const user = useOptionalUser();
    return (
        <header className="flex justify-between bg-slate-800 p-4 text-white">
            <nav className="flex flex-row flex-start gap-3">
                <h1 className="text-3xl font-bold">
                    <Link to="notes">Notes</Link>
                </h1>
                <h1 className="text-3xl font-bold">
                    <Link to="whoareyou">Who Are You</Link>
                </h1>
            </nav>

            {user ? (
                <div className="flex flex-row items-center justify-center">
                    <p className="mr-2">{user.email}</p>
                    <Form action="/logout" method="post">
                        <button
                            type="submit"
                            className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
                        >
                            Logout
                        </button>
                    </Form>
                </div>
            ) : (
                <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                    <Link
                        to="/join"
                        className="flex items-center justify-center rounded-md border px-4 py-3 text-base font-medium text-blue-700 shadow-sm hover:bg-blue-50 sm:px-8"
                    >
                        Sign up
                    </Link>
                    <Link
                        to="/login"
                        className="flex items-center justify-center rounded-md bg-blue-500 px-4 py-3 font-medium text-white hover:bg-blue-600"
                    >
                        Log In
                    </Link>
                </div>
            )}

        </header>
    );
}