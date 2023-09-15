import { useSignal } from "@preact/signals";
import { h } from "preact";
import { useContext } from "preact/hooks";
import { AppContext, AppState } from "../app";
import MenuChords from "./menu.chords";

const MenuButton = ({ a, b, onClick, className = "menu_button_trigger" }) => {
  let option = useSignal(a);
  const toggle = () => {
    option.value = option.value === a ? b : a;
    onClick(option.value === a ? "a" : "b");
  };
  return (
    <button
      data-option={option.value === a ? "a" : "b"}
      className={className}
      onClick={toggle}
    >
      {option}
    </button>
  );
};

const MenuBar = () => {
  const { menu, lang, semi, tilt } = useContext(AppContext) as AppState;

  const toggleSeminotesView = (value: string) => {
    semi.value = value === "a" ? "sharp" : "flat";
  };

  const toggleLang = (value: string) => {
    lang.value = value === "a" ? "abc" : "doremi";
  };

  const toggleChords = (value: string) => {
    if (value === "a") {
      menu.value = "initial";
      tilt.value = 0;
    } else {
      menu.value = "chords";
    }
  };

  return (
    <div class="menu_bar">
      <MenuButton onClick={toggleSeminotesView} a="♯" b="♭"></MenuButton>
      <MenuButton onClick={toggleSeminotesView} a="🪛" b="♭"></MenuButton>
      <MenuButton onClick={toggleLang} a="C" b="Do"></MenuButton>
      <MenuButton
        onClick={toggleChords}
        a="♪"
        b="▾"
        className="menu_button_toggle"
      ></MenuButton>
    </div>
  );
};
export default function Menu() {
  return (
    <div class="menu">
      <MenuBar></MenuBar>
      <MenuChords></MenuChords>
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
