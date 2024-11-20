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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { hslStringToHex } from "../../lib/utils";

const formSchema = z.object({
  productName: z.string({
    message: "Product name is required field."
  }),
  description: z.string({
    message: "description is required field"
  }),
  styles: z.object({
    "--background": z.string(),
    "--border": z.string(),
    "--card": z.string()
  })
});

export default function NewPaymentPage() {
  // const [productName, setProductName] = useState<string>("");
  // const [description, setDescription] = useState<string>("");
  // const [img, setImg] = useState<string | ArrayBuffer | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      styles: {
        "--background": "45.08 91.71% 62.16%",
        "--border": "0 0% 10%",
        "--card": "0 0% 100%"
      }
    }
  });

  return (
    <>
      <CheckOut
        productName={form.watch("productName")}
        description={form.watch("description")}
        styles={form.watch("styles")}
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

              <div className="grid grid-cols-2 gap-2">
                <FormField
                  name="styles.--background"
                  control={form.control}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Background Color</FormLabel>
                        <FormControl>
                          <Input
                            type="color"
                            placeholder="bg-color"
                            {...field}
                            onChange={(e) => {
                              form.setValue(
                                "styles.--background",
                                hexToHSL(e.target.value)
                              );
                              form.trigger("styles.--background");
                            }}
                            value={hslStringToHex(field.value)}
                          />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  name="styles.--border"
                  control={form.control}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Border Color</FormLabel>
                        <FormControl>
                          <Input
                            type="color"
                            placeholder="bg-color"
                            {...field}
                            onChange={(e) => {
                              form.setValue(
                                "styles.--border",
                                hexToHSL(e.target.value)
                              );
                              form.trigger("styles.--border");
                            }}
                            value={hslStringToHex(field.value)}
                          />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  name="styles.--card"
                  control={form.control}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Card Color</FormLabel>
                        <FormControl>
                          <Input
                            type="color"
                            placeholder="bg-color"
                            {...field}
                            onChange={(e) => {
                              form.setValue(
                                "styles.--card",
                                hexToHSL(e.target.value)
                              );
                              form.trigger("styles.--card");
                            }}
                            value={hslStringToHex(field.value)}
                          />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              </div>

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </>
  );
}
