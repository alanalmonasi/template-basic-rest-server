# REST SERVER

### CRUD users

This is a basic configuration of a rest server where you can create, read, update users from a mongodb using

Use `npm install` or `npm i` to install all the dependencies

Use `npm run dev` to run the server in development mode

To connect to a database you need to rename the file `.env.template` to `.env` and replace the value of the MONGODB_URI with a conncection string that looks like:

```
mongodb+srv://<username>:<password>@beyondthebasics.abcde.mongodb.net/test
```

To know more about this yo can visit [MongoDB Connection String](https://www.mongodb.com/basics/mongodb-connection-string) the info you need is the section **How to get your MongoDB Atlas connection string**
