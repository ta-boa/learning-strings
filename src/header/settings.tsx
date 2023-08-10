import { Fragment, h } from "preact";
import Lang from "./settings.lang";
import Preset from "./settings.preset";
import Hand from "./settings.hand";
import Display from "./settings.display";

export default function Settings(props) {
    return <Fragment>
        <div
            id="menu-wrapper"
            class="menu_wrapper"
            role="menu"
            aria-labelledby="menu-trigger"
            aria-hidden={props.hidden}>
            <button aria-label="close menu" class="menu_close" onClick={props.closeMenu}>←</button>
            <div class="menu_content">
                <h2 class='menu_heading'>Learn strings</h2>
                <Lang></Lang>
                <Hand></Hand>
                <Display></Display>
                <Preset></Preset>
            </div>
            <button aria-label="close menu" class="menu_close" onClick={props.closeMenu}>←</button>
        </div>
    </Fragment >

}