import { Fragment, h } from "preact";
import { useContext } from "preact/hooks";
import { AppContext, AppState } from "../app";
import Settings from "./settings";
import Content from "./content";
import Overlay from "./overlay";

export default function Menu() {

    const { state } = useContext(AppContext) as AppState;

    const toggleMenu = (value: "initial" | "content" | "settings") => () => {
        state.value = state.value === value ? "initial" : value;
    }

    return <div class="menu" data-overlay={state}>
        <div class="menu_bar">
            <button
                id="left-trigger"
                aria-label="open settings menu"
                aria-controls="TBD-menu-wrapper"
                class="menu_trigger"
                onClick={toggleMenu("settings")}>
                ⋮
            </button>
            <span>⚡Try a chord</span>
            <button
                id="right-trigger"
                aria-label="open content menu"
                aria-controls="TBD-menu-wrapper"
                class="menu_trigger"
                onClick={toggleMenu("content")}>
                {state.value === "initial" ? "♪" : "▾"}
            </button>
        </div>
        <Content></Content>
    </div>

}
        // <Overlay
        //     show={state.value === "settings"}
        //     closeMenu={closeMenu}
        //     placement='left'>
        //     <Settings></Settings>
        // </Overlay>
        // <Overlay
        //     show={state.value === "content"}
        //     closeMenu={closeMenu}
        //     placement='right'>
        // </Overlay>