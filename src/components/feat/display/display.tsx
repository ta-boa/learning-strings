import { AppContext } from "../../app";
import { useContext } from "preact/hooks";
import { AppState } from "../../../routes/home";
import { Fragment, h } from "preact";
import style from "./style.scss";

export default function Display() {
  const { view } = useContext(AppContext) as AppState;

  const updateView = (event: Event) => {
    const input: HTMLInputElement = event.currentTarget as HTMLInputElement;
    view.value = {
      ...view.value,
      [input.name]: input.checked,
    };
  };

  const viewList = Object.keys(view.value);

  return (
    <Fragment>
      <summary class={style.trigger}>Display</summary>
      <div class={style.content}>
        {viewList.map((name: string, key: number) => {
          const value = view.value[name] as boolean;
          return (
            <div key={key} class={style.item}>
              <input
                class={style.input}
                id={name}
                type="checkbox"
                name={name}
                onChange={updateView}
                checked={value}
              />
              <label class={style.label} for={name}>
                {name}
              </label>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
}
