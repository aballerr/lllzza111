"use client";

import { useState, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TokenContainer from "./components/TokenContainer";
import { Token } from "./types";
import Header from "./components/Header";

export default function Home() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [background, setBackground] = useState("#fff");
  const deleteToken = useCallback((tokenToDelete: Token) => {
    setTokens((prevTokens) =>
      prevTokens.filter((token) => token.id !== tokenToDelete.id)
    );
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <Header
          background={background}
          setBackground={setBackground}
          setTokens={setTokens}
        />
        <main
          className="flex min-h-screen flex-col items-center justify-between p-24"
          style={{ backgroundColor: background }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {tokens.map((token) => (
              <TokenContainer
                key={token.id}
                tokens={tokens}
                setTokens={setTokens}
                token={token}
                deleteToken={() => deleteToken(token)}
              />
            ))}
          </div>
        </main>
      </div>
      <ToastContainer />
    </DndProvider>
  );
}
