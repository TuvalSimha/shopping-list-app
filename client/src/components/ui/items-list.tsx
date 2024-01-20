import { cn } from "@/lib/utils";
import { ScrollArea } from "./scroll-area";
import { Badge } from "./badge";
import { Item } from "@/gql/graphql";
import { useState } from "react";
import { Drawer } from "vaul";
import { EditItem } from "../edit-item";

interface ListProps {
  items: Item[];
}

export function ItemsList({ items }: ListProps) {
  const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [choosenItem, setChoosenItem] = useState<Item>(items[0]);

  return (
    <>
      <ScrollArea>
        <div className="flex flex-col gap-2 p-4 ">
          {items.map((item) => (
            <button
              onClick={() => {
                setChoosenItem(item);
                setDrawerOpen(true);
              }}
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
                      {!item.createdAt ||
                      item.createdAt < String(last24Hours) ? null : (
                        <Badge variant="default">New</Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-xs font-medium">
                    Quantity to buy:{" "}
                    <Badge variant="default">{item.quantity}</Badge>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
      <EditItem isDrawerOpen={drawerOpen} item={choosenItem} />
    </>
  );
}
