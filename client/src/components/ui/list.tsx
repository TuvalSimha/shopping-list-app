import { cn } from "@/lib/utils";
import { ScrollArea } from "./scroll-area";
import { Badge } from "./badge";
import { List } from "@/gql/graphql";
import Link from "next/link";

interface ListProps {
  items: List[];
}

export function ListComponent({ items }: ListProps) {
  const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const itemsLength = items.map((item) => item.items.length);
  const itemsPending = items.filter(
    (item) => item.status === "approved"
  ).length;

  return (
    <ScrollArea>
      <div className="flex flex-col gap-2 p-4 ">
        {items.map((item) => (
          <Link
            href={`/shopping-list/${item.id}`}
            key={item.id}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent bg-slate-200"
            )}
          >
            <div className="flex flex-row justify-between w-full">
              <div className="flex w-full flex-col gap-1">
                <div className="flex items-center">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold">{item.name}</div>
                    {!item.createdAt ||
                    item.createdAt > String(last24Hours) ? null : (
                      <Badge variant="default">New</Badge>
                    )}
                  </div>
                </div>
                <div className="text-xs font-medium">{item.description}</div>
              </div>
              <div className="flex w-full flex-col gap-1">
                <div className="flex items-center">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold">{item.name}</div>
                    {!item.createdAt ||
                    item.createdAt < String(last24Hours) ? null : (
                      <Badge variant="default">New</Badge>
                    )}
                  </div>
                </div>
                <div className="text-xs font-medium">
                  List items {itemsPending} / {itemsLength} Completed{" "}
                </div>
              </div>
            </div>
            {item.tag && <Badge key={item.tag}>{item.tag}</Badge>}
          </Link>
        ))}
      </div>
    </ScrollArea>
  );
}
