import { SelectItem } from "../ui/select";

interface ITokenSelectItemProps {
  image: string;
  name: string;
  balance: string;
  symbol: string;
}

export default function TokenSelectItem({
  image,
  name,
  balance,
  symbol,
}: ITokenSelectItemProps) {
  return (
    <SelectItem value={symbol}>
      <div className="flex items-center py-4 gap-4">
        <img src={image} alt={symbol} width={32} height={32} />
        <p>{name}</p>
        <p className="font-semibold">
          {balance} {symbol}
        </p>
      </div>
    </SelectItem>
  );
}
