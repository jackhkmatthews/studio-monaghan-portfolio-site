import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { SETTINGS_QUERY } from "@/sanity/queries";
import { textClasses } from "@/styles/textClasses";
import Image from "next/image";

export default async function Home() {
  const { data: settings } = await sanityFetch({ query: SETTINGS_QUERY });
  return (
    <div className="p-2 flex flex-col gap-4">
      <p className={textClasses.body}>{settings?.description}</p>
      {settings?.homepageImage ? (
        <figure className="lg:col-span-4 flex flex-col gap-2 items-start">
          <Image
            src={urlFor(settings.homepageImage).width(1051).height(699).url()}
            width={1051}
            height={699}
            alt=""
          />
        </figure>
      ) : null}
    </div>
  );
}
