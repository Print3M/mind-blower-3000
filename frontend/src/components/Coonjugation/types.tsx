import { UUID } from "crypto"

export type GameState = "running" | "setup" | "completed"

export interface MK_Conjugation {
    present: string[]
    future: string[]
    past_perfect: string[]
    past_aorist: string[]
    past_imperfect: string[]
    verbal_noun: string[]
    adverbial_participle: string[]
    adjectival_participle: string[]
}

export interface Word {
    uuid: UUID
    status: "completed" | "pending" | "loading"
    text: string
    data?: MK_Conjugation
}
