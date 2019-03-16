import * as nodemailer from "nodemailer";

let config = require('../config/email');

let ejs = require("ejs");

const path = require('path') ; 

class Mail {

    constructor(
        public to?: string,
        public data?: object,
        public subject?: string,
        public message?: string) { }


    sendMail() :Promise<boolean>{

        return new Promise<boolean>( (resolve) => { 

            ejs.renderFile(  path.join(__dirname, '../resources/views/email/'+this.message ) , this.data , (err, data) => {
              
                if (err) {
                        console.log( err )
                    
                    return resolve( false ) ;
                } else {
                    let mailOptions = {
                        from: config.from,
                        to: this.to,
                        subject: this.subject,
                        html: data
                    };

                    const transporter = nodemailer.createTransport({
                        host: config.host,
                        port: config.port,
                        //secure: false,
                        ignoreTLS: true,/*
                        auth: {
                            user: config.user,
                            pass: config.password
                        },*/
                        //tls: { rejectUnauthorized: false }
                    });

                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                        console.log( error )
                            return resolve( false ) ;
                        } else {
                            return resolve( true ) ; 
                        }
                    });
                }
            });
        });

    }

}

export default new Mail;