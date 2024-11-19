"use client";
import CheckOut from "@/components/checkout";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { hexToHSL } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  productName: z.string({
    message: "Product name is required field."
  }),
  description: z.string({
    message: "description is required field"
  })
});

export default function NewPaymentPage() {
  // const [productName, setProductName] = useState<string>("");
  // const [description, setDescription] = useState<string>("");
  // const [img, setImg] = useState<string | ArrayBuffer | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: ""
    }
  });

  const [color, setColor] = useState<string>("45.08 91.71% 62.16%");

  return (
    <>
      <CheckOut
        productName={form.watch("productName")}
        description={form.watch("description")}
        styles={{
          "--background": color,
          "--border": "0 0% 10%",
          "--card": color || "0 0% 100%"
        }}
      />
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>

          <Form {...form}>
            <form
              className="space-y-4 mt-8"
              onSubmit={form.handleSubmit((data) => {
                console.log(data);
              })}
            >
              <FormField
                name="productName"
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Product name" {...field} />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />

              <FormField
                name="description"
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="description" {...field} />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />

              <Button type="submit">Submit</Button>
            </form>
          </Form>

          <Input
            type="color"
            placeholder="bg-color"
            onChange={(e) => {
              setColor(hexToHSL(e.target.value));
            }}
          />
        </SheetContent>
      </Sheet>
    </>
  );
}
