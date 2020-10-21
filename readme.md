<img src="https://static.begin.app/node-hello-world/readme-banner.png" width="813">

[![Begin build status](https://buildstatus.begin.app/run-s85/status.svg)](https://begin.com)

## Deploy your own

[![Deploy to Begin](https://static.begin.com/deploy-to-begin.svg)](https://begin.com/apps/create?template=https://github.com/begin-examples/node-hello-world)

Deploy your own clone of this app to Begin!

## Getting started

- Start the local dev server: `npm start`
- Lint your code: `npm run lint`
- Run your tests: `npm t`

## Reference

- [Quickstart](https://docs.begin.com/en/guides/quickstart/) - basics on working locally, project structure, deploying, and accessing your Begin app
- [Creating new routes](https://docs.begin.com/en/functions/creating-new-functions) - basics on expanding the capabilities of your app

Head to [docs.begin.com](https://docs.begin.com/) to learn more!

# Generic Login flow

start with index
install arc functions
create view layout

`/views` folder has a JS function that takes in params. If there is an account, then show logout otherwise show register link

## create `get-register` function
there will be two parts for many of these functions, a get request that loads the view and a post request that does the backend validation.

form also uses the layout function to return html strings

## create `post-register` function
the post function will receive the password and email from the HTML form

we're going to use `@begin/data` to save the info and `bcryptjs` to encrypt the password in the database.

## create `get-logout` and clear sessions
Next, we're going to implement the logout feature. To logout, the user requests `get-logout` and the session is cleared.

## create `src/shared/auth.js` middleware

we will continue using `@architect/functions` to create a middleware auth function that can be accessed by every function. We're going to create a `src/shared` folder with the auth function inside.


## create `get-admin` function restricted page
get admin will represent the restricted route that we want to enforce


## create `get-login`
get login will be the rendered html with a form to post credentials to

## create `post-login`

post login receives html form data from the login form and checks for the existence of the user and if they have the correct password

## Create a `registered` event

When someone signs up for our new service, we should send an email to them with a verification token that we can compare

First we will create a new event function in our app.arc file. Install a few dependencies to this function that will include the Sendgrid library to send an email with  their service.

For the API key we will place it in the .arc-env file and be sure not to commit this file.

We will use `@architect/functions` to perform the service discovery of the SNS topic at runtime.

The function `registered` is subscribed to the SNS topic and will receive the event payload published from `post-register`

In this event function, we will create a token and save it with a TTL of five minutes. The token will be destroyed by DynamoDB and the link will no longer be active.

We're also using SendGrid to handle the email delivery of a verification email that will contain a link to the verify page with the token.


## create `get-verify-000token`

This page will verify the token received is in the db

## modify admin page to allow for account deletion

add a new navigation to delete account

## create `post-register-nuke`

this will delete the account

## create `get-reset` and `post-reset`

get reset is a lot like the registration flow plus the verification token in one step. The user will post an email address to `post-reset`
