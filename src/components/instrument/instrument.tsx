import { h } from "preact";
import { useContext } from "preact/hooks";
import { AppState } from "../app";
import { AppContext } from "../app";
import { ArmString } from "./instrument.arm";

const Instrument = () => {
  const { tuning } = useContext(AppContext) as AppState;
  return (
    <div class="instrument_arm">{tuning.value.map((_, position: number) => {
      return <ArmString position={position} />
    })}</div>
  );
};

export default Instrument;
