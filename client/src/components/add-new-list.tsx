import * as React from "react";
import { PlusIcon } from "@radix-ui/react-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { graphql } from "@/gql";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { useMutation } from "urql";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "List name must be at least 2 characters long",
  }),
  description: z
    .string()
    .min(2, {
      message: "Description must be at least 2 characters long",
    })
    .optional(),
  tag: z
    .string()
    .min(2, {
      message: "Tag must be at least 2 characters long",
    })
    .optional(),
});

const CreateNewList = graphql(/* GraphQL */ `
  mutation CreateNewList($name: String!, $description: String, $tag: String) {
    createList(name: $name, description: $description, tag: $tag) {
      id
    }
  }
`);

export function AddNewList() {
  const [updateCreateNewListResult, createNewList] = useMutation(CreateNewList);

  if (updateCreateNewListResult.error) {
    console.error(updateCreateNewListResult.error);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      tag: "",
    },
  });

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    createNewList({ name: values.name });
    form.clearErrors();
    closeDrawer();
  }

  return (
    <Drawer open={isDrawerOpen}>
      <DrawerTrigger asChild>
        <Button className="rounded-full w-[50px] h-[50px]" onClick={openDrawer}>
          <PlusIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="flex left-0 text-[28px] w-full">
            Add New List
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
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Description list" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tag"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tag</FormLabel>
                    <FormControl>
                      <Input placeholder="Tag list" {...field} />
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
                      closeDrawer();
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
