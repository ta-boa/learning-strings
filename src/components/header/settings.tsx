import { h } from "preact";
import Lang from "./settings.lang";
import Preset from "./settings.preset";
import Tunning from "./settings.tunning";
import Display from "./settings.display";
export default function Settings() {
    return (<menu class="menu">
        <details class="menu_item">
            <summary class="menu_label">Settings</summary>
            <div class="menu_content">
                <Lang></Lang>
                <Preset></Preset>
                <Tunning></Tunning>
                <Display></Display>
            </div>
        </details>
    </menu>)
}