import { Box, Kbd, Loader, Select } from "@mantine/core"
import { IconSearch } from "@tabler/icons-react"
import { getConjugationSearch } from "api/conjugation"
import { Language } from "consts/enums"
import { KeyboardEvent, useCallback, useState } from "react"
import { useGameCtx } from "../context"

const SearchBar = () => {
    const ctx = useGameCtx()
    const [words, setWords] = useState<string[]>([])
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(false)

    const onKeyDown = useCallback(
        async (e: KeyboardEvent<HTMLInputElement>) => {
            if (!loading && words.length == 0 && e.key == "Enter") {
                setLoading(true)
                setWords(await getConjugationSearch(Language.MK, search))
                setLoading(false)
            }
        },
        [search, loading, setWords, setLoading]
    )

    const onSearchChange = useCallback(
        (v: string) => {
            if (loading) return

            setSearch(v)
            setWords([])
        },
        [loading, setSearch, setWords]
    )

    const onChange = useCallback(
        (v: string | null) => {
            if (!v) return

            setSearch("")
            ctx.fn.words.save(v)
            setWords([])
        },
        [setWords, setSearch, ctx.fn.words.save]
    )

    // Built-in select filtering is disabled. It's handled by changing `data` value.
    return (
        <Box w={350} m="auto">
            <Select
                data={words}
                value=""
                onChange={onChange}
                searchValue={search}
                onSearchChange={onSearchChange}
                onKeyDown={onKeyDown}
                leftSection={loading ? <Loader size={18} /> : <IconSearch size={20} />}
                rightSection={<Kbd size="xs">Enter</Kbd>}
                rightSectionWidth={65}
                filter={v => v.options}
                searchable
                disabled={ctx.data.state != "setup"}
                label="Macedonian word"
            />
        </Box>
    )
}

export default SearchBar
