import { AppContext } from "../../app";
import { useContext } from "preact/hooks";
import { AppState } from "../../../routes/home";
import { h } from "preact";
import style from "./style.scss";

export default function Chords() {
    // const { views } = useContext(AppContext) as AppState;
    return (
        <details class={style.chords}>
            <summary class={style.trigger}>Display</summary>
        </details>
    );
}
