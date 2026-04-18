import { useEffect, useState } from "react";
import { Table } from "@radix-ui/themes";
import { getSessions } from "../api/sessions";
import type { Session } from "../types/session";

export default function Sessions() {
    const [sessions, setSessions] = useState<Session[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getSessions();
            setSessions(data);
        };
        fetchData();
    }, []);

    return (
		
        <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell>
                        Session Type
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Duration</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Score</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Created At</Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {sessions.map((session) => (
                    <Table.Row key={session.id}>
                        <Table.RowHeaderCell>
                            {session.type}
                        </Table.RowHeaderCell>
                        <Table.Cell>{session.duration} mins</Table.Cell>
                        <Table.Cell>{session.score ?? "N/A"}</Table.Cell>
                        <Table.Cell>
                            {new Date(session.created_at).toLocaleDateString()}
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    );
}
