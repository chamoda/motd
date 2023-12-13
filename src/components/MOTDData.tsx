"use client";

import React, { useState } from "react";

export enum Status {
  Input = "input",
  Today = "today",
}

export default function MOTDData({ data }) {
  const [state, setState] = useState({
    status: data.message ? Status.Today : Status.Input,
    message: data.message,
  });

  const handleInputKeyDown = async (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      if ((event.target as HTMLInputElement).value != "") {
        setState({ ...state, status: Status.Today });

        // Submit message using a fetch post request here
        const response = await fetch("/api/message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: status.message,
            timestamp: Intl.DateTimeFormat().resolvedOptions().timeZone,
          }),
        });
      }
    }
  };

  const handleDouleClick = (event: React.MouseEvent) => {
    setState({ ...state, status: Status.Input });
  };

  return (
    <div>
      {state.status === Status.Input ? (
        <>
          <label htmlFor="message">What is your main focus for today?</label>
          <input
            id="message"
            name="message"
            type="text"
            value={state.message}
            onKeyDown={handleInputKeyDown}
            onChange={(e) => setState({ ...state, message: e.target.value })}
          />
        </>
      ) : (
        <>
          <div>TODAY</div>
          <div onDoubleClick={handleDouleClick}>{state.message}</div>
        </>
      )}
    </div>
  );
}
