import { Signal, signal } from "@preact/signals";
import { getFriendlyNoteName } from "music/notes";
import { h } from "preact";
import { useContext } from "preact/hooks";
import { AppContext, AppState } from "../app";
import { ScaleType, Scales } from '../music/scales';
import { Note } from "../music/types";
import Content from "./content";
import Settings from "./settings";

const FeatureMenu = ({ scale }) => {
    const { lang, chordMatch, state } = useContext(AppContext) as AppState;

    const updateScales = (event: Event) => {
        const newScale = (event.currentTarget as HTMLSelectElement).value;
        scale.value = Scales[newScale];
        state.value = {
            name: state.value.name,
            tilt: Scales[newScale]["G"].length
        }
    }

    let barContent = "🪕 Try a chord!"
    if (chordMatch.value) {
        barContent = `⚡${getFriendlyNoteName(chordMatch.value.chordName as Note, lang.value)} ${chordMatch.value.presetName}`;
    }

    return (<div>
        <div class="menu_bar_feature" data-target="initial">{barContent}</div>
        <div class="menu_bar_feature" data-target="content">
            <select id="select-chord-scale" onChange={updateScales}>
                {Object.keys(Scales).map((name: string, key: number) => {
                    return (
                        <option key={key} name={name} value={name}>{name}</option>
                    );
                })}
            </select>
        </div>
    </div>)
}

const scale: Signal<ScaleType> = signal(Scales.Major);
export default function Menu() {

    const { state } = useContext(AppContext) as AppState;

    const stateName = state.value.name
    const stateTilt = state.value.tilt

    const toggleMenu = (value: "initial" | "content" | "settings") => () => {
        state.value = {
            name: stateName === value ? "initial" : value,
            tilt: state.value.tilt
        }
    }
    return <div class="menu" data-state={stateName} data-tilt={stateTilt}>
        <div class="menu_bar">
            <button
                data-active={stateName === "settings"}
                class="menu_trigger"
                onClick={toggleMenu("settings")}>
                ⋮
            </button>
            <FeatureMenu scale={scale}></FeatureMenu>
            <button
                class="menu_trigger"
                data-active={stateName === "content"}
                onClick={toggleMenu("content")}>
                {stateName === "initial" ? "♪" : "▾"}
            </button>
        </div>
        {stateName !== "initial" && stateName === "settings" ?
            <Settings></Settings> :
            <Content scale={scale}></Content>}
    </div>

}