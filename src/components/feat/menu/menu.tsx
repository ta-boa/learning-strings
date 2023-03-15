import { h } from "preact";
import { PropsWithChildren } from "preact/compat";
import style from "./style.scss";

function isMobile() {
  return window.matchMedia("(max-width: 767px)").matches;
}

import type { ComponentChildren } from "preact";

type Props = {
  children: ComponentChildren;
};

export default function MenuItem(props: Props) {
  const scrollToView = (event: Event) => {
    const details = event.currentTarget as HTMLDetailsElement;
    if (isMobile() && details.open) {
      details.scrollIntoView();
    }
  };
  return (
    <details onToggle={scrollToView} class={style.wrapper}>
      {props.children}
    </details>
  );
}
