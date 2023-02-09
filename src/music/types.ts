export type Note = `${"A" | "B" | "C" | "D" | "E" | "F" | "G"}${"" | "b" | "s"}`
export interface NoteSettings {
    note: Note | Note[]
    fret: number
}
export type PressedKeys = Record<string, NoteSettings>
export type InstrumentTuning = Record<string, Note[]>
export interface Progression {
    position: number
    fret: number
    note: Note | Note[]
}
export interface InstrumentSettings {
    name: string
    frets: number
    strings: number
    tuning: Note[]
    tuningOptions: InstrumentTuning
    description?: string
    armBullets?: Record<number, string>
}
