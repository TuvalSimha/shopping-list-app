import { List } from "@/gql/graphql";
import Link from "next/link";

type CardProps = {
  list: Omit<List, "items">;
};

export const Card = ({ list }: CardProps) => {
  return (
    <Link
      href={`/lists/${list.id}`}
      className="flex flex-col gap-[10px] p-[20px] border-2 border-gray-300 rounded-md"
    >
      <div>
        <h1 className="text-[28px] font-semibold">{list.name}</h1>
      </div>
      <div className="flex flex-row justify-between">
        <p className="text-[18px]">{`List ID: ${list.id}`}</p>
        <p className="text-[18px]">{`Status: ${list.status}`}</p>
      </div>
    </Link>
  );
};
