import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import { ColorResult, GithubPicker } from "react-color";

import { getTokens } from "../requests";
import { Token } from "../types";
import { colors } from "../constants";

const inputStyles =
  "ring-1 rounded-lg focus:ring-zinc-100 outline-none bg-white shadow-sm placeholder:text-zinc-500 flex h-10 items-center justify-between bg-transparent p-2 text-left text-zinc-600 transition-all hover:ring-zinc-100 ring-zinc-600";

const Header = ({
  background,
  setTokens,
  setBackground,
}: {
  background: string;
  setBackground: Dispatch<SetStateAction<string>>;
  setTokens: Dispatch<SetStateAction<Token[]>>;
}) => {
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState<string>("the-rejects");
  const [limit, setLimit] = useState<number>(10);
  const [showDropDown, setShowDropdown] = useState(false);
  const handleBackgroundColorChange = (color: ColorResult) => {
    setBackground(color.hex);
    setShowDropdown(false);
  };

  const fetchTokens = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getTokens(address, limit);
      setTokens(result?.data?.tokens?.tokens ?? []);
    } catch (err) {
      toast.error(`Failed to get data for address: ${address}`);
      setAddress("");
      setTokens([]);
    } finally {
      setLoading(false);
    }
  }, [address, limit]);

  useEffect(() => {
    fetchTokens();
  }, []);

  return (
    <div className="flex items-center py-6 px-4 bg-zinc-800">
      <div className="relative ml-auto">
        <div
          onClick={() => setShowDropdown(!showDropDown)}
          className="ml-auto w-8 h-8 cursor-pointer hover:opacity-90 transition-opacity duration-300 bg-black flex justify-center items-center rounded-xl"
          style={{ backgroundColor: background }}
        ></div>
        {showDropDown && (
          <div className="absolute top-[40px]">
            <GithubPicker
              triangle="hide"
              color={background}
              colors={colors}
              onChangeComplete={handleBackgroundColorChange}
            />
          </div>
        )}
      </div>
      <input
        className={`w-[100px] mx-4 ${inputStyles}`}
        type="number"
        placeholder="Limit"
        onChange={(e) => setLimit(parseInt(e.target.value))}
        value={limit}
      />
      <input
        className={`w-[400px] mr-2 ${inputStyles}`}
        type="text"
        placeholder="Search Address..."
        onChange={(e) => setAddress(e.target.value)}
        value={address}
      />

      <div className="w-[100px] flex justify-center">
        {loading ? (
          <TailSpin
            visible={true}
            height="40"
            width="40"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            color="#3B82F6"
          />
        ) : (
          <button
            type="button"
            className="px-4 w-full py-2 text-white rounded-lg shadow hover:bg-blue-400 bg-blue-500 transition duration-300 ease-in-out disabled:bg-blue-600"
            onClick={fetchTokens}
            disabled={address.trim().length === 0}
          >
            Search
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
