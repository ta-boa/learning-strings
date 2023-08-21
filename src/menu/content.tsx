import { getFriendlyNoteName } from "music/notes";
import { Note } from "music/types";
import { h } from "preact";
import { useContext } from "preact/hooks";
import { AppContext, AppState } from "../app";

const wait = (callback: () => void, ms: number = 10): () => void => {
    const id = setTimeout(callback, ms);
    return () => {
        clearTimeout(id);
    }
}

function ChordItem({ name, notes, onClick, onBlur }) {
    const { lang } = useContext(AppContext) as AppState;
    return (
        <div
            className="content_chord_item">
            <strong className="content_chord_note">
                {getFriendlyNoteName(name, lang.value)}
            </strong>
            {notes.map((note: Note, index: number) => {
                return <button
                    data-key={`${name}-${index}`}
                    data-note={note}
                    onClick={onClick}
                    onBlur={onBlur}
                    className="content_chord_note">
                    {getFriendlyNoteName(note, lang.value)}
                </button>
            })}
        </div >
    );
}

export default function Content({ scale }) {
    let cancelBlur: () => void;
    let targetNote: Note
    let targetKey: string

    const removeHightlight = (id: string) => {
        cancelBlur = undefined;
        if (id === targetKey) {
            targetNote = undefined;
        }
    }

    const handleClick = (event: Event) => {
        const button = event.target as HTMLButtonElement;
        if (typeof cancelBlur === "function") {
            cancelBlur();
            cancelBlur = undefined;
        }
        targetNote = button.dataset.note as Note;
        targetKey = button.dataset.key;
    }

    const handleBlur = (event: Event) => {
        const button = event.target as HTMLButtonElement;
        const key = button.dataset.key;
        cancelBlur = wait(() => { removeHightlight(key) }, 100)
    }

    return <div className="content_chord_wrapper">
        {Object.keys(scale)
            .sort()
            .map((name, key) => {
                return (
                    <ChordItem onClick={handleClick} onBlur={handleBlur} key={key} name={name} notes={scale[name]} />
                );
            })}
    </div>
}
