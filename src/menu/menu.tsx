import { Signal, signal } from "@preact/signals";
import { h } from "preact";
import { useContext } from "preact/hooks";
import { AppContext, AppState } from "../app";
import { ScaleType, Scales } from "../music/scales";
import Content from "./content";

const MenuToggle = ({a,b,onClick}) =>{
    let label  = signal(a);
    const toggle = ()=>{
        label.value = label.value === a ? b : a   
        onClick(label.value === a ? "a" : "b");
    }
    return (<button
    class="menu_toggle"
    onClick={toggle}
  >
    {label}
  </button>)
}

const scale: Signal<ScaleType> = signal(Scales.Major);
const MenuBar = () => {

  const { state, lang, semi} = useContext(AppContext) as AppState;
  const stateName = state.value.name;

  const toggleMenu = (value: "initial" | "content" | "settings") => () => {
    state.value = {
      name: stateName === value ? "initial" : value,
      tilt: state.value.tilt,
    };
  };

  const updateScales = (event: Event) => {
    const newScale = (event.currentTarget as HTMLSelectElement).value;
    scale.value = Scales[newScale];
    state.value = {
      name: state.value.name,
      tilt: Scales[newScale]["G"].length,
    };
  };

  const toggleSeminotesView = (value:"a"|"b") =>{
    semi.value = value === "a" ? "sharp" : "flat";
  }
  const toggleLang = (value:"a"|"b") =>{
    lang.value = value === "a" ? "abc" : "doremi";
  }
 
  return (
    <div class="menu_bar">
        <MenuToggle onClick={toggleSeminotesView} a="♯" b="♭"></MenuToggle>
        <MenuToggle onClick={toggleLang} a="C" b="Do"></MenuToggle>
      <button
        class="menu_trigger"
        data-active={stateName === "content"}
        onClick={toggleMenu("content")}
      >
        {stateName === "initial" ? "♪" : "▾"}
      </button>
      <div>
        <div class="menu_bar_feature" data-target="content">
          <select id="select-chord-scale" onChange={updateScales}>
            {Object.keys(Scales).map((name: string, key: number) => {
              return (
                <option key={key} name={name} value={name}>
                  {name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
};

const MenuContent = () => {
  return <Content scale={scale}></Content>;
};

export default function Menu() {
  const { state } = useContext(AppContext) as AppState;
  
  const stateName = state.value.name;
  const stateTilt = state.value.tilt;

  return (
    <div class="menu" data-state={stateName} data-tilt={stateTilt}>
      <MenuBar></MenuBar>
      <MenuContent></MenuContent>
    </div>
  );
}
