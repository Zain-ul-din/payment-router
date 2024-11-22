import { checkOutTheme, paymentButtonTheme } from "@/lib/constant/checkout";

export type CheckOutParams = {
  productName: string;
  description: string;
  imgURL?: string | ArrayBuffer;
  styles?: typeof checkOutTheme;
  buttons: { text: string; url: string; styles: typeof paymentButtonTheme }[];
  invoice: {
    item: string;
    price: number;
    quantity: number;
  }[];
};
