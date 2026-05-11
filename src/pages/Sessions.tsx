import { DropdownMenu, Flex, IconButton, Table } from "@radix-ui/themes";
import type { Session } from "../types/session";
import { useLoaderData } from "react-router";
import { EllipsisVertical } from "lucide-react";

export default function Sessions() {
    const { sessions } = useLoaderData() as { sessions: Session[] };

    return (
        <Table.Root variant="surface" className="lg:w-[70%] mx-auto" layout='fixed'>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell width="20%">
                        Session Type
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell width="10%">
                        Duration
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell width="10%">
                        Score
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell width="40%">
                        Note
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell width="10%">
                        Created At
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell width="10%">
                    </Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body className="">
                {sessions.map((session) => (
                    <Table.Row key={session.id}>
                        <Table.Cell>
                            {session.type}
                        </Table.Cell>
                        <Table.Cell>
                            {session.duration} mins
                        </Table.Cell>
                        <Table.Cell>
                            {session.score ?? "N/A"}
                        </Table.Cell>
                        <Table.Cell className="truncate">
                            {session.note ?? "N/A"}
                        </Table.Cell>
                        <Table.Cell>
                            {new Date(session.created_at).toLocaleDateString()}
                        </Table.Cell>
                        <Table.Cell>
                            <Flex flexGrow="1" justify="end">
                                <DropdownMenu.Root>
                                    <DropdownMenu.Trigger>
                                        <IconButton
                                            color="gray"
                                            variant="ghost"
                                        >
                                            <EllipsisVertical/>
                                        </IconButton>
                                    </DropdownMenu.Trigger>
                                    <DropdownMenu.Content
                                        variant="soft"
                                    >
                                        <DropdownMenu.Item>View detail</DropdownMenu.Item>
                                        <DropdownMenu.Item>Edit</DropdownMenu.Item>
                                        <DropdownMenu.Separator />
                                        <DropdownMenu.Item color="red">
                                            Remove
                                        </DropdownMenu.Item>
                                    </DropdownMenu.Content>
                                </DropdownMenu.Root>
                            </Flex>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    );
}
