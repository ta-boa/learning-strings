/* eslint-disable prettier/prettier */
import { AppContext } from "../../app"
import { Note, NoteSettings, Progression } from "../../../music/types"
import { getFriendlySemiNote, getNoteFromFret } from "../../../music/notes"
import { useContext } from "preact/hooks"
import { AppState } from "../../../routes/home"
import { h } from "preact"
import style from "./style.scss"

type Mode = "off" | "linear" | "grid"

export default function ScaleProgression() {
    const { tuning, instrument, progression, notesGrid } = useContext(AppContext) as AppState

    let selectedNote: Note = tuning.value[0]
    let selectedPosition = 0
    let selectedFret = 0
    let mode: Mode = "off"

    const resolve = () => {
        if (mode === "off") {
            progression.value = []
            return
        }
        const linearNotes: NoteSettings[] = [
            getNoteFromFret(selectedNote, selectedFret),
            getNoteFromFret(selectedNote, selectedFret + 2), // whole
            getNoteFromFret(selectedNote, selectedFret + 4), // whole
            getNoteFromFret(selectedNote, selectedFret + 5), // half
            getNoteFromFret(selectedNote, selectedFret + 7), // whole
            getNoteFromFret(selectedNote, selectedFret + 9), // whole
            getNoteFromFret(selectedNote, selectedFret + 11), // whole
            getNoteFromFret(selectedNote, selectedFret + 12), // half
        ];
        console.log(linearNotes)
        if (mode === "grid") {
            const notesToSearch = linearNotes.map((target: NoteSettings) => {
                return target.note;
            })
            const rootNote = linearNotes[0]
            // const startFret = linearNotes[0].fret;
            const progressionGrid = notesToSearch.map((targetNote: Note | Note[], index: number) => {
                if (index === 0) return
                return notesGrid.value.map((stringNotes: NoteSettings[]) => {
                    return stringNotes.filter((fretNote: NoteSettings) => {
                        if (Array.isArray(fretNote.note) && Array.isArray(targetNote)) {
                            return targetNote.includes(fretNote.note[0]) || targetNote.includes(fretNote.note[1])
                        }
                        return fretNote.note === targetNote
                    })
                })
            })
            console.table(progressionGrid)
        }
        progression.value = linearNotes.map((settings: NoteSettings, order: number) => {
            return { position: selectedPosition, fret: settings.fret, order } as Progression
        })
    }

    const setString = (event: Event) => {
        const { value, selectedIndex } = event.currentTarget as HTMLSelectElement
        selectedPosition = selectedIndex;
        selectedNote = value as Note
        resolve()
    }
    const setFret = (event: Event) => {
        const { value } = event.currentTarget as HTMLSelectElement
        selectedFret = parseInt(value, 10)
        resolve()
    }
    const setMode = (event: Event) => {
        const { value } = event.target as HTMLInputElement
        mode = value as Mode;
        resolve();
    }

    return (
        <details class={style.wrapper}>
            <summary class={style.trigger}>Progression</summary>
            <div class={style.content}>
                <fieldset onInput={setMode}>
                    <label>
                        <input type="radio" name="type" value="off" checked />
                        off
                    </label>
                    <label>
                        <input type="radio" name="type" value="linear" />
                        single
                    </label>
                    <label>
                        <input type="radio" name="type" value="grid" />
                        multi
                    </label>
                </fieldset>
                <fieldset>
                    <select id="string" name="string" onChange={setString}>
                        {tuning.value.map((note: Note, index: number) => {
                            return (
                                <option value={note} key={`s-${index}`}>
                                    ({index + 1}) {getFriendlySemiNote(note)}
                                </option>
                            )
                        })}
                    </select>
                    <select id="fret" name="fret" onChange={setFret}>
                        <option name="open" value="0">
                            Open
                        </option>
                        {[...Array(instrument.value.frets - 1)].map((_, index: number) => {
                            return (
                                <option value={index + 1} key={`f-${index}`}>
                                    {index + 1}
                                </option>
                            )
                        })}
                    </select>
                </fieldset>
            </div>
        </details>
    )
}
