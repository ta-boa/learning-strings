import { getFriendlyNoteName } from "music/notes";
import { Note } from "music/types";
import { h } from "preact";
import { useContext } from "preact/hooks";
import { AppContext, AppState } from "../app";

function ChordItem({ name, notes }) {
    const { lang, activeKeys, chordMatch } = useContext(AppContext) as AppState;

    const pressedKeys = Object.keys(activeKeys.value).map((key) => {
        return activeKeys.value[key].note;
    }).flat().filter((value, index, self) => {
        return self.indexOf(value) === index
    })
    const match = chordMatch.value?.chordName === name;
    return (
        <div
            className="content_chord_item">
            <strong className="content_chord_note" data-match={match}>
                {getFriendlyNoteName(name, lang.value)}
            </strong>
            {notes.map((note: Note) => {
                return <div
                    data-pressed={pressedKeys.includes(note)}
                    data-match={match}
                    data-note={note}
                    //onClick={onClick}
                    //onBlur={onBlur}
                    className="content_chord_note">
                    {getFriendlyNoteName(note, lang.value)}
                </div>
            })}
        </div >
    );
}

export default function Content({ scale }) {
    //const { state } = useContext(AppContext) as AppState;

    // let cancelBlur: () => void;
    // let targetNote: Note
    // let targetKey: string

    // const removeHightlight = (id: string) => {
    //     cancelBlur = undefined;
    //     if (id === targetKey) {
    //         targetNote = undefined;
    //     }
    // }

    // const handleClick = (event: Event) => {
    //     const button = event.target as HTMLButtonElement;
    //     if (typeof cancelBlur === "function") {
    //         cancelBlur();
    //         cancelBlur = undefined;
    //     }
    //     targetNote = button.dataset.note as Note;
    //     targetKey = button.dataset.key;
    // }

    // const handleBlur = (event: Event) => {
    //     const button = event.target as HTMLButtonElement;
    //     const key = button.dataset.key;
    //     cancelBlur = wait(() => { removeHightlight(key) }, 100)
    // }

    const notesInside = scale.value.G.length;
    console.log(scale.value)

    return <div className="content_chord_wrapper" data-notes={notesInside}>
        {Object.entries(scale.value)
            .map(([name, value], key) => {
                return (
                    <ChordItem
                        //onClick={handleClick}
                        //onBlur={handleBlur}
                        key={key}
                        name={name}
                        notes={value} />
                );
            })}
    </div>
}

//const wait = (callback: () => void, ms: number = 10): () => void => {
//    const id = setTimeout(callback, ms);
//    return () => {
//        clearTimeout(id);
//    }
//}
