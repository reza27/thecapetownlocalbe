import { ISendEmailPdfData } from "../types/ISendEmailPdfData";
import { transport } from "./nodeMailerConfig";

export const sendMailWithPdf = (data: ISendEmailPdfData, res: any) => {
  try {
    transport
      .sendMail({
        from: process.env.MAIL_USER,
        to: data.toUserEmail,
        subject: `Thank you for completing our digital form - The Cape Town Local`,
        attachments: [
          {
            filename: `${data.firstName}_indemnity_form.pdf`,
            path: data.pdfPath,
            contentType: "application/pdf",
          },
        ],
        html: `<p>Hi ${data.firstName} ${data.lastName}</>
       <p>Thank you for choosing the Cape Town Local. We hope you enjoy your experience with us. <br/> Please find your copy of the indemnity form attached.</p>`,
      })
      .catch((err: any) => console.log("err", err));

    res.json({
      message: "Indemnity success",
      isSuccess: true,
    });
  } catch (err) {
    res.send(err);
  }
};
