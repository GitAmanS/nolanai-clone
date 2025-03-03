"use client";

import { Provider } from "react-redux";
import { makeStore } from "../store/store";

const store = makeStore();

const Providers = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
