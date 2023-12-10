"use client";

import React from "react";

import { useLocalStorageData, Mode } from "@/hooks/useLocalStorageData";

export default function MOTDData() {
  const [mode, setMode, inputValue, setInputValue, save, edit, init] =
    useLocalStorageData();

  const handleInputKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      if ((event.target as HTMLInputElement).value != "") {
        save();
      }
    }
  };

  const handleDouleClick = (event: React.MouseEvent) => {
    edit();
  };

  const render = (value: Mode) => {
    switch (value) {
      case Mode.Loading:
        return (
          <>
            <div className="text-4xl">Loading...</div>
          </>
        );
      case Mode.Input:
        return (
          <>
            <label className="text-4xl" htmlFor="message">
              What is your main focus for today?
            </label>
            <input
              className="text-6xl my-6 border-black border-b-4 focus:outline-none p-4 w-full"
              id="message"
              name="message"
              type="text"
              value={inputValue}
              onKeyDown={handleInputKeyDown}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </>
        );
      case Mode.Today:
        return (
          <>
            <div className="text-4xl">TODAY</div>
            <div
              className="text-6xl my-6 border-black p-4 hover:cursor-pointer"
              onDoubleClick={handleDouleClick}
            >
              {inputValue}
            </div>
          </>
        );
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center max-w-screen-md mx-auto">
        {render(mode)}
      </div>
    </div>
  );
}
