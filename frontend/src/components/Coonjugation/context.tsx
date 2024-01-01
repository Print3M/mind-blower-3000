import { FC, createContext, useCallback, useContext, useState } from "react"
import { GameState, Word } from "./types"
import { UUID } from "crypto"
import { v4 as uuidv4, NIL as NIL_UUID } from "uuid"
import { getConjugationWord } from "api/conjugation"
import { Language } from "consts/enums"

interface GameContextData {
    state: GameState
    words: Word[]
    currentWord: Word
}

interface GameContextFunctions {
    game: {
        start: () => void
        setup: () => void
        completed: () => void
    }
    words: {
        save: (text: string) => Promise<void>
        update: (uuid: UUID, v: Partial<Word>) => void
        remove: (uuid: UUID) => void
        next: () => void
        prev: () => void
        getCurrentIdx: () => number
    }
}

interface GameContextType {
    data: GameContextData
    fn: GameContextFunctions
}

const initState: GameContextData = {
    state: "setup",
    words: [],
    currentWord: {
        uuid: NIL_UUID as UUID,
        text: "",
        status: "pending",
    },
}

const GameCtx = createContext<GameContextType>(null!)

interface Props {
    children: JSX.Element
}

export const GameCtxProvider: FC<Props> = ({ children }) => {
    const [data, __setData] = useState<GameContextData>(initState)

    const setWords = (v: GameContextData["words"]) => __setData(prev => ({ ...prev, words: v }))
    const setState = (v: GameContextData["state"]) => __setData(prev => ({ ...prev, state: v }))
    const setCurrentWord = (word: Word) => __setData(prev => ({ ...prev, currentWord: word }))

    const removeWord = useCallback(
        (uuid: UUID) => {
            setWords(data.words.filter(v => v.uuid !== uuid))
        },
        [data.words, setWords]
    )

    const updateWord = useCallback(
        (uuid: UUID, word: Partial<Word>) => {
            setWords(data.words.map(i => (i.uuid == uuid ? { ...i, ...word } : i)))
        },
        [data.words, setWords]
    )

    const saveWord = useCallback(
        async (text: string) => {
            // Set initial word value
            const word: Word = {
                uuid: uuidv4() as UUID,
                text,
                status: "loading",
            }
            const copyWords = [...data.words, word]
            setWords(copyWords)

            // Fetch conjugation data and update word
            const fetched = await getConjugationWord(Language.MK, word.text)
            setWords(
                copyWords.map(i =>
                    i.uuid == word.uuid ? { ...i, data: fetched, status: "pending" } : i
                )
            )
        },
        [data.words, setWords]
    )

    const getCurrentIdx = useCallback(
        () => data.words.findIndex(i => i.uuid == data.currentWord.uuid),
        [data.words, data.currentWord]
    )

    const nextWord = useCallback(() => {
        updateWord(data.currentWord.uuid, { status: "completed" })
        const idx = getCurrentIdx() + 1

        if (idx >= data.words.length) return

        setCurrentWord(data.words[idx])
    }, [data.words, setCurrentWord, getCurrentIdx])

    const prevWord = useCallback(() => {
        updateWord(data.currentWord.uuid, { status: "pending" })
        const idx = getCurrentIdx() - 1

        if (idx < 0) return

        setCurrentWord(data.words[idx])
    }, [data.words, getCurrentIdx, setCurrentWord])

    const startGame = useCallback(() => {
        if (data.words.length == 0) return

        setCurrentWord(data.words[0])
        setState("running")
    }, [data, setCurrentWord, setState])

    return (
        <GameCtx.Provider
            value={{
                data,
                fn: {
                    game: {
                        start: startGame,
                        setup: () => setState("setup"),
                        completed: () => setState("completed"),
                    },
                    words: {
                        save: saveWord,
                        update: updateWord,
                        remove: removeWord,
                        next: nextWord,
                        prev: prevWord,
                        getCurrentIdx,
                    },
                },
            }}
        >
            {children}
        </GameCtx.Provider>
    )
}

export const useGameCtx = () => useContext(GameCtx)
