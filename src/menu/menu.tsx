import { signal } from "@preact/signals";
import { h } from "preact";
import { useContext } from "preact/hooks";
import { AppContext, AppState } from "../app";

const MenuToggle = ({ a, b, onClick }) => {
  let label = signal(a);
  let option = signal("a");
  const toggle = () => {
    console.log("toggle", label.value, option.value);
    label.value = label.value === a ? b : a;
    option.value = label.value === a ? "a" : "b";
    onClick(label.value === a ? "a" : "b", a, b);
  };
  return (
    <button data-option={option} class="menu_toggle" onClick={toggle}>
      {label}
    </button>
  );
};

const MenuBar = () => {
  const { state, lang, semi } = useContext(AppContext) as AppState;

  const toggleSeminotesView = (value: string) => {
    semi.value = value === "a" ? "sharp" : "flat";
  };
  const toggleLang = (value: string) => {
    lang.value = value === "a" ? "abc" : "doremi";
  };

  const toggleChords = (value: string, a: string, b: string) => {
    state.value = {
      name: state.value.name,
      tilt: value === a ? 0 : 3,
    };
  };

  return (
    <div class="menu_bar">
      <MenuToggle onClick={toggleSeminotesView} a="♯" b="♭"></MenuToggle>
      <MenuToggle onClick={toggleLang} a="C" b="Do"></MenuToggle>
      <MenuToggle onClick={toggleChords} a="♪" b="▾"></MenuToggle>
    </div>
  );
};
export default function Menu() {
  const { state } = useContext(AppContext) as AppState;
  const stateName = state.value.name;
  const stateTilt = state.value.tilt;
  return (
    <div class="menu" data-state={stateName} data-tilt={stateTilt}>
      <MenuBar></MenuBar>
    </div>
  );
}

{
  /* <div class="menu_bar_feature" data-target="content">
<select id="select-chord-scale" onChange={updateScales}>
  {Object.keys(Scales).map((name: string, key: number) => {
    return (
      <option key={key} name={name} value={name}>
        {name}
      </option>
    );
  })}
</select>
<MenuContent></MenuContent>
</div> */
}

// const toggleMenu = (value: "initial" | "content" | "settings") => () => {
//   state.value = {
//     name: stateName === value ? "initial" : value,
//     tilt: state.value.tilt,
//   };
// };

//const scale: Signal<ScaleType> = signal(Scales.Major);

// const updateScales = (event: Event) => {
//   const newScale = (event.currentTarget as HTMLSelectElement).value;
//   scale.value = Scales[newScale];
//   state.value = {
//     name: state.value.name,
//     tilt: Scales[newScale]["G"].length,
//   };
// };

//const MenuContent = () => {
//  return <Chords scale={scale}></Chords>;
//};
