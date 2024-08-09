import { transport } from "../pdf/nodeMailerConfig";
import { ISendContactFormData } from "../types/ISendContactFormData";

export const sendContactForm = (data: ISendContactFormData, res: any) => {
  try {
    transport
      .sendMail({
        from: data.email,
        replyTo: data.email,
        to: `${process.env.TO_MAIL}`,
        subject: `Customer request: ${data.subject}`,
        html: `<p><strong>Name:</strong> ${data.name}</>
         <p><strong>Email:</strong> ${data.email}</p>
         <p><strong>Date:</strong> ${data.date}</p>
         <p><strong>Transport needed:</strong> ${data.isTransportNeeded}</p>
         <p><strong>Is date flexible:</strong> ${data.isFlexibleDate}</p>
         <p><strong>Number of people:</strong> ${data.numberOfPeople}</p>
         <p><strong>Phone:</strong> ${data.phone}</p>
         <p><strong>Address:</strong> ${data.address}</p>
         <p><strong>Message:</strong> ${data.message}</p>`,
      })
      .catch((err: any) => console.log("err", err));
    res.json({ message: "success" });
  } catch (err) {
    res.send(err);
  }
};
