import React from "react";
import { Provider } from "react-redux";
import MainContainer from "./src/MainContainer";
import myStore2 from "./reduxtoolkit/MyStore2";

const App = () => {
  return (
    <Provider store={myStore2}>
      <MainContainer />
    </Provider>
  );
};

export default App;
