import { useLoaderData } from "react-router";
import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import ReviewSwipeCard from "../components/ReviewSwipeCard";
import type { Session } from "../types/session";
import type { Mistake } from "../types/mistake";
import Edit from "../components/Edit";
import Alert from "../components/Alert";

export type ActionTarget =
    | { type: "session"; data: Session }
    | { type: "mistake"; data: Mistake };

export default function Sessions() {
    const { sessions, mistakes } = useLoaderData() as {
        sessions: Session[];
        mistakes: Mistake[];
    };

    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const [deleteTarget, setDeleteTarget] = useState<ActionTarget | null>(null);
    const [editTarget, setEditTarget] = useState<ActionTarget | null>(null);

    const handleEdit = (item: Session | Mistake) => {
        if ("duration" in item) {
            setEditTarget({ type: "session", data: item });
        } else {
            setEditTarget({ type: "mistake", data: item });
        }

        setEditOpen(true);
    };

    const handleDelete = (item: Session | Mistake) => {
        if ("duration" in item) {
            setDeleteTarget({ type: "session", data: item });
        } else {
            setDeleteTarget({ type: "mistake", data: item });
        }

        setDeleteOpen(true);
    };

    return (
        <div className="w-full">
            <Tabs.Root defaultValue="sessions" className="w-full">
                <Tabs.List className="flex gap-5 h-10">
                    <Tabs.Trigger
                        value="sessions"
                        className="border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:font-semibold"
                    >
                        Sessions
                    </Tabs.Trigger>

                    <Tabs.Trigger
                        value="mistakes"
                        className="border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:font-semibold"
                    >
                        Mistakes
                    </Tabs.Trigger>
                </Tabs.List>

                <Tabs.Content value="sessions" className="mt-4 space-y-3">
                    {sessions.length < 1 && (
                        <p className="text-center">There's no session.</p>
                    )}
                    {sessions.map((session) => (
                        <ReviewSwipeCard
                            key={session.id}
                            item={session}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            meta={
                                <>
                                    <span className="text-sm">
                                        Score: {session.score ?? "N/A"}
                                    </span>
                                    <span className="text-sm">
                                        Duration: {session.duration} mins
                                    </span>
                                </>
                            }
                        />
                    ))}
                </Tabs.Content>

                <Tabs.Content value="mistakes" className="mt-4 space-y-3">
                    {mistakes.length < 1 && (
                        <p className="text-center">There's no mistake.</p>
                    )}
                    {mistakes.map((mistake) => (
                        <ReviewSwipeCard
                            key={mistake.id}
                            item={mistake}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            meta={
                                <span className="text-sm">
                                    Topic: {mistake.topic}
                                </span>
                            }
                        />
                    ))}
                </Tabs.Content>
            </Tabs.Root>

            <Edit
                open={editOpen}
                onOpenChange={setEditOpen}
                item={editTarget}
            />

            <Alert
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                item={deleteTarget}
            />
        </div>
    );
}
