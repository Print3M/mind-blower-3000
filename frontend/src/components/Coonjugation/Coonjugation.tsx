import { useCallback, useState } from "react"
import SearchBar from "./SearchBar/SearchBar"
import { UUID } from "crypto"
import { v4 as uuidv4 } from "uuid"
import { Box, Group, Pill } from "@mantine/core"
import css from "./Coonjugation.module.css"

interface Word {
    uuid: UUID
    text: string
}

const Conjugation = () => {
    const [words, setWords] = useState<Word[]>([])

    const saveWord = useCallback(
        (word: string) => {
            setWords([
                ...words,
                {
                    uuid: uuidv4() as UUID,
                    text: word,
                },
            ])
        },
        [words, setWords]
    )

    const removeWord = useCallback(
        (uuid: UUID) => {
            setWords(words.filter(v => v.uuid !== uuid))
        },
        [words, setWords]
    )

    return (
        <>
            <Box className={css.searchBar}>
                <SearchBar saveWord={saveWord} />
            </Box>
            <Group gap={5} justify="center" mt="md">
                {words.map(i => (
                    <Pill
                        key={i.uuid}
                        size="lg"
                        onRemove={() => removeWord(i.uuid)}
                        withRemoveButton
                    >
                        {i.text}
                    </Pill>
                ))}
            </Group>
        </>
    )
}

export default Conjugation
