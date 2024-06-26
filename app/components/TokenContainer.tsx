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
        style={{
          opacity: isDragging ? 0.5 : 1,
        }}
        // @ts-ignore
        ref={drag}
        className="relative bg-gray-200 rounded-xl overflow-hidden hover:opacity-60 h-full flex flex-col justify-between"
      >
        <img
          key={token.id}
          className="w-full h-auto object-cover rounded-t-xl cursor-pointer"
          src={token.media.url}
          alt="Token"
        />
        <div className="py-3 px-4 flex items-center justify-between">
          <div className="text-black">{token.collection.name}</div>
          <div className="w-[20px]">
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
