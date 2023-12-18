"use client";

import React, { useState, useRef } from "react";

export enum Status {
  Input = "input",
  Today = "today",
}

interface Data {
  message?: string;
}

export default function Motd({ data }: { data: Data }) {
  const [state, setState] = useState({
    status: data.message ? Status.Today : Status.Input,
    message: data.message,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  async function submitMessage() {
    const response = await fetch("/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: state.message,
        timestamp: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }),
    });
  }

  async function handleInputKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Enter") {
      if ((event.target as HTMLInputElement).value != "") {
        setState({message: inputRef.current?.value, status: Status.Today });

        await submitMessage();
      }
    }
  }

  function handleDouleClick(event: React.MouseEvent) {
    setState({ ...state, status: Status.Input });
  }

  function renderInput() {
    return (
      <>
        <label htmlFor="message">What is your main focus for today?</label>
        <input
          id="message"
          name="message"
          type="text"
          defaultValue={state.message}
          onKeyDown={handleInputKeyDown}
	  ref={inputRef}
        />
      </>
    );
  }

  function renderToday() {
    return (
      <>
        <div>TODAY</div>
        <div onDoubleClick={handleDouleClick}>{state.message}</div>
      </>
    );
  }

  function render(status: Status) {
    switch (status) {
      case Status.Input:
        return renderInput();
      case Status.Today:
        return renderToday();
    }
  }

  return <div>{render(state.status)}</div>;
}
