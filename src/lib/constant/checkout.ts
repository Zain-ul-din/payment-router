import { z } from "zod";

export const checkOutThemeZodSchema = z.object({
  "--background": z.string(),
  "--border": z.string(),
  "--card": z.string(),
  "--foreground": z.string()
});

export const checkOutTheme: z.infer<typeof checkOutThemeZodSchema> = {
  "--background": "45.08 91.71% 62.16%",
  "--border": "0 0% 5%",
  "--card": "0 0% 100%",
  "--foreground": "0 0% 3.9%"
};
