import nodemailer from 'nodemailer'

export interface ISendCodeResponse {
    success: boolean;
    data?: string;
}


const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
    }
});

const generateString = (length: number) => {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    let result = "";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result
}


const sendCode = async (to: string): Promise<ISendCodeResponse> => {
    const code = generateString(4);
    const result = await send(to, "Код безопасности", code)
    if (result.success == false) return { success: false }

    return { success: true, data: code }
}

const send = async (to: string, subject: string, msg: string) => {
    try {
        const info = await transporter.sendMail({
            from: "financetestme@gmail.com",
            to,
            subject,
            html: `<div>${msg}</div>`,
        });

        return { success: true, data: info }
    } catch (e) {
        return { success: false, error: e }
    }
}

export {
    send, sendCode
}