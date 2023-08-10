import { h } from "preact";
import Instruments from "./settings/index";
import { AppContext, createAppState } from "./app";
import Header from "./header/header";
import Instrument from "./instrument/instrument";
import ShowChord from "./header/show-chord";

interface Props {
  instrument?: string;
}

const Home = ({ instrument }: Props) => {
  const state = createAppState(Instruments[instrument] || Instruments.banjo);
  return (
    <AppContext.Provider value={state}>
      <Header></Header>
      <main class="app_main">
        <div class="app_content">
          <Instrument />
        </div>
      </main>
    </AppContext.Provider>
  );
};
export default Home;