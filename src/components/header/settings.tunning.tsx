import { AppContext, AppState } from "app";
import { FretSequence, getFriendlyNoteName } from "music/notes";
import { Note } from "music/types";
import { h } from "preact";
import { useContext } from "preact/hooks";
export default function Tunning() {
    const { tuning, lang } = useContext(
        AppContext
    ) as AppState;

    const updateTunning = (index: number) => (event: Event) => {
        const newValue: Note = (event.target as HTMLSelectElement).value as Note;
        const newTuning = [...tuning.value];
        newTuning[index] = newValue;
        tuning.value = newTuning;
    }

    const getNotesSequence = (target: Note) => {
        return Object.keys(FretSequence).map((note: string, key: number) => {
            return (<option key={key} value={note} selected={note === target}>
                {getFriendlyNoteName(note as Note, lang.value)}
            </option>
            );
        })
    }

    return (<fieldset>
        <legend>Tunning</legend>
        {tuning.value.map((value: Note, index: number) => {
            return <select onChange={updateTunning(index)} name={"tunning-string-" + index}>
                {getNotesSequence(value)}
            </select>
        })}
        <div>
        </div>
    </fieldset>
    )
}