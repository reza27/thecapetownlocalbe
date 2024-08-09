require("dotenv").config();

import { config } from "@keystone-6/core";

// Look in the schema file for how we define our lists, and how users interact with them through graphql or the Admin UI
import { lists } from "./schema";

// Keystone auth is configured separately - check out the basic auth setup we are importing from our auth file.
import { withAuth, session } from "./auth";

const publicPageRoutes = ["/reset"];

import bodyParser from "body-parser";
import fetch from "cross-fetch";

import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { createPdf } from "./lib/pdf/createPdf";
import { getIndemnityText } from "./lib/queries/getIndemnityText";
import { slateToHtml } from "@slate-serializers/html";
import { uploadPdf } from "./lib/pdf/uploadPdf";
import { sendMailWithPdf } from "./lib/pdf/sendPdf";
import { ISendEmailPdfData } from "./lib/types/ISendEmailPdfData";
import { ISendContactFormData } from "./lib/types/ISendContactFormData";
import { sendContactForm } from "./lib/contact/sendContactFrom";

const endpoint =
  process.env.APP_ENV === "production"
    ? `${process.env.PROD_URL}/api/graphql`
    : `${process.env.LOCAL_URL}/api/graphql`;

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: endpoint,
    fetch,
  }),
  defaultOptions: {
    query: {
      fetchPolicy: "no-cache",
    },
  },
});

export default withAuth(
  // Using the config function helps typescript guide you to the available options.
  config({
    // the db sets the database provider - we're using sqlite for the fastest startup experience

    db: {
      provider: "postgresql",
      url: `${process.env.DATABASE_URL}`,
      onConnect: async (context) => {
        /* ... */
      },
      // Optional advanced configuration
      enableLogging: true,
      useMigrations: true,
      idField: { kind: "uuid" },
    },

    // This config allows us to set up features of the Admin UI https://keystonejs.com/docs/apis/config#ui
    ui: {
      // For our starter, we check that someone has session data before letting them see the Admin UI.
      isAccessAllowed: (context) => !!context.session?.data,
      publicPages: ["/reset"],
    },

    lists,
    session,
    server: {
      cors: {
        origin: [
          "http://localhost:3001",
          "https://thecapetownlocalfe-production.up.railway.app",
          "https://stage.thecapetownlocal.com",
          "https://www.thecapetownlocal.com",
        ],
        credentials: true,
      },
      extendExpressApp: (app, createContext) => {
        app.use(bodyParser.json()); // to support JSON-encoded bodies
        app.use(
          bodyParser.urlencoded({
            // to support URL-encoded bodies
            extended: true,
          })
        );
        app.post("/api/mail", async (req, res) => {
          const data: ISendContactFormData = {
            email: req.body.email,
            subject: req.body.subject,
            name: req.body.name,
            date: req.body.date,
            isTransportNeeded: req.body.isTransportNeeded,
            isFlexibleDate: req.body.isFlexibleDate,
            numberOfPeople: req.body.numberOfPeople,
            phone: req.body.phone,
            address: req.body.address,
            message: req.body.message,
          };

          sendContactForm(data, res);
        });
        app.post("/api/indemnity", (req, res) => {
          try {
            client
              .query({
                query: getIndemnityText(),
              })
              .then(async (result) => {
                const serializedToHtml = slateToHtml(
                  result.data.indemnityFormText?.content?.document
                );
                await createPdf(req, serializedToHtml).then((pdfPath) => {
                  uploadPdf(pdfPath, req).then(() => {
                    const data: ISendEmailPdfData = {
                      toUserEmail: req.body.email,
                      pdfPath: pdfPath,
                      firstName: req.body.firstName,
                      lastName: req.body.lastName,
                    };

                    sendMailWithPdf(data, res);
                  });
                });
              })
              .catch((error) => {
                console.log(error);
              });
          } catch (err) {
            console.log("pdf upload error > " + err);

            res.send(err);
          }
        });
      },
    },

    storage: {
      local_images: {
        // Images that use this store will be stored on the local machine
        kind: "local",
        // This store is used for the image field type
        type: "image",
        // The URL that is returned in the Keystone GraphQL API
        generateUrl: (path) =>
          `${
            process.env.NODE_ENV === "production"
              ? process.env.PROD_URL + process.env.RAILWAY_VOLUME_MOUNT_PATH
              : process.env.ASSET_BASE_URL + "/images"
          }${path}`,
        // The route that will be created in Keystone's backend to serve the images
        serverRoute: {
          path: `${
            process.env.NODE_ENV === "production"
              ? process.env.RAILWAY_VOLUME_MOUNT_PATH
              : "/images"
          }`,
        },
        // Set serverRoute to null if you don't want a route to be created in Keystone
        // serverRoute: null
        storagePath: `${
          process.env.NODE_ENV === "production"
            ? process.env.RAILWAY_VOLUME_MOUNT_PATH
            : "public/images"
        }`,
      },
      /** more storage */
    },
  }) as KeystoneConfig<BaseKeystoneTypeInfo>
);
