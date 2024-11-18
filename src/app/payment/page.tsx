import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Coins, CreditCard, Landmark } from "lucide-react";
import Image from "next/image";
import Balancer from "react-wrap-balancer";

export default function PaymentPage() {
  return (
    <main
      className={cn("w-full min-h-[100svh] h-full flex  bg-payment md:p-8 p-4")}
    >
      <article
        className={cn(
          "max-w-[1100px] w-full h-full mx-auto my-auto rounded-xl",
          "grid md:grid-cols-2 overflow-hidden md:gap-4",
          "bg-white border-2 border-black"
        )}
        style={{
          boxShadow: "5px 5px 0px black"
        }}
      >
        <aside className="flex flex-col p-6 sm:p-12 gap-6 md:gap-8">
          <div className="flex gap-4 items-center">
            <Image
              src={
                "https://lh3.googleusercontent.com/a/ACg8ocJlRH-WW8MtnxjkFBiKEwr8PAiaEY-h80EK2DFuFReE8mDedUs=s360-c-no"
              }
              alt="company logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <h3 className="text-lg font-medium">OpenSource Github</h3>
          </div>

          <h1 className="text-4xl font-medium mt-6 md:mt-8">
            <Balancer>Whatsapp AI bot</Balancer>
          </h1>

          <Image
            src={`https://polar-public-files.s3.amazonaws.com/product_media/ec44f7b5-d8fa-4ab3-aa70-15f82e96cbe8/7c8056be-0e39-4bef-8a68-eab65299bce3/Group%201000002381.png`}
            alt="product image"
            width={400}
            height={400}
            className="rounded-xl max-h-[300px] md:max-w-[450px] max-w-[100%] object-cover"
          />

          <p className="text-lg max-w-xl">
            <Balancer>
              Deployment for whats app AI Bot. Lorem ipsum dolor, sit amet
              consectetur adipisicing elit.
            </Balancer>
          </p>
        </aside>
        <section className="flex flex-col p-6 sm:p-12 md:gap-12 gap-8">
          <h2 className="text-2xl font-medium">Checkout</h2>

          <div>
            <Tabs defaultValue="card" className="w-full max-w-full">
              <TabsList
                className={cn(
                  "bg-payment p-6 px-4 rounded-2xl border border-black text-black"
                )}
                style={{
                  boxShadow: "2px 2px 0px black"
                }}
              >
                <TabsTrigger value="card" className="p-2 rounded-2xl px-6">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Card
                </TabsTrigger>
                <TabsTrigger value="bank" className="p-2 rounded-2xl px-6">
                  <Landmark className="w-4 h-4 mr-2" />
                  Bank
                </TabsTrigger>
                <TabsTrigger value="cash" className="p-2 rounded-2xl px-6">
                  <Coins className="w-4 h-4 mr-2" />
                  Cash App Pay
                </TabsTrigger>
              </TabsList>
              <TabsContent value="card" className="mt-8">
                Make changes to your account here.
              </TabsContent>
              <TabsContent value="bank" className="mt-8">
                Change your password here.
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </article>
    </main>
  );
}
