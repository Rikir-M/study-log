import { useLoaderData } from "react-router";
import { useState } from "react";

import AppTabs from "../components/AppTabs";
import SessionsTab from "../components/sessions/SessionsTab";
import MistakesTab from "../components/mistakes/MistakesTab";
import SearchSection from "../components/SearchSection";

import Edit from "../components/Edit";
import Alert from "../components/Alert";

import type { Session } from "../types/session";
import type { Mistake } from "../types/mistake";

export type ActionTarget =
    | { type: "session"; data: Session }
    | { type: "mistake"; data: Mistake };

export default function Sessions() {
    const { sessions, mistakes } = useLoaderData() as {
        sessions: Session[];
        mistakes: Mistake[];
    };

    const [activeTab, setActiveTab] = useState("sessions");

    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const [editTarget, setEditTarget] = useState<ActionTarget | null>(null);

    const [deleteTarget, setDeleteTarget] = useState<ActionTarget | null>(null);

    const handleEdit = (item: Session | Mistake) => {
        if ("duration" in item) {
            setEditTarget({
                type: "session",
                data: item,
            });
        } else {
            setEditTarget({
                type: "mistake",
                data: item,
            });
        }

        setEditOpen(true);
    };

    const handleDelete = (item: Session | Mistake) => {
        if ("duration" in item) {
            setDeleteTarget({
                type: "session",
                data: item,
            });
        } else {
            setDeleteTarget({
                type: "mistake",
                data: item,
            });
        }

        setDeleteOpen(true);
    };

    const tabs = [
        {
            value: "sessions",
            label: "Sessions",
            content: (
                <SessionsTab
                    sessions={sessions}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            ),
        },
        {
            value: "mistakes",
            label: "Mistakes",
            content: (
                <MistakesTab
                    mistakes={mistakes}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            ),
        },
    ];

    return (
        <>
            <AppTabs
                id="sessions-page-tabs"
                value={activeTab}
                onValueChange={setActiveTab}
                tabs={tabs}
                rightSlot={<SearchSection />}
            />

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
        </>
    );
}
