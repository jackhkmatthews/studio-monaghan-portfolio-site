import { CogIcon, DocumentTextIcon, ProjectsIcon } from "@sanity/icons";
import type { StructureBuilder, StructureResolver } from "sanity/structure";
import pluralize from "pluralize-esm";

const DISABLED_TYPES = ["settings", "about", "home", "work"];

export const structure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title("Website Content")
    .items([
      ...S.documentTypeListItems()
        // Remove the "assist.instruction.context" and "settings" content  from the list of content types
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .filter((listItem: any) => !DISABLED_TYPES.includes(listItem.getId()))
        // Pluralize the title of each document type.  This is not required but just an option to consider.
        .map((listItem) => {
          return listItem.title(pluralize(listItem.getTitle() as string));
        }),
      // Settings Singleton in order to view/edit the one particular document for Settings.  Learn more about Singletons: https://www.sanity.io/docs/create-a-link-to-a-single-edit-page-in-your-main-document-type-list
      S.listItem()
        .title("Settings")
        .child(
          S.document()
            .schemaType("settings")
            .documentId("settings")
            .title("Settings"),
        )
        .icon(CogIcon),
      S.listItem()
        .title("About")
        .child(
          S.document().schemaType("about").documentId("about").title("About"),
        )
        .icon(DocumentTextIcon),
      S.listItem()
        .title("Home")
        .child(S.document().schemaType("home").documentId("home").title("Home"))
        .icon(DocumentTextIcon),
      S.listItem()
        .title("Work")
        .child(S.document().schemaType("work").documentId("work").title("Work"))
        .icon(ProjectsIcon),
    ]);
