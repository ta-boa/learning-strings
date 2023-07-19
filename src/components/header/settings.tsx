import { h } from "preact";
import SettingsLang from "./settings.lang";
import SettingsTunning from "./settings.tunning";
export default function Settings() {
    return (<menu class="menu">
        <details class="menu_item">
            <summary class="menu_label">Settings</summary>
            <div class="menu_content">
                <SettingsLang></SettingsLang>
                <SettingsTunning></SettingsTunning>
            </div>
        </details>
    </menu>)
}