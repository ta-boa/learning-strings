import { h } from "preact";
import { useContext } from "preact/hooks";
import { AppContext, AppState } from "../app";
import Content from "./content";
import Settings from "./settings";
import { Scales } from '../music/scales';

const FeatureMenu = () => {
    const updateScales = (event: Event) => {
        const newScale = (event.currentTarget as HTMLSelectElement).value;
        console.log(newScale);
    }
    return (<div>
        <div class="menu_bar_feature" data-target="initial">⚡Try a chord</div>
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

export default function Menu() {

    const { state } = useContext(AppContext) as AppState;

    const toggleMenu = (value: "initial" | "content" | "settings") => () => {
        state.value = state.value === value ? "initial" : value;
    }
    const currentScale = Scales.Major;

    return <div class="menu" data-state={state}>
        <div class="menu_bar">
            <button
                id="left-trigger"
                aria-label="open settings menu"
                data-active={state.value === "settings"}
                class="menu_trigger"
                onClick={toggleMenu("settings")}>
                ⋮
            </button>
            <FeatureMenu></FeatureMenu>
            <button
                id="right-trigger"
                aria-label="open content menu"
                class="menu_trigger"
                data-active={state.value === "content"}
                onClick={toggleMenu("content")}>
                {state.value === "initial" ? "♪" : "▾"}
            </button>
        </div>
        {state.value !== "initial" && state.value === "settings" ?
            <Settings></Settings> :
            <Content scale={currentScale}></Content>}
    </div>

}