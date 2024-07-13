import { ITokenMetadata } from "@/hooks/useWallet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import TokenSelectItem from "./TokenSelectItem";

interface ITokenSelectProps {
  onSelect: (value: string) => void;
  tokenList: ITokenMetadata[];
  placeholder: string;
}

export default function TokenSelect({
  onSelect,
  tokenList,
  placeholder,
}: ITokenSelectProps) {
  return (
    <Select onValueChange={onSelect}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {tokenList.map((token, index) => (
            <TokenSelectItem
              key={index}
              name={token.name}
              image={token.image}
              balance={token.balance}
              symbol={token.symbol}
            />
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
