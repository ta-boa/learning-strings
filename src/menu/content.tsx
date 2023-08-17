import { signal } from "@preact/signals";
import { Note, NoteSettings } from "music/types";
import { Fragment, h } from "preact";
import { useContext } from "preact/hooks";
import { AppContext, AppState } from "../app";
import AllScales from "../music/scales";
import { getFriendlyNoteName } from "music/notes";

function ChordItem({ name, notes }) {
    const { lang } = useContext(AppContext) as AppState;
    return (
        <div class="content_chord_item">
            <strong class="content_chord_note">
                {getFriendlyNoteName(name, lang.value)} =
            </strong>
            <div class="content_chord_note">
                {notes.map((note: Note, key: number) => {
                    const sign = key < notes.length - 1 ? " " : "";
                    return getFriendlyNoteName(note, lang.value) + sign;
                })}
            </div>
        </div >
    );
}

const scale = signal(AllScales.Major);

const ScaleList = () => {
    const updateScales = (event: Event) => {
        const newScale = (event.currentTarget as HTMLSelectElement).value;
        scale.value = AllScales[newScale];
    };
    return (<div style="display:flex;flex-direction:row;margin-bottom:1.4rem">
        <label class="menu_field_legend" for="select-chord-scale">Scale:</label>
        <select id="select-chord-scale" onChange={updateScales}>
            {Object.keys(AllScales).map((name: string, key: number) => {
                return (
                    <option key={key} name={name} value={name}>{name}</option>
                );
            })}
        </select>
    </div>
    );
};


//<ScaleList />

export default function Content() {
    return <div class="content_chord_wrapper">
        {Object.keys(scale.value)
            .sort()
            .map((name, key) => {
                return (
                    <ChordItem key={key} name={name} notes={scale.value[name]} />
                );
            })}
    </div>
}
