import { h } from "preact";
import Instruments from "./settings/index";
import { AppContext, createAppState } from "./app";
import Menu from "./menu/menu";
import Instrument from "./instrument/instrument";

interface Props {
  instrument?: string;
}

const Home = ({ instrument }: Props) => {
  const state = createAppState(Instruments[instrument] || Instruments.banjo);
  return (
    <AppContext.Provider value={state}>
      <main class="main">
        <Instrument />
      </main>
      <Menu></Menu>
    </AppContext.Provider>
  );
};
export default Home;
