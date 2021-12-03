## Password Management Setup Instructions:

### Necessary steps to run

Client and Server are setup in different folders.\
Make sure to `npm i` in both folders to install all packages needed.

Have MySQL installed locally and execute the commands listed in `db.sql` file.\
[database setup commands](https://github.com/sciencemath/password-manager/blob/master/db.sql)

Copy the `.env.example` file in the server folder and make your own `.env` file,\
fill out the necessary values needed for your environment. [see here](https://github.com/sciencemath/password-manager/blob/master/server/.env)\
For my localhost I have setup like this:

```
MYSQL_HOST=localhost
MYSQL_DATABASE=passwordmanagement
MYSQL_USERNAME=root
MYSQL_PASSWORD=password
```

it will be different for your environment, and if you followed the steps above\
this env variable will be the same: `MYSQL_DATABASE=passwordmanagement`

Finally run `npm start` in the `./client` directory and `npm start` in the `./server` directory.
