import { MK_Conjugation } from "components/Coonjugation/types"
import { Language } from "consts/enums"
import { API_ROOT } from "consts/routes"

export const getConjugationSearch = async (lang: Language, word: string) => {
    const url = `${API_ROOT}/conjugation/search?lang=${lang}&word=${word}`
    const resp = await fetch(url)

    if (!resp.ok) {
        throw new Error(`API error: ${url} -> ${resp.status}`)
    }

    return (await resp.json()) as string[]
}

export const getConjugationWord = async (lang: Language, word: string) => {
    const url = `${API_ROOT}/conjugation/word?lang=${lang}&word=${word}`
    const resp = await fetch(url)

    if (!resp.ok) {
        throw new Error(`API error: ${url} -> ${resp.status}`)
    }

    return (await resp.json()) as MK_Conjugation
}
