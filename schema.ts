// Welcome to your schema
//   Schema driven development is Keystone's modus operandi
//
// This file is where we define the lists, fields and hooks for our data.
// If you want to learn more about how lists are configured, please read
// - https://keystonejs.com/docs/config/lists

//import { list } from '@keystone-6/core';
require('dotenv').config();

import { allowAll } from '@keystone-6/core/access';
//
// // see https://keystonejs.com/docs/fields/overview for the full list of fields
// //   this is a few common fields for an example
// import {
//   text,
//   relationship,
//   password,
//   timestamp,
//   select,
// } from '@keystone-6/core/fields';
//
// // the document field is a more complicated field, so it has it's own package
// import { document } from '@keystone-6/fields-document';
// // if you want to make your own fields, see https://keystonejs.com/docs/guides/custom-fields
//
// // when using Typescript, you can refine your types to a stricter subset by importing
// // the generated types from '.keystone/types'
// import type { Lists } from '.keystone/types';
//
// export const lists: Lists = {
//   User: list({
//     // WARNING
//     //   for this starter project, anyone can create, query, update and delete anything
//     //   if you want to prevent random people on the internet from accessing your data,
//     //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
//     access: allowAll,
//
//     // this is the fields for our User list
//     fields: {
//       // by adding isRequired, we enforce that every User should have a name
//       //   if no name is provided, an error will be displayed
//       name: text({ validation: { isRequired: true } }),
//
//       email: text({
//         validation: { isRequired: true },
//         // by adding isIndexed: 'unique', we're saying that no user can have the same
//         // email as another user - this may or may not be a good idea for your project
//         isIndexed: 'unique',
//       }),
//
//       password: password({ validation: { isRequired: true } }),
//
//       // we can use this field to see what Posts this User has authored
//       //   more on that in the Post list below
//       posts: relationship({ ref: 'Post.author', many: true }),
//
//       createdAt: timestamp({
//         // this sets the timestamp to Date.now() when the user is first created
//         defaultValue: { kind: 'now' },
//       }),
//     },
//   }),
//
//   Post: list({
//     // WARNING
//     //   for this starter project, anyone can create, query, update and delete anything
//     //   if you want to prevent random people on the internet from accessing your data,
//     //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
//     access: allowAll,
//
//     // this is the fields for our Post list
//     fields: {
//       title: text({ validation: { isRequired: true } }),
//
//       // the document field can be used for making rich editable content
//       //   you can find out more at https://keystonejs.com/docs/guides/document-fields
//       content: document({
//         formatting: true,
//         layouts: [
//           [1, 1],
//           [1, 1, 1],
//           [2, 1],
//           [1, 2],
//           [1, 2, 1],
//         ],
//         links: true,
//         dividers: true,
//       }),
//
//       // with this field, you can set a User as the author for a Post
//       author: relationship({
//         // we could have used 'User', but then the relationship would only be 1-way
//         ref: 'User.posts',
//
//         // this is some customisations for changing how this will look in the AdminUI
//         ui: {
//           displayMode: 'cards',
//           cardFields: ['name', 'email'],
//           inlineEdit: { fields: ['name', 'email'] },
//           linkToItem: true,
//           inlineConnect: true,
//         },
//
//         // a Post can only have one author
//         //   this is the default, but we show it here for verbosity
//         many: false,
//       }),
//
//       // with this field, you can add some Tags to Posts
//       tags: relationship({
//         // we could have used 'Tag', but then the relationship would only be 1-way
//         ref: 'Tag.posts',
//
//         // a Post can have many Tags, not just one
//         many: true,
//
//         // this is some customisations for changing how this will look in the AdminUI
//         ui: {
//           displayMode: 'cards',
//           cardFields: ['name'],
//           inlineEdit: { fields: ['name'] },
//           linkToItem: true,
//           inlineConnect: true,
//           inlineCreate: { fields: ['name'] },
//         },
//       }),
//     },
//   }),
//
//   // this last list is our Tag list, it only has a name field for now
//   Tag: list({
//     // WARNING
//     //   for this starter project, anyone can create, query, update and delete anything
//     //   if you want to prevent random people on the internet from accessing your data,
//     //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
//     access: allowAll,
//
//     // setting this to isHidden for the user interface prevents this list being visible in the Admin UI
//     ui: {
//       isHidden: true,
//     },
//
//     // this is the fields for our Tag list
//     fields: {
//       name: text(),
//       // this can be helpful to find out all the Posts associated with a Tag
//       posts: relationship({ ref: 'Post.tags', many: true }),
//     },
//   }),
// };

