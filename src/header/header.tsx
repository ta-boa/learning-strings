import { h } from "preact";
import Settings from "./settings";
import { Library } from "../content/library";
import ShowChord from "./show-chord";

export default function Header() {
    return <header class="header">
        <ShowChord></ShowChord>
        <Library></Library>
        <Settings></Settings>
    </header>
}