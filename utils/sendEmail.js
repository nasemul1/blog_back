import nodemailer from 'nodemailer';

const sendEmail = async ({ emailTo, subject, code, content }) => {

    const senderEmail = process.env.SENDER_EMAIL;
    const senderPass = process.env.SENDER_PASSWORD;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: senderEmail,
        pass: senderPass,
      },
    });
  
    const message = {
      to: emailTo,
      subject,
      html: `
          <div>
            <h3>Use this bellow code to ${content}</h3>
            <p><strong>Code: </strong> ${code}</p>
          </div>
        `,
    };
  
    await transporter.sendMail(message);

  };
  
  export default sendEmail;