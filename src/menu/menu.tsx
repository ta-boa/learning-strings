import { useSignal } from "@preact/signals";
import { h } from "preact";
import { useContext } from "preact/hooks";
import { AppContext, AppState } from "../app";
import MenuChords from "./menu.chords";
import MenuProgression from "./menu.progression";

const MenuToggleFeature = ({
  a,
  b,
  onClick,
  className = "menu_button_trigger",
  disabled = false,
}) => {
  let option = useSignal(a);
  const toggle = () => {
    option.value = option.value === a ? b : a;
    onClick(option.value === a ? "a" : "b");
  };
  return (
    <button
      disabled={disabled}
      data-option={option.value === a ? "a" : "b"}
      className={className}
      onClick={toggle}
    >
      {option}
    </button>
  );
};

const MenuTogglePanel = ({ a, b, onClick, panel }) => {
  const { menu } = useContext(AppContext) as AppState;
  const disabled = menu.value !== panel && menu.value !== "initial";
  return (
    <MenuToggleFeature
      a={a}
      b={b}
      onClick={onClick}
      className="menu_button_toggle"
      disabled={disabled}
    />
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

  const toggleChordsMenu = (value: string) => {
    if (value === "a") {
      menu.value = "initial";
      tilt.value = 0;
    } else {
      menu.value = "chords";
    }
  };

  const toggleProgressionMenu = (value: string) => {
    if (value === "a") {
      menu.value = "initial";
      tilt.value = 0;
    } else {
      menu.value = "progression";
    }
  };

  return (
    <div class="menu_bar">
      <MenuTogglePanel
        onClick={toggleChordsMenu}
        a="♪"
        b="▾"
        panel="chords"
      ></MenuTogglePanel>
      <MenuTogglePanel
        onClick={toggleProgressionMenu}
        panel="progression"
        a="⇅"
        b="▾"
      ></MenuTogglePanel>

      <MenuToggleFeature
        onClick={toggleSeminotesView}
        a="♯"
        b="♭"
      ></MenuToggleFeature>
      <MenuToggleFeature onClick={toggleLang} a="C" b="Do"></MenuToggleFeature>
    </div>
  );
};
export default function Menu() {
  const { menu } = useContext(AppContext) as AppState;
  return (
    <div class="menu">
      <MenuBar></MenuBar>
      {menu.value === "chords" ? <MenuChords></MenuChords> : undefined}
      {menu.value === "progression" ? (
        <MenuProgression></MenuProgression>
      ) : undefined}
    </div>
  );
}
