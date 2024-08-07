require("dotenv").config();

import { allowAll } from "@keystone-6/core/access";

import { list } from "@keystone-6/core";
// We're using some common fields in the starter. Check out https://keystonejs.com/docs/apis/fields#fields-api
// for the full list of fields.
import {
  text,
  relationship,
  password,
  timestamp,
  select,
  image,
  integer,
  calendarDay,
} from "@keystone-6/core/fields";
// The document field is a more complicated field, so it's in its own package
// Keystone aims to have all the base field types, but you can make your own
// custom ones.
import { document } from "@keystone-6/fields-document";

import { cloudinaryImage } from "@keystone-6/cloudinary";

// We are using Typescript, and we want our types experience to be as strict as it can be.
// By providing the Keystone generated `Lists` type to our lists object, we refine
// our types to a stricter subset that is type-aware of other lists in our schema
// that Typescript cannot easily infer.
import { Lists } from ".keystone/types";

// We have a users list, a blogs list, and tags for blog posts, so they can be filtered.
// Each property on the exported object will become the name of a list (a.k.a. the `listKey`),
// with the value being the definition of the list, including the fields.
export const lists: Lists = {
  // Here we define the user list.
  User: list({
    access: allowAll,

    // Here are the fields that `User` will have. We want an email and password so they can log in
    // a name so we can refer to them, and a way to connect users to posts.
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({
        validation: { isRequired: true },
        isIndexed: "unique",
        isFilterable: true,
      }),
      // The password field takes care of hiding details and hashing values
      password: password({ validation: { isRequired: true } }),
      // Relationships allow us to reference other lists. In this case,
      // we want a user to have many posts, and we are saying that the user
      // should be referencable by the 'author' field of posts.
      // Make sure you read the docs to understand how they work: https://keystonejs.com/docs/guides/relationships#understanding-relationships
      //posts: relationship({ ref: 'Post.author', many: true }),
    },
    // Here we can configure the Admin UI. We want to show a user's name and posts in the Admin UI
    ui: {
      listView: {
        initialColumns: ["name", "posts"],
      },
    },
  }),
  Activity: list({
    access: allowAll,
    fields: {
      title: text({
        validation: { isRequired: true },
      }),
      activityItemHeading: relationship({
        ref: "ActivityItemHeading",
        many: true,
      }),
      faq: relationship({ ref: "Faq", many: true }),
    },
  }),
  ActivityItemHeading: list({
    access: allowAll,

    fields: {
      title: text({
        validation: { isRequired: true },
      }),
      activityItems: relationship({ ref: "ActivityItem", many: true }),
    },
  }),
  ActivityItem: list({
    access: allowAll,

    fields: {
      title: text({
        validation: { isRequired: true },
      }),
      content: document({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1],
        ],
        links: true,
        dividers: true,
      }),
      tab: text({
        validation: { isRequired: true },
      }),
      anchor: text({
        validation: { isRequired: true },
      }),

      images: relationship({
        ref: "Image",
        many: true,
        ui: {
          displayMode: "cards",
          cardFields: ["image", "name", "altText"],
          inlineEdit: { fields: ["image", "name", "altText"] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ["image", "name", "altText"] },
        },
      }),
      price: text({
        validation: { isRequired: true },
      }),
      duration: text({
        validation: { isRequired: true },
      }),
    },
  }),
  Image: list({
    access: allowAll,

    fields: {
      name: text({
        validation: {
          isRequired: true,
        },
      }),
      altText: text(),
      image: cloudinaryImage({
        cloudinary: {
          cloudName: process.env.CLOUDINARY_CLOUD_NAME,
          apiKey: process.env.CLOUDINARY_API_KEY,
          apiSecret: process.env.CLOUDINARY_API_SECRET,
          folder: process.env.CLOUDINARY_API_FOLDER,
        },
      }),
    },
  }),
  ServiceItem: list({
    access: allowAll,

    fields: {
      title: text({
        validation: { isRequired: true },
      }),
      content: document({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1],
        ],
        links: true,
        dividers: true,
      }),

      images: relationship({
        ref: "Image",
        many: true,
        ui: {
          displayMode: "cards",
          cardFields: ["image", "name", "altText"],
          inlineEdit: { fields: ["image", "name", "altText"] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ["image", "name", "altText"] },
        },
      }),
      price: text({
        validation: { isRequired: true },
      }),
    },
  }),
  Service: list({
    access: allowAll,

    ui: {
      label: "Services",
      path: "services",
    },
    isSingleton: true,

    fields: {
      title: text({
        validation: { isRequired: true },
      }),
      serviceItems: relationship({ ref: "ServiceItem", many: true }),
    },
  }),
  Home: list({
    access: allowAll,

    ui: {
      label: "Home",
      path: "home",
    },
    isSingleton: true,

    fields: {
      homeTours: relationship({
        ref: "HomeTour",
        many: true,
        ui: {
          hideCreate: true,
        },
      }),
    },
  }),

  HomeTour: list({
    access: allowAll,
    ui: {
      description: "Add a name for the Home page items",
    },

    fields: {
      name: text(),
      homeTour: relationship({
        ref: "ActivityItem",
        many: false,
        ui: {
          hideCreate: true,
        },
      }),
    },
  }),

  About: list({
    access: allowAll,

    ui: {
      label: "About",
      path: "about",
    },
    fields: {
      title: text({
        validation: {
          isRequired: true,
        },
      }),
      content: document({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1],
        ],
        links: true,
        dividers: true,
      }),
      guidesInfo: document({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1],
        ],
        links: true,
        dividers: true,
      }),
      guides: relationship({
        ref: "Guide",
        many: true,
        ui: {
          displayMode: "cards",
          cardFields: [
            "image",
            "title",
            "name",
            "description",
            "altText",
            "displayIndex",
          ],
          inlineEdit: {
            fields: [
              "image",
              "title",
              "name",
              "description",
              "altText",
              "displayIndex",
            ],
          },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: {
            fields: [
              "image",
              "title",
              "name",
              "description",
              "altText",
              "displayIndex",
            ],
          },
        },
      }),
      affiliations: relationship({
        ref: "Image",
        many: true,
        ui: {
          displayMode: "cards",
          cardFields: ["image", "name", "altText"],
          inlineEdit: { fields: ["image", "name", "altText"] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ["image", "name", "altText"] },
        },
      }),
    },
    isSingleton: true,
  }),

  Guide: list({
    access: allowAll,

    fields: {
      name: text({
        validation: {
          isRequired: true,
        },
      }),
      title: text({
        validation: {
          isRequired: true,
        },
      }),
      displayIndex: integer({
        defaultValue: 0,
        db: { map: "display_index" },
        validation: {
          isRequired: true,
        },
      }),
      altText: text(),
      image: cloudinaryImage({
        cloudinary: {
          cloudName: process.env.CLOUDINARY_CLOUD_NAME,
          apiKey: process.env.CLOUDINARY_API_KEY,
          apiSecret: process.env.CLOUDINARY_API_SECRET,
          folder: process.env.CLOUDINARY_API_FOLDER,
        },
      }),
      description: text({
        validation: {
          isRequired: true,
          length: {
            max: 240,
          },
        },
      }),
    },
  }),
  Faq: list({
    access: allowAll,
    ui: {
      labelField: "question",
    },

    fields: {
      question: text({
        validation: {
          isRequired: true,
        },
      }),
      answer: text({
        validation: {
          isRequired: true,
        },
      }),
    },
  }),
  IndemnityFormText: list({
    access: allowAll,
    ui: {
      labelField: "content",
      path: "indemnityformtext",
    },

    fields: {
      content: document({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1],
        ],
        links: true,
        dividers: true,
      }),
    },
    isSingleton: true,
  }),
  Indemnity: list({
    access: allowAll,
    ui: {
      labelField: "firstName",
    },

    fields: {
      firstName: text({
        validation: {
          isRequired: true,
        },
      }),
      lastName: text({
        validation: {
          isRequired: true,
        },
      }),
      indemnityPdfUrl: text({
        validation: {
          isRequired: true,
        },
      }),
      date: timestamp({
        defaultValue: "1970-01-01T00:00:00.000Z",
        db: { map: "datetimestamp" },
        validation: { isRequired: true },
      }),
    },
  }),
};
