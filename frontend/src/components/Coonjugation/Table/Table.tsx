import { FC, useCallback, useState } from "react"
import { Word } from "../types"
import { Button } from "@mantine/core"
import { UUID } from "crypto"

interface Props {
    words: Word[]
    changeWordStatus: (uuid: UUID, status: Word["status"]) => void
}

const Table: FC<Props> = ({ words, changeWordStatus }) => {
    
    
    // const [currentIdx, setCurrentIdx] = useState(0)


    /*
    const nextWord = useCallback(() => {
        changeWordStatus(currentIdx, "completed")
    }, [currentIdx, words, changeWordStatus, setCurrentIdx])
    */
   
    return (
        <Button color="green">
            Next
        </Button>
    )
}

export default Table
