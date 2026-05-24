import { AnimatePresence, motion, useMotionValue } from "motion/react";
import { Pen, Trash2 } from "lucide-react";
import { animate } from "motion";
import { Collapsible } from "radix-ui";
import { useState, type ReactNode } from "react";
import type { BaseItem } from "../types/baseItem";

interface ReviewSwipeCardProps<T extends BaseItem> {
    item: T;
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
    meta?: ReactNode
}

function getBaseType(type: string) {
    if (type.startsWith("SAT")) return "SAT";
    return type;
}

const typeColors: Record<string, string> = {
    SAT: "#F2CC8F",
    IELTS: "#84b59f",
    Italian: "#E07A5F",
    Project: "#3D405B",
};

export default function ReviewSwipeCard<T extends BaseItem>({
    item,
    onEdit,
    onDelete,
    meta,
}: ReviewSwipeCardProps<T>) {
    const x = useMotionValue(0);
    const [open, setOpen] = useState(false);
    const [hasDragged, setHasDragged] = useState(false);

    const baseColor = getBaseType(item.type);
    const bgColor = typeColors[baseColor] || "#84b59f";

    const handleDragEnd = () => {
        const currentX = x.get();

        // left swipe
        if (currentX < -50) {
            console.log("DELETE");
            onDelete?.(item);
        }

        // right swipe
        else if (currentX > 50) {
            console.log("EDIT");
            onEdit?.(item);
        }

        animate(x, 0, {
            type: "spring",
            stiffness: 400,
            damping: 30,
        });

        setTimeout(() => {
            setHasDragged(false);
        }, 0);
    };

    return (
        <div className="relative w-full rounded-2xl shadow-md overflow-hidden text-white">
            <div
                className="background absolute inset-0 flex items-center justify-between px-4 opacity-80"
                style={{ backgroundColor: bgColor }}
            >
                <div className="edit">
                    <Pen size={20} />
                </div>
                <div className="delete">
                    <Trash2 size={20} />
                </div>
            </div>
            <motion.div
                drag="x"
                style={{ x, backgroundColor: bgColor }}
                dragElastic={0.05}
                dragConstraints={{ left: -40, right: 40 }}
                dragMomentum={false}
                whileDrag={{ cursor: "grabbing" }}
                onDragStart={() => setHasDragged(true)}
                onDragEnd={handleDragEnd}
                className="x foreground relative p-5 rounded-2xl shadow-md cursor-grab"
            >
                <Collapsible.Root open={open}>
                    <Collapsible.Trigger asChild>
                        <div
                            className="cursor-pointer"
                            onClick={() => {
                                if (hasDragged) return;
                                setOpen((prev) => !prev);
                            }}
                        >
                            <div className="flex items-start justify-between font-shantell">
                                <div className="flex flex-col">
                                    <span className="text-lg font-bold">
                                        {item.type}
                                    </span>
                                    {/* <span className="text-sm">
                                        Score:{" "}
                                        {session.score !== null
                                            ? session.score
                                            : "N/A"}
                                    </span>
                                    <span className="text-sm">
                                        Duration: {session.duration} mins
                                    </span> */}
                                    {meta}
                                </div>

                                <span className="text-sm">
                                    {new Date(
                                        item.created_at,
                                    ).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </Collapsible.Trigger>

                    <AnimatePresence initial={false}>
                        {open && (
                            <Collapsible.Content forceMount asChild>
                                <motion.div
                                    initial={{
                                        height: 0,
                                        opacity: 0,
                                    }}
                                    animate={{
                                        height: "auto",
                                        opacity: 1,
                                    }}
                                    exit={{
                                        height: 0,
                                        opacity: 0,
                                    }}
                                    transition={{
                                        duration: 0.25,
                                        ease: "easeInOut",
                                    }}
                                    className="overflow-hidden"
                                >
                                    <div className="detail pt-2">
                                        {item.note || "No notes."}
                                    </div>
                                </motion.div>
                            </Collapsible.Content>
                        )}
                    </AnimatePresence>
                </Collapsible.Root>
            </motion.div>
        </div>
    );
}