/*
Welcome to the schema! The schema is the heart of Keystone.

Here we define our 'lists', which will then be used both for the GraphQL
API definition, our database tables, and our Admin UI layout.

Some quick definitions to help out:
A list: A definition of a collection of fields with a name. For the starter
  we have `User`, `Post`, and `Tag` lists.
A field: The individual bits of data on your list, each with its own type.
  you can see some of the lists in what we use below.

*/

import { allowAll } from '@keystone-6/core/access';

// Like the `config` function we use in keystone.ts, we use functions
// for putting in our config so we get useful errors. With typescript,
// we get these even before code runs.
import { list } from '@keystone-6/core';
// We're using some common fields in the starter. Check out https://keystonejs.com/docs/apis/fields#fields-api
// for the full list of fields.
import {
  text,
  relationship,
  password,
  timestamp,
  select,
  image,
  integer
} from '@keystone-6/core/fields';
// The document field is a more complicated field, so it's in its own package
// Keystone aims to have all the base field types, but you can make your own
// custom ones.
import { document } from '@keystone-6/fields-document';

import { cloudinaryImage } from '@keystone-6/cloudinary';


// We are using Typescript, and we want our types experience to be as strict as it can be.
// By providing the Keystone generated `Lists` type to our lists object, we refine
// our types to a stricter subset that is type-aware of other lists in our schema
// that Typescript cannot easily infer.
import { Lists } from '.keystone/types';

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
        isIndexed: 'unique',
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
        initialColumns: ['name', 'posts'],
      },
    },
  }),
  Activity: list({
    access: allowAll,
    fields: {
      title: text({
        validation: { isRequired: true }
      }),
      activityItemHeading: relationship({ ref: 'ActivityItemHeading', many: true }),
      //tag: relationship({ ref: 'Tag.activity', many: false }),
      faq: relationship({ ref: 'Faq', many: true })
    }
  }),
  ActivityItemHeading: list({
    access: allowAll,

    fields: {
      title: text({
        validation: { isRequired: true }
      }),
      activityItems: relationship({ ref: 'ActivityItem', many: true }),
    }
  }),
  ActivityItem: list({
    access: allowAll,

    fields: {
      title: text({
        validation: { isRequired: true }
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
        validation: { isRequired: true }
      }),
      anchor: text({
        validation: { isRequired: true }
      }),

      images: relationship({ ref: 'Image', many: true,  ui: {
             displayMode:'cards',
             cardFields: ['image', 'name', 'altText'],
             inlineEdit: { fields: ['image', 'name', 'altText'] },
             linkToItem: true,
             inlineConnect: true,
             inlineCreate: { fields: ['image', 'name', 'altText'] },
           }}),
         price: text({
           validation: { isRequired: true }
         }),
         duration: text({
           validation: { isRequired: true }
         })
    }
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
        })
    }
  }),
  ServiceItem: list({
    access: allowAll,

    fields: {
      title: text({
        validation: { isRequired: true }
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

      images: relationship({ ref: 'Image', many: true,  ui: {
             displayMode:'cards',
             cardFields: ['image', 'name', 'altText'],
             inlineEdit: { fields: ['image', 'name', 'altText'] },
             linkToItem: true,
             inlineConnect: true,
             inlineCreate: { fields: ['image', 'name', 'altText'] },
           }}),
         price: text({
           validation: { isRequired: true }
         })
    }
  }),
  Service: list({
    access: allowAll,

    ui: {
      label: 'Services',
      path: 'services',
    },
    isSingleton: true,

    fields: {
      title: text({
        validation: { isRequired: true }
      }),
      serviceItems:relationship({ ref: 'ServiceItem', many: true})

    }
  }),
  Home: list({
    access: allowAll,

    ui: {
      label: 'Home',
      path: 'home',
    },
    isSingleton: true,

      fields: {

      homeTours: relationship({ ref: 'HomeTour', many: true, ui:{
          hideCreate: true
      }})

    }
  }),

  HomeTour:list({
    access: allowAll,
      ui: {
         description: 'Add a name for the Home page items'
      },

      fields: {
        name:text(),
        homeTour: relationship({ ref: 'ActivityItem', many: false,ui:{
            hideCreate: true,

        }})
      },

  }),

  About: list({
    access: allowAll,

    ui: {
      label: 'About',
      path: 'about'
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
      guidesInfo1: document({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1],
        ],
        links: false,
        dividers: true,
      }),
      guides:relationship({ ref: 'Guide', many: true,  ui: {
        displayMode:'cards',
        cardFields: ['image', 'title', 'name', 'description', 'altText','displayIndex'],
        inlineEdit: { fields: ['image', 'title', 'name', 'description', 'altText', 'displayIndex'] },
        linkToItem: true,
        inlineConnect: true,
        inlineCreate: { fields: ['image','title', 'name', 'description', 'altText', 'displayIndex'] }
      }}),
      affiliations: relationship({ ref: 'Image', many: true,  ui: {
             displayMode:'cards',
             cardFields: ['image', 'name', 'altText'],
             inlineEdit: { fields: ['image', 'name', 'altText'] },
             linkToItem: true,
             inlineConnect: true,
             inlineCreate: { fields: ['image', 'name', 'altText'] },
           }})
    },
    isSingleton: true

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
          db: { map: 'display_index' },
          validation: {
            isRequired: true,
          }
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
            max: 240
          }
        },
      })
    }
  }),
  Faq: list({
    access: allowAll,
    ui: {
      labelField: 'question'
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
    }
  }),


  // Our second list is the Posts list. We've got a few more fields here
  // so we have all the info we need for displaying posts.
  // Post: list({
  //   fields: {
  //     title: text(),
  //     // Having the status here will make it easy for us to choose whether to display
  //     // posts on a live site.
  //     status: select({
  //       options: [
  //         { label: 'Published', value: 'published' },
  //         { label: 'Draft', value: 'draft' },
  //       ],
  //       // We want to make sure new posts start off as a draft when they are created
  //       defaultValue: 'draft',
  //       // fields also have the ability to configure their appearance in the Admin UI
  //       ui: {
  //         displayMode: 'segmented-control',
  //       },
  //     }),
  //     // The document field can be used for making highly editable content. Check out our
  //     // guide on the document field https://keystonejs.com/docs/guides/document-fields#how-to-use-document-fields
  //     // for more information
  //     content: document({
  //       formatting: true,
  //       layouts: [
  //         [1, 1],
  //         [1, 1, 1],
  //         [2, 1],
  //         [1, 2],
  //         [1, 2, 1],
  //       ],
  //       links: true,
  //       dividers: true,
  //     }),
  //     publishDate: timestamp(),
  //     // Here is the link from post => author.
  //     // We've configured its UI display quite a lot to make the experience of editing posts better.
  //     author: relationship({
  //       ref: 'User.posts',
  //       ui: {
  //         displayMode: 'cards',
  //         cardFields: ['name', 'email'],
  //         inlineEdit: { fields: ['name', 'email'] },
  //         linkToItem: true,
  //         inlineConnect: true,
  //       },
  //     }),
      // We also link posts to tags. This is a many <=> many linking.
  //     tags: relationship({
  //       ref: 'Tag.posts',
  //       ui: {
  //         displayMode: 'cards',
  //         cardFields: ['name'],
  //         inlineEdit: { fields: ['name'] },
  //         linkToItem: true,
  //         inlineConnect: true,
  //         inlineCreate: { fields: ['name'] },
  //       },
  //       many: true,
  //     }),
  //   },
  // }),
  // Our final list is the tag list. This field is just a name and a relationship to posts
  // Tag: list({
  //   access: allowAll,
  //
  //   ui: {
  //     isHidden: true,
  //   },
  //   fields: {
  //     name: text(),
  //     activity: relationship({ ref: 'Activity.title', many: false })
  //   }
  // }),
};
