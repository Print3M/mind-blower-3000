import { Flex, Group, Loader, MantineStyleProp, Pill } from "@mantine/core"
import { useGameCtx } from "../context"
import { Word } from "../types"

const WordsDisplay = () => {
    const ctx = useGameCtx()

    const getPillCss = (word: Word): MantineStyleProp => {
        if (ctx.data.state == "setup") {
            return { border: "solid 1px gray" }
        }

        if (ctx.data.currentWord.uuid == word.uuid) {
            return { border: "solid 2px green" }
        }

        switch (word.status) {
            case "completed":
                return {
                    backgroundColor: "green",
                }
            default:
                return { border: "solid 1px gray" }
        }
    }

    return (
        <Group gap={5} justify="center" mt="md">
            {ctx.data.words.map(word => (
                <Pill
                    key={word.uuid}
                    size="lg"
                    onRemove={() => ctx.fn.words.remove(word.uuid)}
                    opacity={word.status == "loading" ? 0.7 : 1}
                    withRemoveButton={ctx.data.state == "setup" && word.status != "loading"}
                    style={getPillCss(word)}
                >
                    <Flex align="center" justify="center" gap={10}>
                        {word.status == "loading" && <Loader size={20} />} {word.text}
                    </Flex>
                </Pill>
            ))}
        </Group>
    )
}

export default WordsDisplay
