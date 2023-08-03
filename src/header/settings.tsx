import { h } from "preact";
import Lang from "./settings.lang";
import Preset from "./settings.preset";
import Tunning from "./settings.tunning";
import Display from "./settings.display";
import { signal } from "@preact/signals";

export default function Settings() {
    let hidden = signal(true);
    const toggleMenu = () => {
        hidden.value = !hidden.value;
    }
    return <div class="menu">
        <button aria-label="Open menu" title="Menu" class="menu_trigger" onClick={toggleMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"><path d="M140.001-254.616v-50.255h679.998v50.255H140.001Zm0-200.257v-50.254h679.998v50.254H140.001Zm0-200.256v-50.255h679.998v50.255H140.001Z" /></svg>
        </button>
        <div class="menu_content" aria-hidden={hidden}>
            <Lang></Lang>
            <Preset></Preset>
            <Tunning></Tunning>
            <Display></Display>
        </div>
    </div>

}