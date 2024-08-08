const cloudinary = require("cloudinary").v2;
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { createIndemnity } from "../mutations/createIndemnity";
import moment from "moment";

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

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  folder: process.env.CLOUDINARY_API_FOLDER,
});

export const uploadPdf = async (pdfPath: string, req: any) => {
  cloudinary.uploader
    .upload(pdfPath, {
      folder: process.env.CLOUDINARY_API_FOLDER,
      use_filename: true,
    })
    .then(async (result: any) => {
      client
        .mutate({
          mutation: createIndemnity(),
          variables: {
            data: {
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              indemnityPdfUrl: result.url,
              date: moment().format(),
            },
          },
        })
        .then((result) => {
          console.log("res > ", result);
        })
        .catch((error) => {
          console.log(error);
        });
    });
};
