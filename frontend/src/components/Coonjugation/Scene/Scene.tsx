import { Button, Center } from "@mantine/core"
import { useGameCtx } from "../context"
import RunningScene from "./RunningScene/RunningScene"

const SetupScene = () => {
    const ctx = useGameCtx()

    return (
        <Center>
            <Button color="green" onClick={ctx.fn.game.start} disabled={ctx.data.words.length == 0}>
                Start game
            </Button>
        </Center>
    )
}

const CompletedScene = () => {
    return <>Completed</>
}

const Scene = () => {
    const { state } = useGameCtx().data

    switch (state) {
        case "running":
            return <RunningScene />
        case "completed":
            return <CompletedScene />
        default:
            return <SetupScene />
    }
}

export default Scene
