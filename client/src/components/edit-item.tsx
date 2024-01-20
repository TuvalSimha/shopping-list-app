import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from "./ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Item } from "@/gql/graphql";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { graphql } from "@/gql";
import { useMutation } from "urql";

type EditItemProps = {
  item: Item;
  isDrawerOpen: boolean;
};

const updateItemMutation = graphql(/* GraphQL */ `
  mutation updateItem($id: ID!, $name: String!) {
    updateList(id: $id, name: $name) {
      id
    }
  }
`);

export function EditItem(props: EditItemProps) {
  const [updateItemResult, updateItem] = useMutation(updateItemMutation);

  if (updateItemResult.error) {
    console.error(updateItemResult.error);
  }

  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Item name must be at least 2 characters long",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: props.item.name,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateItem({ name: values.name, id: props.item.listId });
    form.clearErrors();
  }

  return (
    <Drawer open={props.isDrawerOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="flex left-0 text-[28px] w-full">
            Edit Item
          </DrawerTitle>
        </DrawerHeader>
        <div className="px-[20px] gap-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name List" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DrawerFooter>
                <Button type="submit">Submit</Button>
                <DrawerClose>
                  <Button
                    onClick={() => {
                      form.clearErrors();
                    }}
                    className="w-full "
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
