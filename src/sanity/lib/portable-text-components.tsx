import { PortableTextComponents } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import { ClientImage } from "@/components/client-image";

export const components: PortableTextComponents = {
  types: {
    image: (props) =>
      props.value ? (
        <ClientImage
          className="rounded-lg not-prose w-full h-auto"
          src={urlFor(props.value)
            .width(600)
            .height(400)
            .quality(80)
            .auto("format")
            .url()}
          alt={props?.value?.alt || ""}
          width="600"
          height="400"
        />
      ) : null,
  },
};
