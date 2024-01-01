import { Input, Table } from "@mantine/core"
import { FC } from "react"
import WordInput from "./WordInput"

interface Props {
    label: string
    data: string[]
    word: string
    readOnly?: boolean
    width?: number
}

const WordsTable: FC<Props> = ({ label, data, word, readOnly, width }) => (
    <Table w={width}>
        <Table.Thead>
            <Table.Tr>
                <Table.Th>{label}</Table.Th>
            </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
            {data.map((i, idx) => (
                <Table.Tr key={label + i + word + idx}>
                    <Table.Td>
                        {readOnly ? (
                            <Input variant="unstyled" value={i} w={width} readOnly />
                        ) : (
                            <WordInput word={i} />
                        )}
                    </Table.Td>
                </Table.Tr>
            ))}
        </Table.Tbody>
    </Table>
)

export default WordsTable
