import { h } from "preact";
import Instruments from "./settings/index";
import { AppContext, createAppState } from "./app";
import Menu from "./menu/menu";
import Instrument from "./instrument/instrument";

interface Props {
  instrument?: string;
}

const Home = ({ instrument }: Props) => {
  const context = createAppState(Instruments[instrument] || Instruments.banjo);
  const { tilt, menu } = context;
  return (
    <AppContext.Provider value={context}>
      <div class="app" data-state={menu} data-tilt={tilt}>
        <main class="main">
          <Instrument />
        </main>
        <Menu></Menu>
      </div>
    </AppContext.Provider>
  );
};
export default Home;
