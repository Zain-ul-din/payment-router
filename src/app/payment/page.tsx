import { cn } from "@/lib/utils";
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
          "grid md:grid-cols-2 overflow-hidden",
          "bg-white border-2 border-black"
        )}
        style={{
          boxShadow: "5px 5px 0px black"
        }}
      >
        <aside className="flex flex-col p-6 md:p-12 gap-8 mx-auto my-auto">
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

          <h1 className="text-4xl font-medium mt-8">
            <Balancer>Whatsapp AI bot</Balancer>
          </h1>

          <Image
            src={`https://polar-public-files.s3.amazonaws.com/product_media/ec44f7b5-d8fa-4ab3-aa70-15f82e96cbe8/7c8056be-0e39-4bef-8a68-eab65299bce3/Group%201000002381.png`}
            alt="product image"
            width={400}
            height={400}
            className="rounded-xl  max-h-[300px] md:max-w-[350px] max-w-[100%] object-cover"
          />

          <p className="text-lg max-w-xl">
            <Balancer>
              Deployment for whats app AI Bot. Lorem ipsum dolor, sit amet
              consectetur adipisicing elit. Reprehenderit eum blanditiis
              temporibus, earum cumque possimus.
            </Balancer>
          </p>
        </aside>
        <section className="flex flex-col p-6 md:p-12 gap-12">
          <h2 className="text-2xl font-medium">Checkout</h2>
        </section>
      </article>
    </main>
  );
}
