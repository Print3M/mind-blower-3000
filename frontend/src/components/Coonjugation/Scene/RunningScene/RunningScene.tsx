import { Alert, Button, Center, Flex, Space, Title } from "@mantine/core"
import { useGameCtx } from "components/Coonjugation/context"
import WordsTable from "./WordsTable"
import { MK_grammarPersons } from "./consts"

const RunningScene = () => {
    const ctx = useGameCtx()
    const word = ctx.data.currentWord

    if (!word.data) {
        return <Alert color="red">{word.text}: no data :/</Alert>
    }

    return (
        <>
            <Center>
                <Title h={3}>{word.text}</Title>
            </Center>
            <Space h={55} />
            <Flex>
                <WordsTable word={word.uuid} label="P." data={MK_grammarPersons} width={30} readOnly />
                <WordsTable word={word.uuid} label="Present" data={word.data.present} />
                <WordsTable word={word.uuid} label="Perfect" data={word.data.past_perfect} />
                <WordsTable word={word.uuid} label="Aorist" data={word.data.past_aorist} />
                <WordsTable word={word.uuid} label="Imperfect" data={word.data.past_imperfect} />
            </Flex>
            <Center mt={55}>
                <Flex direction="column" w={220} gap="xs">
                    <Button color="green" onClick={ctx.fn.words.next}>
                        Next word
                    </Button>
                    <Button color="blue" onClick={ctx.fn.words.prev}>
                        Previous word
                    </Button>
                    <Button color="gray" onClick={ctx.fn.game.setup}>
                        Back to setup
                    </Button>
                </Flex>
            </Center>
        </>
    )
}

export default RunningScene
