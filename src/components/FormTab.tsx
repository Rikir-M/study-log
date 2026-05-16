import { Tabs } from "radix-ui";
import SessionForm from "./sessions/SessionForm";
import MistakeForm from "./mistakes/MistakeForm";

const FormTab = () => (
    <Tabs.Root
        className="flex flex-col"
        defaultValue="tab1"
    >
        <Tabs.List
            className="flex shrink-0 border-b"
            aria-label="Choose what to add"
        >
            <Tabs.Trigger
                className="flex h-[45px] flex-1 cursor-default select-none items-center justify-center px-5 leading-none outline-none first:rounded-tl-md last:rounded-tr-md text-white data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:focus:relative"
                value="tab1"
            >
                Session
            </Tabs.Trigger>
            <Tabs.Trigger
                className="flex h-[45px] flex-1 cursor-default select-none items-center justify-center px-5 leading-none outline-none first:rounded-tl-md last:rounded-tr-md text-white data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:focus:relative"
                value="tab2"
            >
                Mistake
            </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content
            className="grow rounded-b-md bg-white p-5 outline-none"
            value="tab1"
        >
            <SessionForm mode="add" />
        </Tabs.Content>
        <Tabs.Content
            className="grow rounded-b-md bg-white p-5 outline-none"
            value="tab2"
        >
            <MistakeForm mode="add" />
        </Tabs.Content>
    </Tabs.Root>
);

export default FormTab;
