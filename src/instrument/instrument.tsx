import { h } from "preact";
import { useContext } from "preact/hooks";
import { AppState } from "../app";
import { AppContext } from "../app";
import { ArmString } from "./instrument.arm";

const Instrument = () => {
  const { tuning, instrument, dir, state } = useContext(AppContext) as AppState;
  return (
    <div
      class="instrument"
      data-dir={dir}
      data-state={state.value.name}
      data-tilt={state.value.tilt}
      data-instrument={instrument.value.name.toLowerCase()}
    >
      {tuning.value.map((_, position: number) => {
        return <ArmString position={position} />;
      })}
    </div>
  );
};

export default Instrument;
