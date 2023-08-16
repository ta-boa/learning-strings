import { Fragment, h } from "preact";
import Display from "./settings.display";
import Hand from "./settings.hand";
import Lang from "./settings.lang";
import Preset from "./settings.preset";

export default function Settings() {
    return <Fragment>
        <h2 class='overlay_heading'>Settings</h2>
        <Lang></Lang>
        <Hand></Hand>
        <Display></Display>
        <Preset></Preset>
    </Fragment>
}