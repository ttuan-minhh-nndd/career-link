import "./App.css";
import { AppContext } from "../context/app.context";
import { useContext, useEffect } from "react";
import { localStorageEventTarget } from "./utils/auth";

import useRouteElements from "./useRouteElements";

function App() {
  const routeElements = useRouteElements();
  const { reset } = useContext(AppContext);
  useEffect(() => {
    localStorageEventTarget.addEventListener("clearLocalStorage", reset);
    return () => {
      localStorageEventTarget.removeEventListener("clearLocalStorage", reset);
    };
  }, [reset]);
  return <div>{routeElements}</div>;
}

export default App;
