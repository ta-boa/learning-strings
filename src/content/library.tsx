
import { h } from "preact";
import AllScales from "../music/scales";
import { useContext } from "preact/hooks";
import { AppContext, AppState } from "..//app";
import { getFriendlyNoteName } from "music/notes";



export function Library() {
    const { lang } = useContext(AppContext) as AppState;

    const buildScale = ([chordName, notes], key: number) => {
        return (
            <ul key={key}>
                <li>
                    <strong>{getFriendlyNoteName(chordName, lang.value)}</strong>
                    <span>{notes.map(note => {
                        return getFriendlyNoteName(note, lang.value);
                    })}</span>
                </li>
            </ul>
        );
    }

    const scalePreset = (name: string, key: number) => {
        return (
            <details>
                <summary class="library-chord-preset" key={key} name={name}>
                    {name}
                </summary>
                <div class="library-chord-content">
                    {Object.entries(AllScales[name]).map(buildScale)}
                </div>
            </details>
        );
    }


    return (
        <div class="library">
            <button class="open-library">📗Library</button>
            <div class="library-content">
                {Object.keys(AllScales).map(scalePreset)}
            </div>
        </div >
    )
}