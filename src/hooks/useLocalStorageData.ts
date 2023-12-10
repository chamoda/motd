import React, { useState, useEffect } from "react";
import { saveToLocalStorage, retriveFromLocalStorage } from "@/utils/utils";

export enum Mode {
  Loading = "loading",
  Input = "input",
  Today = "today",
}

export interface UserData {
  mode?: Mode;
  message?: string;
  date?: number;
}

const defaultUserData: UserData = {
  mode: Mode.Input,
  message: "",
  date: 0,
};

export function useLocalStorageData(): [
  Mode,
  React.Dispatch<React.SetStateAction<Mode>>,
  string,
  React.Dispatch<React.SetStateAction<string>>,
  () => void,
  () => void,
  () => void,
] {
  const [mode, setMode] = useState(Mode.Loading);
  const [inputValue, setInputValue] = useState("");

  const save = () => {
    // Change state to rerender
    setMode(Mode.Today);

    // Store data to local storage
    const data: UserData = {
      mode: Mode.Today,
      message: inputValue,
      date: new Date().getUTCDate(),
    };
    saveToLocalStorage("data", data);
  };

  const edit = () => {
    setMode(Mode.Input);
  };

  const init = () => {
    const userData: UserData =
      retriveFromLocalStorage("data") || defaultUserData;
    setMode(userData.mode || Mode.Input);
    setInputValue(userData.message || "");

    // Reset if it's a new date
    if (userData.date != new Date().getUTCDate()) {
      setMode(Mode.Input);
      setInputValue("");
    }
  };

  useEffect(() => {
    init();
  }, []);

  return [mode, setMode, inputValue, setInputValue, save, edit, init];
}
