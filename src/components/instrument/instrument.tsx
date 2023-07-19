import { h } from "preact";
import { useContext } from "preact/hooks";
import { AppState } from "../app";
import { AppContext } from "../app";
import { Arm } from "./instrument.arm";

const Instrument = () => {
  const { instrument } = useContext(AppContext) as AppState;
  const settings = instrument.value;
  const arm = [];

  for (let position = 0; position < settings.tuning.length; position++) {
    arm.push(<Arm position={position} />);
  }
  return (
    <div class="instrument">
      <div class="instrument_arm">{arm}</div>
    </div>
  );
};

export default Instrument;
