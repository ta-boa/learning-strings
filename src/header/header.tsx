import { h } from "preact";
import Settings from "./settings";
import { signal } from "@preact/signals";
import { useContext } from "preact/hooks";
import { AppContext, AppState } from "../app";
export default function Header() {

    const { state } = useContext(AppContext) as AppState;

    let hidden = signal(true);
    const openMenu = () => {
        hidden.value = false;
        state.value = "left-menu";
    }
    const closeMenu = () => {
        hidden.value = true;
        state.value = "initial";
    }
    return <header class="menu">
        <button
            id="menu-trigger"
            aria-label="open menu"
            aria-controls="menu-wrapper"
            title="menu"
            class="menu_trigger"
            onClick={openMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"><path d="M140.001-254.616v-50.255h679.998v50.255H140.001Zm0-200.257v-50.254h679.998v50.254H140.001Zm0-200.256v-50.255h679.998v50.255H140.001Z" /></svg>
        </button>
        <Settings hidden={hidden} closeMenu={closeMenu} ></Settings>
    </header>
}