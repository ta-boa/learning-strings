import { h } from "preact";
import Lang from "./settings.lang";
import Preset from "./settings.preset";
import Tunning from "./settings.tunning";
export default function Settings() {
    return (<menu class="menu">
        <details class="menu_item">
            <summary class="menu_label">Settings</summary>
            <div class="menu_content">
                <Lang></Lang>
                <Preset></Preset>
                <Tunning></Tunning>
            </div>
        </details>
    </menu>)
}