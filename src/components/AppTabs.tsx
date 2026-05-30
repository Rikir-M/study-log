import * as Tabs from "@radix-ui/react-tabs";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";

export interface TabConfig {
    value: string;
    label: string;
    content: ReactNode;
}

interface AppTabsProps {
    id: string;
    value: string;
    onValueChange: (value: string) => void;
    tabs: TabConfig[];
    rightSlot?: ReactNode;
}

export default function AppTabs({
    id = "tabs",
    value,
    onValueChange,
    tabs,
    rightSlot,
}: AppTabsProps) {
    return (
        <Tabs.Root
            value={value}
            onValueChange={onValueChange}
            className="w-full"
        >
            <div className="flex items-center justify-between">
                <Tabs.List className="flex gap-5 h-10">
                    {tabs.map((tab) => (
                        <Tabs.Trigger
                            key={tab.value}
                            value={tab.value}
                            className="font-shantell text-xl pb-2 relative data-[state=active]:[text-shadow:_0.5px_0_0_currentColor] focus:outline-none"
                        >
                            {tab.label}

                            {value === tab.value && (
                                <motion.div
                                    layoutId={`${id}-active-line`}
                                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"
                                    transition={{
                                        type: "spring",
                                        stiffness: 380,
                                        damping: 30,
                                    }}
                                />
                            )}
                        </Tabs.Trigger>
                    ))}
                </Tabs.List>

                {rightSlot}
            </div>

            <AnimatePresence mode="wait">
                {tabs.map((tab) => {
                    if (tab.value !== value) return null;

                    return (
                        <Tabs.Content
                            key={tab.value}
                            value={tab.value}
                            forceMount
                            asChild
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{
                                    duration: 0.3,
                                    ease: "easeInOut",
                                }}
                                className="mt-4"
                            >
                                {tab.content}
                            </motion.div>
                        </Tabs.Content>
                    );
                })}
            </AnimatePresence>
        </Tabs.Root>
    );
}
