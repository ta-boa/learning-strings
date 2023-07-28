import { h } from "preact";
import Settings from "./settings";
import ShowChord from "./show-chord";

export default function Header() {
    return <header class="header">
        <Settings></Settings>
        <ShowChord></ShowChord>
    </header>
}