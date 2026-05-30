import SessionForm from "./sessions/SessionForm";
import MistakeForm from "./mistakes/MistakeForm";
import AppTabs from "./AppTabs";
import { useState } from "react";
import { X } from "lucide-react";
import { Dialog } from "radix-ui";
import IconBtn from "./IconBtn";

export default function FormTab() {
    const [activeTab, setActiveTab] = useState("sessions");
    const tabs = [
        {
            value: "session",
            label: "Session",
            content: <SessionForm mode="add" />,
        },
        {
            value: "mistake",
            label: "Mistake",
            content: <MistakeForm mode="add" />,
        },
    ];
    return (
        <AppTabs
            id="form-tab"
            value={activeTab}
            onValueChange={setActiveTab}
            tabs={tabs}
            rightSlot={
                <Dialog.Close asChild>
                    <IconBtn icon={X} className="absolute top-6 right-4" />
                </Dialog.Close>
            }
        />
    );
}
