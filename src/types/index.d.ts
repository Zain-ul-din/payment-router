import { checkOutTheme, paymentButtonTheme } from "@/lib/constant/checkout";

export type CheckOutParams = {
  productName: string;
  description: string;
  imgURL?: string | ArrayBuffer;
  styles?: typeof checkOutTheme;
  buttons: {
    text: string;
    url: string;
    type: "button" | "text";
    styles: typeof paymentButtonTheme;
  }[];
  invoice: {
    item: string;
    price: number;
    quantity: number;
  }[];
};
