import { Table } from "@radix-ui/themes";
import type { Session } from "../types/session";
import { useLoaderData } from "react-router";

export default function Sessions() {
    const { sessions } = useLoaderData() as { sessions: Session[] };

    return (
        <Table.Root className="w-[90%] mx-auto mt-10 bg-primary rounded-lg shadow-black shadow-md p-4">
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell className="text-white">
                        Session Type
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="text-white">
                        Duration
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="text-white">
                        Score
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="text-white">
                        Note
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="text-white">
                        Created At
                    </Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {sessions.map((session) => (
                    <Table.Row key={session.id}>
                        <Table.Cell className="text-white">
                            {session.type}
                        </Table.Cell>
                        <Table.Cell className="text-white">
                            {session.duration} mins
                        </Table.Cell>
                        <Table.Cell className="text-white">
                            {session.score ?? "N/A"}
                        </Table.Cell>
                        <Table.Cell className="text-white">
                            {session.note ?? "N/A"}
                        </Table.Cell>
                        <Table.Cell className="text-white">
                            {new Date(session.created_at).toLocaleDateString()}
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    );
}
