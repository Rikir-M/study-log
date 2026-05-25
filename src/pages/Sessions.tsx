import { useLoaderData } from "react-router";
import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import ReviewSwipeCard from "../components/ReviewSwipeCard";
import type { Session } from "../types/session";
import type { Mistake } from "../types/mistake";
import Edit from "../components/Edit";
import Alert from "../components/Alert";
import { motion, AnimatePresence } from "motion/react";
import SearchSection from "../components/SearchSection";

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

    const [activeTab, setActiveTab] = useState("sessions");

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
            <Tabs.Root value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="flex items-center justify-between">
                    <Tabs.List className="flex gap-5 h-10">
                        <Tabs.Trigger
                            value="sessions"
                            // text-shadow trick instead of font-semibold to prevent the layout shifting too much
                            className="font-shantell text-xl pb-2 relative data-[state=active]:[text-shadow:_0.5px_0_0_currentColor] focus:outline-none"
                        >
                            Sessions
                            {activeTab === "sessions" && (
                                <motion.div 
                                    layoutId="active-line"
                                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"
                                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                />
                            )}
                        </Tabs.Trigger>

                        <Tabs.Trigger
                            value="mistakes"
                            className="font-shantell text-xl pb-2 relative data-[state=active]:[text-shadow:_0.5px_0_0_currentColor] focus:outline-none"
                        >
                            Mistakes
                            {activeTab === "mistakes" && (
                                <motion.div 
                                    layoutId="active-line"
                                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"
                                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                />
                            )}
                        </Tabs.Trigger>
                    </Tabs.List>
                    <SearchSection />
                </div>

                <AnimatePresence mode="wait">
                    {activeTab === "sessions" && (
                        <Tabs.Content value="sessions" asChild>
                            <motion.div
                                key="sessions-panel"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="mt-4 space-y-3"
                            >
                                {sessions.length < 1 && (
                                    <p className="text-center">There's no session :)</p>
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
                            </motion.div>
                        </Tabs.Content>
                    )}

                    {activeTab === "mistakes" && (
                        <Tabs.Content value="mistakes" asChild>
                            <motion.div
                                key="mistakes-panel"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="mt-4 space-y-3"
                            >
                                {mistakes.length < 1 && (
                                    <p className="text-center">There's no mistake. Woah, nice...</p>
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
                            </motion.div>
                        </Tabs.Content>
                    )}
                </AnimatePresence>
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
