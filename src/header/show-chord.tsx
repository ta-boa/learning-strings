import { Fragment, h } from "preact";
import { useContext } from "preact/hooks";
import { AppContext, AppState } from "../app";
import Scales from "../music/scales";
import { Note } from "../music/types";
import { getFriendlyNoteName } from "music/notes";

export default function ShowChord() {
    const { activeKeys, lang } = useContext(AppContext) as AppState;

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

    let content = (
        <Fragment>
            <span class="show-chord-label">Try a chord!</span>
        </Fragment>
    );
    if (matches.length) {
        if (matches.length > 1) {
            console.log("Matching more than one chord", matches);
        }
        const chord = matches[0];
        content = (
            <Fragment>
                <span class="show-chord-label">{getFriendlyNoteName(chord.chordName, lang.value)}</span>
                <span class="show-chord-preset">Scale: {chord.presetName}</span>
            </Fragment>
        )
    }

    return (
        <div class="show-chord" data-match={matches.length > 0}>
            {content}
            <button class="switch-mode">Chord Progression</button>
        </div>)
}