import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer'
import { brotliDecompressSync } from "zlib";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: { 
      user: "d3317f1119f994",
      pass: "1d679448b557c3",
    },
  });

export class NodeMailerMailAdapter implements MailAdapter {
    async sendMail({subject, body}: SendMailData){
        await transport.sendMail({
            from: 'Equipe FeedGet <oi@feedget.com>',
            to: 'Filipe Lima <cimofelipe4@gmail.com>',
            subject,
            html: body,
        })
      
    };
}