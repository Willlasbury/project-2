# @aGlance

## Description

For the project manager that is managing multiple projects and needs to see what is going at a glance and know what needs to be address this program does just that. With a focus on color coded statuses and symbols to help indicate where things are at this program will show you what is "on-track", "needs-assistance", or is "off-track". In addition the level of intensity for the colors are dictated by how close the due date for the project.

Within each project they are also a list of tasks that also contain due, dates, descriptions, and names. This program also comes with full log-in, log-out functionality in order ton make sure that the projects and tasks that you are seeing are only the ones related to you.

## Installation

If you are running on Heroku you can just launch the application and start working on it. If you are running this your chosen IDE then there are few steps to get things started.

Once you have the code open your integrated terminal and run "npm i" in order to download all the needed dependancies. Then in your terminal sign into your sequal and run "SOURCE ./db/schema.sql". From there on the root level add a ".env" file and include the following information.

- "DB_NAME"="blog_db"
- "DB_USER"="(whatever your user is usually it is ROOT)"
- DB_PASSWORD="(your password)!"
- SESSION_SECRET="super Secret"

From there run node index.js from the root level in order to get the server running. By default the server runs on port number 3001. If there are no error messages then you can open any of your browsers and from there type "http://localhost:3001/" and you should be brought to the log in page.

## Usage

If you are starting up the program for the first time you will need to sign up first. By default the program will take you to the login page. You can click "sign up" in order to go to the sign up page and create an account. Add a username, email, and password then click "create account". Once you have successfully created an account it will take you to the home page where all of your projects are.

As you can see there are no projects to start becuase you need to create one first. Click the create project button and input the title and due date for that project. From there it will take you to the create task page where you can add a title, due date, and description for your task. Once this is done you will be redirected back to the home page where you can see your new project.

By default a new project is blue as it has no task status associated with it. If you click the project it will take you the individual project page where you can see the project, due date, and tasks with their information below it. If you click the drop down button on the task you can change it's status. Once you do that if you go back to the home page you will see that the project card has changed color to correlate with the color of that task status. This is done by calculating the average of the task statuses within a project following the following formula.

- 1 = off-track
- 2 = needs-assistance
- 3 = on-track

If you have two tasks and one it "off-track" (1) and one is "on-track"(3) meaning the average will be 2 and make the project average being "need-assistance" / yellow.

![Project Overview Page](assets/Screenshot%202023-05-13%20at%2011.35.53%20AM.png)
  ![Login Page](assets/Screenshot%202023-05-13%20at%209.11.47%20AM.png)
  ![Individual Project Page](assets/Screenshot%202023-05-13%20at%209.12.54%20AM.png)



## Credits

- Insomnia - https://docs.insomnia.rest/
- Node.js - https://nodejs.org/en
- mySQL - https://www.mysql.com/
- dotenv - https://www.npmjs.com/package/dotenv
- Express - https://www.npmjs.com/package/express
- Router - https://www.npmjs.com/package/router\
- Handlebars - https://handlebarsjs.com/

## License

MIT License

Copyright (c) 2023 Alex Horning

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
