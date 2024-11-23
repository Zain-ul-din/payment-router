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
import { hexToHSL, isValidURL } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { hslStringToHex } from "../../lib/utils";
import {
  checkOutTheme,
  checkOutThemeZodSchema,
  paymentButtonTheme,
  paymentButtonThemeZodSchema
} from "@/lib/constant/checkout";
import { v4 as uuidv4 } from "uuid";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "../ui/accordion";
import ColorInput from "../shared/color-input";
import { TrashIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";

const formSchema = z.object({
  productName: z
    .string()
    .min(1, {
      message: "Product name is required field."
    })
    .max(100, {
      message: "Title is too long."
    }),
  description: z
    .string()
    .min(1, {
      message: "description is required field"
    })
    .max(2000, {
      message: "Description is too long."
    }),
  styles: checkOutThemeZodSchema,
  buttons: z.record(
    z.string({}),
    z.object({
      text: z.string().min(1, {
        message: "button text is required field."
      }),
      type: z.enum(["button", "text"], {
        message: "Invalid button type"
      }),
      url: z.string().refine((url) => isValidURL(url), {
        message: "Invalid URL."
      }),
      styles: paymentButtonThemeZodSchema
    })
  ),
  invoice: z.record(
    z.string({}),
    z.object({
      item: z.string().min(1, {
        message: "Item name is required field."
      }),
      price: z.coerce.number().min(0, {
        message: "Item price must be a positive number."
      }),
      quantity: z.coerce.number().min(1, {
        message: "Item quantity must be a positive number"
      })
    })
  )
});

type FormType = z.infer<typeof formSchema>;

export default function NewCheckOut() {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      description: "",
      styles: checkOutTheme,
      buttons: {},
      invoice: {}
    }
  });

  return (
    <>
      <CheckOut
        productName={form.watch("productName")}
        description={form.watch("description")}
        styles={form.watch("styles")}
        buttons={Object.values(form.watch("buttons"))}
        invoice={Object.values(form.watch("invoice"))}
      />
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Edit Page</SheetTitle>
            <SheetDescription>
              Make changes to your product details, customize payment buttons,
              and generate invoices. Use the form below to add or edit the
              fields. Changes will be reflected in the checkout process in
              real-time.
            </SheetDescription>
          </SheetHeader>

          <Form {...form}>
            <form
              className="space-y-4 mt-4"
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
                        <Textarea
                          className="max-h-[250px]"
                          placeholder="description"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />

              <div className="grid grid-cols-2 gap-2">
                {(
                  Object.keys(checkOutTheme) as (keyof typeof checkOutTheme)[]
                ).map((key, i) => {
                  return (
                    <FormField
                      key={i}
                      control={form.control}
                      name={`styles.${key}`}
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>{`${key.replace(
                              "--",
                              ""
                            )} color`}</FormLabel>
                            <ColorInput
                              placeholder={key}
                              {...field}
                              onChange={(e) => {
                                form.setValue(
                                  `styles.${key}`,
                                  hexToHSL(e.target.value)
                                );
                                form.trigger(`styles.${key}`);
                              }}
                              value={hslStringToHex(field.value)}
                              className="mr-auto"
                            />
                          </FormItem>
                        );
                      }}
                    />
                  );
                })}
              </div>

              <div className="my-8 h-[1px] bg-border"></div>

              <Accordion type="single" defaultValue="buttons" collapsible>
                <AccordionItem value={"buttons"}>
                  <AccordionTrigger className="hover:no-underline">
                    <h3>Payment Buttons</h3>
                  </AccordionTrigger>
                  {/* render buttons */}

                  <AccordionContent>
                    {Object.entries(form.watch("buttons")).map(
                      ([key, val], i) => {
                        return (
                          <div
                            key={i}
                            className="flex flex-col gap-4 border p-2 py-4 rounded-md mb-2"
                          >
                            <FormField
                              name={`buttons.${key}.text`}
                              control={form.control}
                              render={({ field }) => {
                                return (
                                  <FormItem>
                                    <FormLabel>Text</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="button text"
                                        {...field}
                                      />
                                    </FormControl>
                                  </FormItem>
                                );
                              }}
                            />

                            <FormField
                              name={`buttons.${key}.url`}
                              control={form.control}
                              render={({ field }) => {
                                return (
                                  <FormItem>
                                    <FormLabel>URL</FormLabel>
                                    <FormControl>
                                      <Input placeholder="url" {...field} />
                                    </FormControl>
                                  </FormItem>
                                );
                              }}
                            />

                            <FormField
                              name={`buttons.${key}.type`}
                              control={form.control}
                              render={({ field }) => {
                                return (
                                  <FormItem>
                                    <FormLabel>Type</FormLabel>
                                    <FormControl>
                                      <Select
                                        {...field}
                                        defaultValue="button"
                                        onValueChange={(v) => {
                                          form.setValue(
                                            `buttons.${key}.type`,
                                            v as any
                                          );
                                        }}
                                      >
                                        <SelectTrigger>
                                          <SelectValue placeholder="Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="button">
                                            Button
                                          </SelectItem>
                                          <SelectItem value="text">
                                            Text
                                          </SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </FormControl>
                                  </FormItem>
                                );
                              }}
                            />

                            <div className="grid grid-cols-2 gap-2 p-2">
                              {(
                                Object.keys(
                                  val.styles
                                ) as (keyof typeof val.styles)[]
                              ).map((sKey, i) => {
                                return (
                                  <FormField
                                    key={i}
                                    name={`buttons.${key}.styles.${sKey}`}
                                    control={form.control}
                                    render={({ field }) => {
                                      return (
                                        <FormItem>
                                          <FormLabel>
                                            {sKey.replace("--", "")}
                                          </FormLabel>
                                          <FormControl>
                                            <ColorInput
                                              placeholder={sKey}
                                              type="color"
                                              {...field}
                                              onChange={(e) => {
                                                form.setValue(
                                                  `buttons.${key}.styles.${sKey}`,
                                                  hexToHSL(e.target.value)
                                                );
                                                form.trigger(
                                                  `buttons.${key}.styles.${sKey}`
                                                );
                                              }}
                                              value={hslStringToHex(
                                                field.value
                                              )}
                                            />
                                          </FormControl>
                                        </FormItem>
                                      );
                                    }}
                                  />
                                );
                              })}
                            </div>
                          </div>
                        );
                      }
                    )}
                  </AccordionContent>
                </AccordionItem>
                <div className="flex w-full my-4">
                  <Button
                    className="ml-auto"
                    type="button"
                    size={"sm"}
                    onClick={() => {
                      const key = uuidv4();
                      form.setValue("buttons", {
                        ...form.watch("buttons"),
                        [key]: {
                          text: "hello",
                          url: "https://",
                          styles: paymentButtonTheme,
                          type: "button"
                        }
                      });
                    }}
                  >
                    Add Button
                  </Button>
                </div>
              </Accordion>

              <Accordion type="single" defaultValue="invoice" collapsible>
                <AccordionItem value="invoice">
                  <AccordionTrigger className="hover:no-underline">
                    <h3>Invoice</h3>
                  </AccordionTrigger>
                  <AccordionContent>
                    {Object.entries(form.watch("invoice")).map(([key], i) => {
                      return (
                        <div
                          key={i}
                          className="grid grid-cols-11 mb-2 gap-2  border p-2 rounded-md"
                        >
                          <FormField
                            control={form.control}
                            name={`invoice.${key}.item`}
                            render={({ field }) => (
                              <FormItem className="col-span-5">
                                <FormLabel>Item Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="item name" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`invoice.${key}.price`}
                            render={({ field }) => (
                              <FormItem className="col-span-3">
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="price"
                                    {...field}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`invoice.${key}.quantity`}
                            render={({ field }) => (
                              <FormItem className="col-span-3">
                                <FormLabel>QT</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="quantity"
                                    {...field}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <Button
                            className="col-start-10 ml-3"
                            type="button"
                            variant={"destructive"}
                            size={"icon"}
                            onClick={() => {
                              // eslint-disable-next-line @typescript-eslint/no-unused-vars
                              const { [key]: omittedKey, ...rest } =
                                form.watch("invoice");
                              form.setValue("invoice", rest);
                            }}
                          >
                            <TrashIcon />
                          </Button>
                        </div>
                      );
                    })}
                  </AccordionContent>
                </AccordionItem>

                <div className="flex w-full my-4">
                  <Button
                    className="ml-auto"
                    type="button"
                    size={"sm"}
                    onClick={() => {
                      const key = uuidv4();
                      form.setValue("invoice", {
                        ...form.watch("invoice"),
                        [key]: {
                          item: "New Item",
                          price: 0,
                          quantity: 1
                        }
                      });
                    }}
                  >
                    Add Item
                  </Button>
                </div>
              </Accordion>

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </>
  );
}
