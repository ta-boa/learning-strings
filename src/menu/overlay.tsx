import { h } from "preact";


export default function Overlay(props) {
    const { placement, closeMenu, children } = props;
    const arrow = placement === 'left' ? "←" : "→"

    function closeButton() {
        return <button aria-label="close menu" class="overlay_close" onClick={closeMenu}>{arrow}</button>
    }
    return <div
        id={`${placement}-overlay`}
        className={`${placement}_overlay`}
        role="menu"
        aria-labelledby={`${placement}-trigger`}
        aria-hidden={!props.show}>
        {closeButton()}
        <div class="overlay_content">{children}</div>
        {closeButton()}
    </div>


}