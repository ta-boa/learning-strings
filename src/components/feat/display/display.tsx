import { AppContext } from "../../app";
import { useContext } from "preact/hooks";
import { AppState } from "../../../routes/home";
import { h } from "preact";
import style from "./style.scss";

export default function Display() {
    const { views } = useContext(AppContext) as AppState;

    const updateView = (event: Event) => {
        const input: HTMLInputElement = event.currentTarget as HTMLInputElement;
        views.value = {
            ...views.value,
            [input.name]: input.checked,
        };
    };

    const viewList = Object.keys(views.value);

    return (
        <details class={style.wrapper}>
            <summary class={style.trigger}>Display</summary>
            <div class={style.content}>
                {viewList.map((name: string, key: number) => {
                    const value = views.value[name] as boolean;
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
                            <label class={style.label} for={name}>{name}</label>
                        </div>
                    );
                })}
            </div>
        </details>
    );
}
