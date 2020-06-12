const db = require("../models");
const sgMail = require('@sendgrid/mail');
const swearJar = require("swearjar")
const jwt = require("jsonwebtoken")

const key = ''
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
    const link = `https://ureport-server.herokuapp.com/api/email/verify/${userHash}`
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

exports.sendWarning = async function(req, res, next){
    console.log("you reached the warning function")
    db.User.findOne({hash: req.params.hash})
    .then((user)=>{
      if(!user.hasBeenWarned){
        const warn = {
          to: `${user.email}`,
          from: 'ureport@noreplyemail.com',
          subject: 'Warning: one of your reports has been flagged',
          text: `Students can make mistakes. That's ok. You made a mistake with this last report.
          The teacher you sent the report to thought it was either innapropriate or obviously false.
          You've been warned. You're now prone to being banned. Please be careful with future reports.`,
          html: `<p>Students can make mistakes. That's ok. You made a mistake with this last report.
          The teacher you sent the report to thought it was either innapropriate or obviously false.
          You've been warned. You're now prone to being banned. Please be careful with future reports.</p>`
        };
        sgMail.send(warn);
        user.hasBeenWarned = true;
        user.save()
        return res.redirect("https://google.com")
      }
    }).catch((e)=>{
        console.log(e)
        return res.redirect("https://google.com")
    })
}

sendNotification = async function(recipientEmail, message, teacherName){
  return new Promise((resolve, reject) => {
  const notify = {
    to: `${recipientEmail}`,
    from: 'ureport@noreplyemail.com',
    subject: 'You Just Sent a Report',
    text: `You successfully sent a report to ${teacherName} using our service.
     Here is your message: ${message}   `,
    html: `<p>You successfully sent a report to ${teacherName} using our service.
     Here is your message:  </p>
     <p><em> ${message} </em> </p>`
  };
  sgMail.send(notify);
  resolve()
  })
}

exports.sendReport = async function(req, res, next){
  try {
    console.log("reached report function")
    let token = jwt.decode(req.headers.authorization.split(' ')[1])
    let teacher = await db.Teacher.findById(req.body.teacher)
    req.body.user = token._id;
    req.body.recipientName = teacher.name;
    req.body.recipientEmail = teacher.email;
    let user = await db.User.findById(req.body.user)
    let school = await db.School.findById(user.school)
    req.body.school = school.name;
    db.Message.create(req.body)
    const reportLink = `https://ureport-server.herokuapp.com/api/email/warning/${user.hash}`
    req.body.message = swearJar.censor(req.body.message)
    req.body.problem = swearJar.censor(req.body.problem)
        const report = {
          to: `${req.body.recipientEmail}`,
          from: 'ureport@noreplyemail.com',
          subject: 'uReport: A Student Has Something to Report',
          text: `A student at your school, ${req.body.school}, has used our services
          to report something to you. The problem is ${req.body.problem}. Here is the student message:
          ${req.body.message}. We recommend that you monitor the specified problem to catch students in the act.
          We do not recommend punishing students based off this report. Please use disgression with any decisions.
          If this report was innapropiate or obviously false, please click on the link  to flag it.
          Flag Report If you are not ${req.body.recipientName}, please disregard this message.
          Sorry for the inconvenience`,
          html: `<h3> A student at your school, ${req.body.school}, has used our services
          to report something to you. </h3>
          <p> The reported problem is <em>${req.body.problem}</em>. Here is the student message: </p>
          <p>${req.body.message}</p>
          <p> We recommend that you monitor the specified problem to catch students in the act.
          We do not recommend punishing students based off this report. Please use disgression with any decisions.
           If this report was innapropiate or obviously false, please click on the link  to flag it.
          <a href="${reportLink}">Flag Report</a></p>
          <p> If you are not <em>${req.body.recipientName}</em>, please disregard this message.
          Sorry for the inconvenience </p>`
        };
        console.log("just about to send the report")
        sgMail.send(report);
      await sendNotification(user.email, req.body.message, req.body.recipientName)
      user.date = Date.now()
      user.save()
        return res.json({"Status": "Message Sent"})
  } catch(e){
    console.log(e)
    return res.status(400).json({"Message":"Failure in report"})
  }

}
