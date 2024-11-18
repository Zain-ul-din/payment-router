"use client";
import CheckOut from "@/components/checkout";
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
import { useState } from "react";

export default function NewPaymentPage() {
  const [productName, setProductName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [img, setImg] = useState<string | ArrayBuffer | null>(null);

  return (
    <>
      <CheckOut
        imgURL={img as string}
        productName={productName}
        description={description}
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

          <Input
            placeholder="Product name"
            value={productName}
            onChange={(e) => {
              setProductName(e.target.value);
            }}
          />

          <Textarea
            placeholder="Product description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />

          <Input
            type="file"
            placeholder="select file"
            onChange={(e) => {
              if (e.target.files) {
                const file = e.target.files[0];
                const fileReader = new FileReader();
                fileReader.onload = () => {
                  setImg(fileReader.result);
                };
                fileReader.readAsDataURL(file);
              }
            }}
          />
        </SheetContent>
      </Sheet>
    </>
  );
}
