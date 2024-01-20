import { AddNewItemToList } from "@/components/add-new-item-to-list";
import { Button } from "@/components/ui/button";
import { ItemsList } from "@/components/ui/items-list";
import { ListComponent } from "@/components/ui/list";
import { Separator } from "@/components/ui/separator";
import { useQueryListById } from "@/lib/useQueryListById";
import { Tabs, TabsContent } from "@radix-ui/react-tabs";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const id = router.query.slug;
  const data = useQueryListById({ id: id as string });
  console.log(id);

  if (!data || !data.data || !data.data.list) return null;

  const itemsLength = data.data.list.items.length;
  const listId = data.data.list.id;

  return itemsLength === 0 ? (
    <div className="w-full h-screen flex flex-col p-[20px]">
      <div className="border-[2px] border-black rounded-xl border-dashed w-full h-[200px] mt-[100px]">
        <h1 className="flex flex-row justify-center w-full text-[20px] font-semibold">
          You dont have any items in your list
        </h1>
        <h2 className="justify-center flex text-center p-[20px]">
          Add items to your list
        </h2>
        <div className="flex justify-center">
          {id && <AddNewItemToList listId={listId} />}
        </div>
      </div>
    </div>
  ) : (
    <div className="mt-[20px] top-0 h-screen">
      <div className="flex flex-row justify-between px-4 py-2">
        <h1 className="text-xl font-bold">Items</h1>
        <button
          onClick={() => {
            router.push(`/shopping-list`);
          }}
          className="right-0"
        >
          Back
        </button>
      </div>
      <Separator />
      <ItemsList items={data.data.list.items} />
    </div>
  );
}
