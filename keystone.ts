// // Welcome to Keystone!
// //
// // This file is what Keystone uses as the entry-point to your headless backend
// //
// // Keystone imports the default export of this file, expecting a Keystone configuration object
// //   you can find out more at https://keystonejs.com/docs/apis/config
//
// import { config } from '@keystone-6/core';
//
// // to keep this file tidy, we define our schema in a different file
// import { lists } from './schema';
//
// // authentication is configured separately here too, but you might move this elsewhere
// // when you write your list-level access control functions, as they typically rely on session data
// import { withAuth, session } from './auth';
//
// export default withAuth(
//   config({
//     db: {
//       // we're using sqlite for the fastest startup experience
//       //   for more information on what database might be appropriate for you
//       //   see https://keystonejs.com/docs/guides/choosing-a-database#title
//       provider: 'sqlite',
//       url: 'file:./keystone.db',
//     },
//     lists,
//     session,
//   })
// );
/*
Welcome to Keystone! This file is what keystone uses to start the app.

It looks at the default export, and expects a Keystone config object.

You can find all the config options in our docs here: https://keystonejs.com/docs/apis/config
*/
require('dotenv').config();

import { config } from '@keystone-6/core';

// Look in the schema file for how we define our lists, and how users interact with them through graphql or the Admin UI
import { lists } from './schema';

// Keystone auth is configured separately - check out the basic auth setup we are importing from our auth file.
import { withAuth, session } from './auth';

const publicPageRoutes = ["/reset"];

const nodemailer = require("nodemailer");
const user = "stackinteractiveblog@gmail.com"
const pass = "donipoapwhizfssi";

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});
import bodyParser from 'body-parser';



// const {
//   // The S3 Bucket Name used to store assets
//   S3_BUCKET_NAME: bucketName = 'keystone-test',
//   // The region of the S3 bucket
//   S3_REGION: region = 'ap-southeast-2',
//   // The Access Key ID and Secret that has read/write access to the S3 bucket
//   S3_ACCESS_KEY_ID: accessKeyId = 'keystone',
//   S3_SECRET_ACCESS_KEY: secretAccessKey = 'keystone',
//   // The base URL to serve assets from
//   ASSET_BASE_URL: baseUrl = 'http://localhost:3000',
// } = process.env;

export default withAuth(
  // Using the config function helps typescript guide you to the available options.
  config({
    // the db sets the database provider - we're using sqlite for the fastest startup experience
    db: {
      provider: 'sqlite',
      url: 'file:./keystone.db',
      // provider: 'postgresql',
      // url: 'postgres://postgres:@localhost:5432/thecptlocal',
      // onConnect: async context => { /* ... */ },
      // // Optional advanced configuration
      // enableLogging: true,
      // useMigrations: true,
      // idField: { kind: 'uuid' }
    },
    // graphql: {
    //    debug: true,
    //    path: '/api/graphql',
    //    apolloConfig: {
    //      debug: true,
    //      /* ... */
    //    },
    //  },
    // This config allows us to set up features of the Admin UI https://keystonejs.com/docs/apis/config#ui
    // ui: {
    //   // For our starter, we check that someone has session data before letting them see the Admin UI.
    //   isAccessAllowed: (context) => !!context.session?.data,
    //   publicPages:['reset-password']
    // },

    lists,
    session,
     server: {
       cors: {
         origin: ['http://localhost:3001','https://thecapetownlocal-fe.herokuapp.com',
         "https://thecapetownlocalfe-production.up.railway.app"],
         credentials: true
        },
       extendExpressApp: (app, createContext) => {
         app.use( bodyParser.json() );       // to support JSON-encoded bodies
         app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
           extended: true
         }));
         app.post('/api/mail', async (req, res) => {
           try {
             transport.sendMail({
             from: req.body.email,
             replyTo: req.body.email,
             to: 'stackinteractiveblog@gmail.com',
             subject: `Customer request: ${req.body.subject}` ,
             html: `<p><strong>Name:</strong> ${req.body.name}</>
                 <p><strong>Email:</strong> ${req.body.email}</p>
                 <p><strong>Date:</strong> ${req.body.date}</p>
                 <p><strong>Transport needed:</strong> ${req.body.transportNeeded}</p>
                 <p><strong>Phone:</strong> ${req.body.phone}</p>
                 <p><strong>Address:</strong> ${req.body.address}</p>
                 <p><strong>Message:</strong> ${req.body.message}</p>`,
               }).catch(err => console.log('nodem',err));
               res.json({message:'success'});
           }
           catch(err) {
               res.send(err);
           }
         });
       },
     },

    storage: {
      local_images: {
        // Images that use this store will be stored on the local machine
        kind: 'local',
        // This store is used for the image field type
        type: 'image',
        // The URL that is returned in the Keystone GraphQL API
        //generateUrl: path => process.env.NODE_ENV==='production'?`/images${path}`:`${process.env.ASSET_BASE_URL}/images${path}`,
        generateUrl: path => `${process.env.PROD_URL}/images${path}`,
        // The route that will be created in Keystone's backend to serve the images
        serverRoute: {
          path: '/images',
        },
        // Set serverRoute to null if you don't want a route to be created in Keystone
        // serverRoute: null
        storagePath: 'public/images',
      },
      /** more storage */
    },
    ui: {
      isAccessAllowed: ({ req, session }) => {
        // don't check access for public pages
        console.log('url', (req as any)?.originalUrl)
        //if(publicPageRoutes.some(x => x.includes((req as any)?.originalUrl))) {
        if (publicPageRoutes.includes((req as any)?.originalUrl)) {
          return true;
        }

        // allow all logged in users
        return !!session?.data;

        // only allow admins
        // return !!session?.data?.isAdmin;
      }
    }

  })as KeystoneConfig<BaseKeystoneTypeInfo>
);
