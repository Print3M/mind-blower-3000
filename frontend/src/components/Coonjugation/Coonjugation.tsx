import { useCallback, useState } from "react"
import SearchBar from "./SearchBar/SearchBar"
import { UUID } from "crypto"
import { v4 as uuidv4 } from "uuid"
import { Box, Button } from "@mantine/core"
import css from "./Coonjugation.module.css"
import { GameState, Word } from "./types"
import Words from "./Words/Words"
import { getConjugationWord } from "api/conjugation"
import { Language } from "consts/enums"

const Conjugation = () => {
    const [words, setWords] = useState<Word[]>([])
    const [gameState, setGameState] = useState<GameState>("beforeStart")

    const removeWord = useCallback(
        (uuid: UUID) => {
            setWords(words.filter(v => v.uuid !== uuid))
        },
        [words, setWords]
    )

    const updateWord = (uuid: UUID, word: Partial<Word>) => {
        setWords(words.map(i => (i.uuid == uuid ? { ...i, ...word } : i)))
    }

    const saveWord = async (text: string) => {
        // Set initial word value
        const word: Word = {
            uuid: uuidv4() as UUID,
            text,
            status: "loading",
        }
        const copyWords = [...words, word]
        setWords(copyWords)

        // Fetch conjugation data and update word
        const data = await getConjugationWord(Language.MK, word.text)
        setWords(copyWords.map(i => (i.uuid == word.uuid ? { ...i, data, status: "pending" } : i)))
    }

    const startGame = () => setGameState("running")

    return (
        <>
            <Box className={css.searchBar}>
                <SearchBar saveWord={saveWord} />
            </Box>
            <Words words={words} removeWord={removeWord} />
            <Button onClick={startGame} color="green">Start</Button>
        </>
    )
}

export default Conjugation
