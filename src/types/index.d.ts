import { checkOutTheme } from "@/lib/constant/checkout";

export type CheckOutParams = {
  productName: string;
  description: string;
  imgURL?: string | ArrayBuffer;
  styles?: typeof checkOutTheme;
};
