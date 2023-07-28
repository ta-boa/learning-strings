import { Fragment, h } from "preact";
import { useContext } from "preact/hooks";
import { AppContext, AppState } from "../app";
import Scales from "../music/scales";
import { Note } from "../music/types";

export default function ShowChord() {
    const { activeKeys } = useContext(AppContext) as AppState;

    const notes = Object.entries(activeKeys.value).map(([position, value]) => {
        return value.note.map((note: Note) => {
            return note;
        })
    }).flat();

    let matches = [];
    if (notes.length) {
        Object.entries(Scales).map(([presetName, presetChords]) => {
            Object.entries(presetChords).map(([chordName, chordNotes]) => {
                const matching = chordNotes.reduce((result, noteToMatch: Note) => {
                    return (result = result && notes.includes(noteToMatch));
                }, true)
                if (matching) {
                    matches.push({
                        presetName, chordName, chordNotes
                    })
                }
            })
        })
    }

    return (
        <div class="show-chord" data-match={matches.length > 0}>
            <span class="show-chord-title">Chord</span>
            {matches.map(chord => {
                return (
                    <Fragment>
                        <span class="show-cord-name">{chord.chordName}</span>
                        <span class="show-cord-preset">{chord.presetName}</span>
                    </Fragment>
                )
            })}
        </div>)
}