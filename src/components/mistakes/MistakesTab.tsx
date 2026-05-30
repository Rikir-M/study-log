import ReviewSwipeCard from "../ReviewSwipeCard";
import type { Session } from "../../types/session";
import type { Mistake } from "../../types/mistake";

interface Props {
    mistakes: Mistake[];
    onEdit: (item: Session | Mistake) => void;
    onDelete: (item: Session | Mistake) => void;
}

export default function MistakesTab({
    mistakes,
    onEdit,
    onDelete,
}: Props) {
    if (mistakes.length === 0) {
        return (
            <p className="text-center">
                There's no mistake? Woah, nice...
            </p>
        );
    }

    return (
        <div className="space-y-3">
            {mistakes.map((mistake) => (
                <ReviewSwipeCard
                    key={mistake.id}
                    item={mistake}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    meta={
                        <span className="text-sm">
                            Topic: {mistake.topic}
                        </span>
                    }
                />
            ))}
        </div>
    );
}