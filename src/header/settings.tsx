import { h } from "preact";
import Lang from "./settings.lang";
import Preset from "./settings.preset";
import Display from "./settings.display";
import { signal } from "@preact/signals";

export default function Settings() {

    let hidden = signal(true);
    const toggleMenu = () => {
        hidden.value = !hidden.value;
    }
    return <div class="menu">
        <button
            id="menu-trigger"
            aria-label="open menu"
            aria-controls="menu-wrapper"
            title="menu"
            class="menu_trigger"
            onClick={toggleMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"><path d="M140.001-254.616v-50.255h679.998v50.255H140.001Zm0-200.257v-50.254h679.998v50.254H140.001Zm0-200.256v-50.255h679.998v50.255H140.001Z" /></svg>
        </button>
        <div
            id="menu-wrapper"
            class="menu_wrapper"
            role="menu"
            aria-labelledby="menu-trigger"
            aria-hidden={hidden}>
            <button aria-label="close menu" class="menu_close" onClick={toggleMenu}>←</button>
            <div class="menu_content">
                <h2 class='menu_heading'>Learn strings</h2>
                <Lang></Lang>
                <Display></Display>
                <Preset></Preset>
            </div>
            <button aria-label="close menu" class="menu_close" onClick={toggleMenu}>←</button>
        </div>
    </div>

}