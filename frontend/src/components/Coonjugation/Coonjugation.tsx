import SearchBar from "./SearchBar/SearchBar"
import { Space } from "@mantine/core"
import { GameCtxProvider, useGameCtx } from "./context"
import WordsDisplay from "./WordsDisplay/WordsDisplay"
import Scene from "./Scene/Scene"

const Game = () => {
    const ctx = useGameCtx()

    return (
        <>
            {ctx.data.state == "setup" && <SearchBar />}
            <WordsDisplay />
            <Space h={40} />
            <Scene />
        </>
    )
}

const Conjugation = () => (
    <GameCtxProvider>
        <Game />
    </GameCtxProvider>
)

export default Conjugation
