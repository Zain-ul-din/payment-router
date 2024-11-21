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

const formSchema = z.object({
  productName: z.string().min(1, {
    message: "Product name is required field."
  }),
  description: z.string().min(1, {
    message: "description is required field"
  }),
  styles: checkOutThemeZodSchema,
  buttons: z.record(
    z.string({}),
    z.object({
      text: z.string().min(1, {
        message: "button text is required field."
      }),
      url: z.string().refine((url) => isValidURL(url), {
        message: "Invalid URL."
      }),
      styles: paymentButtonThemeZodSchema
    })
  )
});

type FormType = z.infer<typeof formSchema>;

export default function NewCheckOut() {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      styles: checkOutTheme,
      buttons: {}
    }
  });

  return (
    <>
      <CheckOut
        productName={form.watch("productName")}
        description={form.watch("description")}
        styles={form.watch("styles")}
        buttons={Object.values(form.watch("buttons"))}
      />
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent className="overflow-y-auto">
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
                            <Input
                              type="color"
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
                            />
                          </FormItem>
                        );
                      }}
                    />
                  );
                })}
              </div>

              {/* render buttons */}
              {Object.entries(form.watch("buttons")).map(([key, val], i) => {
                return (
                  <div
                    key={i}
                    className="flex flex-col gap-4 bg-accent border p-2 rounded-md"
                  >
                    <FormField
                      name={`buttons.${key}.text`}
                      control={form.control}
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Payment Button</FormLabel>
                            <FormControl>
                              <Input placeholder="button text" {...field} />
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
                            <FormLabel>Payment Button</FormLabel>
                            <FormControl>
                              <Input placeholder="url" {...field} />
                            </FormControl>
                          </FormItem>
                        );
                      }}
                    />

                    <div className="grid grid-cols-2 gap-2">
                      {(
                        Object.keys(val.styles) as (keyof typeof val.styles)[]
                      ).map((sKey, i) => {
                        return (
                          <FormField
                            key={i}
                            name={`buttons.${key}.styles.${sKey}`}
                            control={form.control}
                            render={({ field }) => {
                              return (
                                <FormItem>
                                  <FormLabel className="text-xs">
                                    {sKey.replace("--", "")}
                                  </FormLabel>
                                  <FormControl>
                                    <Input
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
                                      value={hslStringToHex(field.value)}
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
              })}

              <Button
                type="button"
                onClick={() => {
                  const key = uuidv4();
                  form.setValue("buttons", {
                    ...form.watch("buttons"),
                    [key]: {
                      text: "hello",
                      url: "https://",
                      styles: paymentButtonTheme
                    }
                  });
                }}
              >
                Add Button
              </Button>

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </>
  );
}
