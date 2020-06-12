# ureport
## Anonymous Report Client
Initial version created at srcHacks 2018 but significantly changed in the following months.
The idea of this software is that it allows students to anonymously report things to teachers, such as 
cheating or bullying. This involves our server sending an email to the teacher with the student's concerns.
The anonymous component is meant to encourage students to report these things without fear of repercussion from anyone.
Lots of improvements were introduced after the hackathon, such as:
- report limit for users (max 1 every 24 hours)
- teachers could flag innapropriate reports, affecting the users who sent them
- admins could ban users whose reports were flagged, meaning the user could no longer report
- multiple schools allowed on signup
- user selects teacher from list according to their school
- backend built for school scalability

Of course, this software never really came to fruition. 
My school's administration rejected my efforts to test it there. 
Hopefully the structure or some of the backend stuff can be a useful reference. 


## Run locally
Clone or fork the repo. 
Run
```
npm install 
```
To start backend server:
```
node index.js 
```
To start frontend:
```
npm start
```
I took out the email API key and db key so don't expect it to work fully.
