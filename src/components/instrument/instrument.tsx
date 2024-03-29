import { h } from "preact";
import { useContext } from "preact/hooks";
import { AppState } from "../../routes/home";
import { AppContext } from "../app";
import { ArmString } from "../arm/arm";
import style from "./style.scss";

const Instrument = () => {
  const { instrument } = useContext(AppContext) as AppState;
  const settings = instrument.value;
  const arm = [];
  for (let position = 0; position < settings.tuning.length; position++) {
    arm.push(<ArmString position={position} />);
  }
  return (
    <div class={style.instrument}>
      <div class={style.arm}>{arm}</div>
    </div>
  );
};

export default Instrument;
