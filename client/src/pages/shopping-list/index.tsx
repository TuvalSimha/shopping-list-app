import { AddNewList } from "@/components/add-new-list";
import { ListComponent } from "@/components/ui/list";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQueryAllLists } from "@/lib/useQueryAllLists";

export default function Lists() {
  const data = useQueryAllLists({
    status: undefined,
  });

  const allPendingLists = useQueryAllLists({
    status: "pending",
  });

  if (
    !data ||
    !data.data ||
    !data.data.lists ||
    !allPendingLists ||
    !allPendingLists.data ||
    !allPendingLists.data.lists
  )
    return null;

  const noList =
    !data ||
    !data.data ||
    !data.data.lists ||
    !allPendingLists ||
    !allPendingLists.data ||
    !allPendingLists.data.lists ||
    data.data.lists.length === 0 ||
    allPendingLists.data.lists.length === 0;

  return (
    <div className="mt-[20px] top-0 h-screen">
      <Tabs defaultValue="active">
        <div className="flex items-center px-4 py-2">
          <h1 className="text-xl font-bold">Lists</h1>
          <TabsList
            defaultValue="active"
            className="ml-auto w-[200px] sticky top-0 z-10"
          >
            <TabsTrigger
              disabled={noList}
              value="active"
              className="text-zinc-600 dark:text-zinc-200"
            >
              Active Lists
            </TabsTrigger>
            <TabsTrigger
              disabled={noList}
              value="all"
              className="text-zinc-600 dark:text-zinc-200"
            >
              All Lists
            </TabsTrigger>
          </TabsList>
        </div>
        <Separator />
        {!noList ? (
          <>
            <TabsContent value="active" className="mt-[10px]">
              <ListComponent items={allPendingLists.data.lists} />
            </TabsContent>
            <TabsContent value="all" className="mt-[10px]">
              <ListComponent items={data.data.lists} />
            </TabsContent>
          </>
        ) : (
          <div className="w-full h-screen flex flex-col p-[20px]">
            <div className="border-[2px] border-black rounded-xl border-dashed w-full h-[200px] mt-[100px]">
              <h1 className="flex flex-row justify-center w-full text-[20px] font-semibold">
                Grocery Shopping List
              </h1>
              <h2 className="justify-center flex text-center p-[20px]">
                Your smart shopping list will shown here. start by creating a
                new list
              </h2>
              <div className="flex justify-center">
                <AddNewList />
              </div>
            </div>
          </div>
        )}
      </Tabs>
    </div>
  );
}
