import {
    Group,
    Input, Tooltip
} from "@mantine/core"
import { FC, useState } from "react"
import { IconCheck, IconQuestionMark, IconX } from "@tabler/icons-react"

interface Props {
    word: string
}

const WordInput: FC<Props> = ({ word }) => {
    const [value, setValue] = useState("")

    return (
        <Group justify="left" gap={4}>
            <Input
                variant="filled"
                onChange={e => setValue(e.currentTarget.value.toLowerCase())}
                w={180}
                leftSection={value == word ? <IconCheck color="green" /> : <IconX color="red" />}
                disabled={word.length == 0}
            />
            <Tooltip label={word} inline>
                <IconQuestionMark size={20} />
            </Tooltip>
        </Group>
    )
}

export default WordInput