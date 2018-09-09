const db = require("../models");
const sgMail = require('@sendgrid/mail');
const swearJar = require("swearjar")

const key = '// your api key //'
sgMail.setApiKey(key);

exports.verify = function(req, res, next){
  db.User.findOne({hash: req.params.hash})
  .then((user)=>{
    console.log(user)
    if(user && (req.params.hash === user.hash)){
      user.emailValidated = true;
      user.save()
      return res.json({"Status": "successful!"})
    } else{
      return res.json({"Status": "could not find user"})
    }
  })
  .catch(err => {
    return next(err)
  })
}

exports.sendVerification = function(userEmail, userHash, fname, lname){
  return new Promise((resolve, reject) => {
    const link = `http://localhost:8081/api/email/verify/${userHash}`
    const msgVerify = {
      to: `${userEmail}`,
      from: 'confirmEmail@noreplyemail.com',
      subject: 'Email Confirmation',
      text: `Someone recently used this email to sign up for an account.
      If you are ${fname} ${lname} , please verify your email by clicking on the link below`,
      html: `<p>Some recently used this email to sign up for an account.
      Please verify your email by clicking on the link below</p>
      <a href="${link}"> Confirm! </a>`
    };
    sgMail.send(msgVerify);
    console.log(`verification email sent to ${userEmail}`)
    resolve();
  })
}

exports.sendReport = function(req, res, next){
  const message = swearJar.censor(req.body.message)
  const msgVerify2 = {
    to: `${req.body.recipientEmail}`,
    from: 'ureport@noreplyemail.com',
    subject: 'uReport: A Student Has Something to Report',
    text: `A student at your school, ${req.body.school}, has used our services
    to report something to you. The problem is ${req.body.problem}. Here is the student message:
    ${req.body.message}. If you are not ${req.body.recipientName}, please disregard this message.
    Sorry for the inconvenience`,
    html: `<h3> A student at your school, ${req.body.school}, has used our services
    to report something to you. </h3>
    <p> The reported problem is <em>${req.body.problem}</em>. Here is the student message: </p>
    <p>${message}</p>
    <p> If you are not <em>${req.body.recipientName}</em>, please disregard this message.
    Sorry for the inconvenience </p>`
  };
  sgMail.send(msgVerify2);
  return res.json({"Status": "Message Sent"})
}
