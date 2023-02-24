import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getNoteListItems } from "~/models/note.server";
import { requireUserId } from "~/session.server";
import { useOptionalUser } from "~/utils";

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const noteListItems = await getNoteListItems({ userId });
  return json({ noteListItems });
}

export default function NotesPage() {
  const data = useLoaderData<typeof loader>();
  const user = useOptionalUser();

  return (

    <main className="flex h-full bg-white">
      <h1>Welcome</h1>
    </main>

  );
}
