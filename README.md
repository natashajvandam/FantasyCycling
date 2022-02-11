# Granny Gear Groupetto - Fantasy Cycling App

This website was created during Codeworks bootcamp, in a week in order to practice and test coding skills. It allows users to create accounts, buy and sell cyclists from a ranked list of over 2,200 riders, and earn points each night based on which riders were on their roster the day before the race.

[Demo youtube video](https://www.youtube.com/watch?v=NL4RpSDbDKw&t=36s)

#### Auth0 Login / Register

![login sreen](https://i.ibb.co/Sf5TsDb/login-screen.png)

Users login or register with Auth0.

#### Home Page

![home screen](https://i.ibb.co/KbKQmDt/Screen-Shot-2022-02-11-at-8-23-27-PM.png)

Users can search for, buy, and sell riders.

#### League Page

![league page](https://i.ibb.co/djVF0NQ/league-Page-Simp.png)

Users can view their ranking on the league page.

## Getting Started

To install the required dependancies, run `npm i` from the client folder and from the Server folder.

To set up the hosted Elephany SQL database, create an account on [Elephant SQL](https://www.elephantsql.com/) and create a new instance with the free plan. Once the instance is created, you will can click on it and see details such as the url that will be added to a `.env` file in the following steps.

To set up Auth0, create an account on [Auth0](https://auth0.com). Create a new Single Page Application. On the settings tab you will find the domain name and client id. Scroll to the Application URIs section and add `http://localhost:3000/home` to the Allowed Callback URLs, add `http://localhost:3000` to the Allowed Logout URLs, to the Allowed Web Origins, and to the Allowed Orgins(CORS) sections. Then hit `save changes` at the bottom.

To configure these connections, create two `.env` files, one in the client folder an one in the Server folder and copy the following and add the correct values for the auth0 domain and client id, as well as the elephant sql uri.

```js
REACT*APP_AUTH0_DOMAIN=YOUR_AUTH0_DOMAIN
REACT*APP_AUTH0_CLIENTID=YOUR_AUTH0_CLIENT_ID
REACT_APP_AUTH0_REDIRECT_URL=http://localhost:3000/home
DATABASE_URI=YOUR_ELEPHANT_SQL_URL
```

Finally, to initially add all riders to the database, uncomment line **22** of Server/index.ts, run `npm run build`, then run `node .`. This will take a few minutes. You will see rider-names, team names, and upcoming race names in the console. It is complete when you see `complete` in the console and it stops logging. At this point you can comment out line 22 again, run the build again (`npm run build`) and then start the server again with `node .`. Move to the client folder and start it with `npm start`.

Every night at midnight the webscrapers will run and add any missing riders to the database, update their scores, and update each user's score accordingly.

## Tech stack

For the back-end, this project uses an **Express** server, **Node-cron** to schedule daily updates, **Jsdom** and got for webscraping data from [Procycling Stats](https://www.procyclingstats.com/rankings.php), **Auth0** for authentication, and an **Elephant SQL** database to host the relational database.

The front-end is **React** with **Sass** for styling. Both front-end and back-end are written in **Typescript**.

## Contributors

[Natasha Vermeulen](https://github.com/natashajvandam), [Edu Minguez](https://github.com/eduwp90), and [Kristen Hickey](https://github.com/KristenHickey).
