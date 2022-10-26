const nodemailer = require('nodemailer')
const config = require('config')
const mailAdmin = 'issuetracker@gmail.com'

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: config.get('MAIL_USERNAME'),
        pass: config.get('MAIL_PASSWORD'),
        clientId: config.get('OAUTH_CLIENT_ID'),
        clientSecret: config.get('OAUTH_CLIENT_SECRET'),
        refreshToken: config.get('OAUTH_REFRESH_TOKEN')

    }
})

let sendFirstTimeLoginLink = async (token,secret, email, name)=>{
    // the link will be to a server generated change password page
    // pass the token n the secret to the href in the link
    let content = `<b>
        <p>Dear ${name}</p>
        <p>Click the link to login. The link expires in 1 hour</p>
        <a href='#'>Link</a>  
        <p>token = ${token}</p>
        <p>secret = ${secret}</p>
    </b>`

    let mailOptions = {
        from: mailAdmin,
        to: email,
        subject: 'First time login link',
        html: content
    }

    transporter.sendMail(mailOptions, (err,data)=>{
        if(err){
            console.error(err.message)
        }
       
    })

}
module.exports = {
    sendFirstTimeLoginLink,
}