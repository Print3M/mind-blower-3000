import { FC } from "react"
import { Word } from "../types"
import { Flex, Group, Loader, Pill } from "@mantine/core"
import { UUID } from "crypto"

interface Props {
    words: Word[]
    removeWord: (uuid: UUID) => void
}

const Words: FC<Props> = ({ removeWord, words }) => (
    <Group gap={5} justify="center" mt="md">
        {words.map(word => (
            <Pill
                key={word.uuid}
                size="lg"
                onRemove={() => removeWord(word.uuid)}
                opacity={word.status == "loading" ? 0.7 : 1}
                withRemoveButton={word.status != "loading"}
            >
                <Flex align="center" justify="center" gap={10}>
                    {word.status == "loading" && <Loader size={20} />} {word.text}
                </Flex>
            </Pill>
        ))}
    </Group>
)

export default Words
