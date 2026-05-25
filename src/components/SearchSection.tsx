import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Dialog } from "radix-ui";
import IconBtn from "./IconBtn";
import { useState } from "react";

export default function SearchSection() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                <IconBtn icon={Search} />
            </Dialog.Trigger>

            <AnimatePresence>
                {open && (
                    <Dialog.Portal forceMount>
                        <Dialog.Overlay>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/40"
                            />
                        </Dialog.Overlay>

                        <Dialog.Content asChild>
                            <motion.div
                                initial={{y: "-100%"}}
                                animate={{y: 0}}
                                exit={{y: "-100%"}}
                                transition={{ type: "spring", damping: 18 }}
                                className="fixed top-0 left-0 right-0 h-[30vh] bg-background shadow-xl flex flex-col items-center justify-center"
                            >
                                <Dialog.Close asChild>
                                    <IconBtn icon={X} className="absolute top-4 right-4" />
                                </Dialog.Close>
                                <div className="relative">
                                    <Search height={40} width={20} className="absolute left-0"/>
                                    <input id="search" type="text" className="outline-none border-b border-b-black border-b-3 w-[250px] h-[40px] bg-transparent px-7" />
                                </div>
                                <span className="text-sm">Search through sessions or mistakes</span>
                            </motion.div>
                        </Dialog.Content>
                    </Dialog.Portal>
                )}
            </AnimatePresence>
        </Dialog.Root>
    )
}