import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { checkOutTheme } from "@/lib/constant/checkout";
import { cn } from "@/lib/utils";
import { CheckOutParams } from "@/types";
import { Coins, CreditCard, Landmark } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

export default function CheckOut({
  productName,
  description,
  imgURL,
  styles,
  buttons,
  invoice
}: CheckOutParams) {
  return (
    <main
      style={{
        ...checkOutTheme,
        ...styles
      }}
      className={cn(
        "w-full min-h-[100svh] h-full flex bg-background md:p-8 p-4"
      )}
    >
      <article
        className={cn(
          "max-w-[1100px] w-full h-full mx-auto my-auto rounded-xl text-foreground",
          "grid md:px-[20%] lg:px-0 lg:grid-cols-2 overflow-hidden md:gap-4",
          "bg-card border-2"
        )}
        style={{
          boxShadow: "5px 5px 0px hsl(var(--border))"
        }}
      >
        <aside className="flex  flex-col  p-6 sm:p-12 gap-6 md:gap-8">
          <div className="flex gap-2 items-center">
            <Image
              src={
                "https://lh3.googleusercontent.com/a/ACg8ocJlRH-WW8MtnxjkFBiKEwr8PAiaEY-h80EK2DFuFReE8mDedUs=s360-c-no"
              }
              alt="company logo"
              width={35}
              height={35}
              className="rounded-full"
            />
            <h3 className="font-medium">OpenSource Github</h3>
          </div>

          <h1 className="text-4xl font-medium mt-6 md:mt-8">
            <Balancer>{productName || "Product Name"}</Balancer>
          </h1>

          <Image
            src={
              imgURL?.toString() ||
              `https://polar-public-files.s3.amazonaws.com/product_media/ec44f7b5-d8fa-4ab3-aa70-15f82e96cbe8/7c8056be-0e39-4bef-8a68-eab65299bce3/Group%201000002381.png`
            }
            alt="product image"
            width={400}
            height={400}
            className="rounded-xl max-h-[300px] md:max-w-[450px] max-w-[100%] object-cover"
          />

          <p className="text-lg max-w-xl">
            <Balancer>{description || "Short description."}</Balancer>
          </p>
        </aside>
        <section className="flex flex-col h-full p-6 sm:p-12 md:gap-12 gap-8">
          <h2 className="text-2xl font-medium">Checkout</h2>

          <div>
            <Tabs defaultValue="card" className="w-full max-w-[350px]">
              <TabsList
                className={cn("border bg-background text-foreground w-full")}
                style={{
                  boxShadow: "2px 2px 0px hsl(var(--border))"
                }}
              >
                <TabsTrigger
                  value="card"
                  className="data-[state=active]:bg-card"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Card
                </TabsTrigger>
                <TabsTrigger
                  value="bank"
                  className="data-[state=active]:bg-card"
                >
                  <Landmark className="w-4 h-4 mr-2" />
                  Bank
                </TabsTrigger>
                <TabsTrigger
                  value="other"
                  className="data-[state=active]:bg-card"
                >
                  <Coins className="w-4 h-4 mr-2" />
                  Other
                </TabsTrigger>
              </TabsList>
              <TabsContent value="card">
                <div className="mt-8 flex flex-col gap-2">
                  <p>Payment options using card</p>
                  {buttons.map((btn, idx) => {
                    return (
                      <Link
                        referrerPolicy="no-referrer"
                        key={idx}
                        href={btn.url}
                        target="_blank"
                      >
                        <Button
                          size={"lg"}
                          key={idx}
                          className="rounded-full py-4 text-xl w-full text-center"
                          style={{
                            ...btn.styles
                          }}
                        >
                          {btn.text}
                        </Button>
                      </Link>
                    );
                  })}
                </div>
                {/* <Button
                  size={"lg"}
                  className="rounded-full py-4 text-xl w-full text-center"
                >
                  Pay with <span className="text-indigo-500">Stripe</span>
                </Button>
                <Button
                size={"lg"}
                className="rounded-full text-black py-4 text-xl w-full text-center"
                style={{
                  background: "rgb(255, 144, 232)"
                  }}
                >
                  Pay on <span className="text-blue-950">Gumroad</span>
                </Button> */}
              </TabsContent>
              <TabsContent value="bank">
                <div className="mt-8 flex flex-col gap-4">
                  <p>Payment options using card</p>
                  <Input
                    className="rounded-2xl py-6 border border-black"
                    value={"IBAN: PK17MEZN0002090106236587"}
                    readOnly
                  />
                </div>
              </TabsContent>
              <TabsContent value="other">
                <div className="mt-8 flex flex-col gap-4">
                  No other option available.
                </div>
              </TabsContent>
            </Tabs>

            <div className="border-t mt-8 border-border/40 pt-8 max-w-[350px] flex flex-col gap-4">
              {invoice.map(({ item, price, quantity }, i) => {
                return (
                  <div className="grid grid-cols-10 items-center" key={i}>
                    <h3 className="col-span-6">{item}</h3>
                    <span className="col-span-2 ml-auto text-foreground/80">
                      {quantity > 1 && <>{quantity}x</>}
                    </span>
                    <p className="ml-auto col-span-2">{price}$</p>
                  </div>
                );
              })}
              <div className="grid grid-cols-2">
                <h3 className="font-bold">Total</h3>
                <p className="ml-auto font-bold">
                  {invoice.reduce(
                    (acc, curr) =>
                      acc +
                      parseInt(curr.price + "") * parseInt(curr.quantity + ""),
                    0
                  )}
                  $
                </p>
              </div>
            </div>
          </div>
          <footer className="mt-auto text-xs text-foreground/60">
            <Balancer>
              Powered by PayRouter. An open-source solution for payments
              routing.
            </Balancer>
          </footer>
        </section>
      </article>
    </main>
  );
}
