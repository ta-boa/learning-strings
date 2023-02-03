import { AppContext } from "../../app"
import { Note } from "../../../music/types"
import { getFriendlySemiNote } from "../../../music/notes"
import { useContext } from "preact/hooks"
import { AppState } from "../../../routes/home"
import { h } from "preact"
import style from "./style.scss"

export default function Display() {
    const { instrument } = useContext(AppContext) as AppState
    return (
        <details class={style.wrapper}>
            <summary class={style.trigger}>Ruler</summary>
            <div class={style.content}>
                <fieldset>
                    <label>
                        <input type="radio" name="type" value="off" checked />
                        off
                    </label>
                    <label>
                        <input type="radio" name="type" value="linear" />
                        liner
                    </label>
                    <label>
                        <input type="radio" name="type" value="grid" />
                        grid
                    </label>
                </fieldset>
                <fieldset>
                    <select name="target-string">
                        <option>Start string</option>
                        {instrument.value.tuning.map((note: Note, index: number) => {
                            return (
                                <option key={`s-${index}`}>
                                    {index + 1} ({getFriendlySemiNote(note)})
                                </option>
                            )
                        })}
                    </select>
                    <select name="target-fret">
                        <option>Start fret</option>
                        {[...Array(instrument.value.frets - 1)].map((_, index: number) => {
                            return (
                                <option value={index} key={`f-${index}`}>
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
