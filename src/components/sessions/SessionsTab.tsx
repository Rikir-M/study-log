import ReviewSwipeCard from "../ReviewSwipeCard";
import type { Session } from "../../types/session";
import type { Mistake } from "../../types/mistake";

interface Props {
    sessions: Session[];
    onEdit: (item: Session | Mistake) => void;
    onDelete: (item: Session | Mistake) => void;
}

export default function SessionsTab({
    sessions,
    onEdit,
    onDelete,
}: Props) {
    if (sessions.length === 0) {
        return (
            <p className="text-center">
                There's no session. Dude...
            </p>
        );
    }

    return (
        <div className="space-y-3">
            {sessions.map((session) => (
                <ReviewSwipeCard
                    key={session.id}
                    item={session}
                    onEdit={onEdit}
                    onDelete={onDelete}
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
        </div>
    );
}