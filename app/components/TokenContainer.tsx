import { Dispatch, SetStateAction } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Token } from "@/app/types/index";
import { FaRegTrashAlt } from "react-icons/fa";

const TokenContainer = ({
  token,
  tokens,
  setTokens,
  deleteToken,
}: {
  token: Token;
  tokens: Token[];
  setTokens: Dispatch<SetStateAction<Token[]>>;
  deleteToken: () => void;
}) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "box",
      item: { token },
      collect: (monitor: any) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [token]
  );

  const [_, drop] = useDrop(
    () => ({
      accept: "box",
      drop: (zx: any) => {
        const droppedToken = zx.token;
        const firstPos = tokens.findIndex(
          (currentToken) => currentToken.id === droppedToken.id
        );
        const secondPos = tokens.findIndex(
          (currentToken) => currentToken.id === token.id
        );

        const newTokens = [...tokens];
        newTokens[firstPos] = token;
        newTokens[secondPos] = droppedToken;

        setTokens([...newTokens]);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [tokens]
  );

  return (
    // @ts-ignore
    <div ref={drop}>
      <div
        className={`transition-opacity duration-300 ${
          isDragging ? "opacity-50" : "opacity-100"
        } relative bg-gray-200 rounded-xl overflow-hidden hover:opacity-80 h-full flex flex-col justify-between cursor-pointer`}
        // @ts-ignore
        ref={drag}
      >
        <img
          key={token.id}
          className="w-full h-auto object-cover rounded-t-xl"
          src={token.media.url}
          alt="Token"
        />
        <div className="py-3 px-4 flex items-center justify-between">
          <div className="text-black">{token.collection.name}</div>
          <div className="w-5">
            <FaRegTrashAlt
              size={20}
              className="cursor-pointer text-zinc-900 hover:text-zinc-500 transition duration-100 ease-in-out"
              onClick={deleteToken}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenContainer;
