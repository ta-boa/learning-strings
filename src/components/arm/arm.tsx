import { h } from "preact"
import { useContext } from "preact/hooks"
import { Note, NoteSettings, PressedKeys } from "src/music/types"
import { getFriendlySemiNote, getNoteFromFret, isMinor, isSharp } from "../../music/notes"
import { AppContext } from "../app"
import style from "./style.scss"

export type ArmStringProps = {
    position: number
}

export const ArmString = ({ position }: ArmStringProps) => {
    const { tuning, instrument, activeKeys } = useContext(AppContext)
    const rootNote = (tuning.value as Note[])[position] as Note
    const notes = []

    for (let fret = 0; fret < instrument.value.frets; fret++) {
        notes.push(getNoteFromFret(rootNote, fret))
    }

    const isPressed = (note: NoteSettings) => {
        const keys = activeKeys.value as PressedKeys
        const current: NoteSettings | undefined = keys[position]
        if (current === undefined) return false
        return current.note === note.note && current.fret === note.fret
    }

    const togglePressed = (target: NoteSettings) => {
        return () => {
            const aKeys = { ...activeKeys.value } as PressedKeys
            const current: null | NoteSettings = aKeys[position]
            if (current && current.note === target.note && current.fret == target.fret) {
                delete aKeys[position]
            } else {
                aKeys[position] = target
            }
            activeKeys.value = aKeys
        }
    }

    return (
        <div data-position={position}>
            {notes.map((current: NoteSettings, key: number) => {
                const fret = current.fret === 0 ? "open" : current.fret
                const n = current.note
                let body: any
                if (Array.isArray(n) && n.length === 2) {
                    const [first, last] = n
                    body = (
                        <div class={style.semi}>
                            <span data-sharp={isSharp(first)} data-minor={isMinor(first)}>
                                {getFriendlySemiNote(first)}
                            </span>
                            <span data-sharp={isSharp(last)} data-minor={isMinor(last)}>
                                {getFriendlySemiNote(last)}
                            </span>
                        </div>
                    )
                } else {
                    body = (
                        <span class={style.full} data-major="true">
                            {getFriendlySemiNote(current.note)}
                        </span>
                    )
                }
                return (
                    <button
                        key={key}
                        class={style.note}
                        onClick={togglePressed(current)}
                        aria-pressed={isPressed(current)}
                        data-fret={fret}
                        data-position={position}
                        data-note={current.note}
                    >
                        {body}
                    </button>
                )
            })}
        </div>
    )
}
