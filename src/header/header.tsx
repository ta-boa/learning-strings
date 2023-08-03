import { h } from "preact";
import Settings from "./settings";
import { Library } from "../content/library";
import ShowChord from "./show-chord";
//<ShowChord></ShowChord>
//<Library></Library>

export default function Header() {
    return <header class="header">
        <Settings></Settings>
    </header>
}