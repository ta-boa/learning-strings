import { h } from "preact";
import { useContext, useRef } from "preact/hooks";
import { AppState } from "../../routes/home";
import { AppContext } from "../app";
import { ArmString } from "../arm/arm";
import style from "./style.scss";

const Instrument = () => {
  const { instrument } = useContext(AppContext) as AppState;
  const armWrapper = useRef(null);
  const canvas = useRef(null);
  const img = useRef(null);
  const settings = instrument.value;
  const arm = [];
  const screenShot = () => {
    let b64 = "data:image/svg+xml;base64,";
    let xml = new XMLSerializer().serializeToString(armWrapper.current);
    b64 += window.btoa(window.unescape(encodeURIComponent(xml)));
    console.log(b64);
    let ctx = canvas.current.getContext("2d");
    img.current.onload = function (args) {
      console.log("image loaded", args);
      ctx.drawImage(img, 0, 0);
    };
    window.copy(b64);
    img.current.src = b64;
  };

  for (let position = 0; position < settings.tuning.length; position++) {
    arm.push(<ArmString position={position} />);
  }
  return (
    <div ref={armWrapper} class={style.instrument}>
      <img ref={img} />
      <canvas ref={canvas} width="200" height="300" />
      <button onClick={screenShot}>igor</button>
      <div class={style.arm}>{arm}</div>
    </div>
  );
};

export default Instrument;
