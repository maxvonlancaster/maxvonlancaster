## Node js


### What is Node?

Node js - host env for javascript, js engine
Allows you to run js outside of the browser;
Adds new api (filesystem), drops other (dom api)

To start - new folder, add there an app.js file, and write there:
```
console.log("hello world");
```

and tun the following command in the terminal:
```
node app.js
```

If you try using `alert("hello world")`, you will get an error.

Now let's try something specific for node - working with files, for example.
In app.js write the following code:
```
const fs = require('fs');

const text = 'Hello world';

fs.writeFile('first_file.txt', text, (err) => {
    if(err){
        console.log(err);
        return;
    }
    console.log('wrote file');
});
```

This code will write text to file. 
`require('fs');` - gets file system module;
Third argument in writeFile - callback function, that allows us to work asynchronosly, and it will get executed when the file is written, with err param being null if no error. Node js does not block long executing IO/RW operations.

### Requests and responses

Lets use Node js to write a server app. 
For that - import http module, that has `createServe()` method; This method takes in a function, that is triggered whenever we have an incoming request.
It has two inputs - req and res objects. It then returns the server object, on which you then call `listen(port)`, that sets up an event listener on the incoming requests.

After that, when you run this app, you can send requests to locahost:5000. 
`res.end('some response');` - response from the server;

```
const http = require('http');

const server = http.createServer((req, res) => {
    console.log('incoming request');
    console.log(req.method, req.url);

    res.end('<h1>success</h1>');
});

server.listen(5000);
```

Save this to app.js, run it and navigate to localhost:5000. You will see 'success' response and logs in console.
You can also write `res.setHeader('Content-Type', 'text/plain');` before res.end to communicate to client not to interpret the reponse as an html markdown.
You will have to restart the server to see the changes applied.

This is not the best way to handle requests!

Lets handle post request from form submition.
For that, first, run the following code to see, what comes in our req chunks, in body of the request:
```
const http = require('http');

const server = http.createServer((req, res) => {
    console.log('incoming request');
    console.log(req.method, req.url);

    if(req.method === 'POST'){
        let body = '';
        req.on('end', () => {
            console.log(body);
            res.end('<h1>Got the POST request</h1>');
        })

        req.on('data', (chunk) => {
            body += chunk;
        })
    } else {
        res.setHeader('Content-Type', 'text/html')

        res.end(
            '<form method="POST"><input type="text" name="username"><button type="submit">create user</button></form>'
            );
    }
});

server.listen(5000);
```

On submit, in console we see `username=hello` - is the body of the request. There is no req.body, or something like that, to see the entire body of the request. Data is streamed to server in chunks, so we have to construct the body. 
So we now can add the line `const userName = body.split('=')[1]` to get the userName submitted.

Let's rewrite the app.js file:
```
const http = require('http');

const server = http.createServer((req, res) => {
    console.log('incoming request');
    console.log(req.method, req.url);

    if(req.method === 'POST'){
        let body = '';
        req.on('end', () => {
            const userName = body.split('=')[1];
            res.end('<h1>Hello, '+ userName +'</h1>');
        })

        req.on('data', (chunk) => {
            body += chunk;
        })
    } else {
        res.setHeader('Content-Type', 'text/html')

        res.end(
            '<form method="POST"><input type="text" name="username"><button type="submit">create user</button></form>'
            );
    }
});

server.listen(5000);
```

Now we handle the incomming data!

### Express Js

Node can be too cumbersome. Express make some things on server easier, just like react makes easier in browser.
Express in middlware-focused.

First, we have to convert this app to a "managed" project. For that, run the following in the console:
```
npm init
```

After that we get the package.json file, that stores all the dependencies of the project. 
To install now a dependency, we run:

```
npm i express --save
```

You now have node_modules folder, that contains express and all the other dependencies.
Now lets start using express in our app.js:
```
const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log('middleware');
    next();
});

app.use((req, res, next) => {
    res.send(
        '<form method="POST"><input type="text" name="username"><button type="submit">create user</button></form>'
        );
});

app.listen(5000);
```

express (on line 1) is a function.
Idea of express - is usage of functions in middleware, that work with the request.
Middleware - is the app.use() method.
next() function - forward to the next middleware.

Before proceding, lets install nodemon, which will execute files, and restrt server automatically when save file.:
```
npm i nodemon --save-dev
```

Lets also add the following in package.json:
```
...
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon app.js"
  },
...
```

and install the body-parser package:
```
npm i body-parser --save
```

Lets rewrite app.js to use these new features:
```
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false})); // it will automatically call next()

// first argument now is an address
app.post('/user', (req, res, next) => { // this one is for all post requests
    return res.send('<h1>Hello, '+ req.body.username + '</h1>');
})

app.get('/', (req, res, next) => { // this one will work for get requests
    res.send(
        '<form action="/user" method="POST"><input type="text" name="username"><button type="submit">create user</button></form>'
        );
});

app.listen(5000);
```

Take note of adding `action="/user"` to the form, so that upon submittion you are now redirected to the `/user` endpoint, and the `app.post('/user', ...) ` method


### Routing

Let's now build our server using different routes.
For that, add `routes` folder, and in it courses-routes.js file
```
const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => { // register callback function on '/' endpoint
    console.log('get request in ,courses');
    res.json({message: 'it works'});
});

module.exports = router; // export 
```

And now we import this route to app.js file:
```
const express = require('express');
const bodyParser = require('body-parser');
const placesRoutes = require('./routes/courses-routes');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use(placesRoutes);

app.listen(5000);
```

Let's add specific dynamic routes now. In `routes/courses-routes.js` add the following code:
```
const express = require('express');

const router = express.Router();

const courses = [
    {
        id: 1,
        title: 'math',
        description: 'for future mathematicians'
    },
    {
        id: 2,
        title: 'algorithms and data structures',
        description: 'for future programmers'
    }
]

router.get('/:courseId', (req, res, next) => { // dynamic segment to get entity by id
    const courseId = req.params.courseId;
    const course = courses.find(c => c.id == courseId);
    res.json({course: course});
});

module.exports = router;
```

And in app.js:
```
const express = require('express');
const bodyParser = require('body-parser');
const placesRoutes = require('./routes/courses-routes');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/courses', placesRoutes); // would now forward only for this endpoint

app.listen(5000);
```

By navigating to http://localhost:5000/api/courses/1 you now see the respective entity, that you requested.


### Error handling

Let's return 404 if request does not find data;
In courses-routes:
```
const express = require('express');

const router = express.Router();

const courses = [
    {
        id: 1,
        title: 'math',
        description: 'for future mathematicians'
    },
    {
        id: 2,
        title: 'algorithms and data structures',
        description: 'for future programmers'
    }
]

router.get('/:courseId', (req, res, next) => { // dynamic segment to get entity by id
    const courseId = req.params.courseId;
    const course = courses.find(c => c.id == courseId);
    if (!course) {
        const error = new Error('Could not find a course for the provided id.'); // create a new error obj
        error.code = 404;
        throw error;
      }
    res.json({course: course});
});

module.exports = router;
```

In app.js:
```
const express = require('express');
const bodyParser = require('body-parser');
const placesRoutes = require('./routes/courses-routes');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/courses', placesRoutes); // would now forward only for this endpoint

// error handling middleware function, 
// will be executed when any function before it gives an error:
app.use((error, req, res, next) => { 
    if (res.headerSent) {
        return next(error);
      }
      res.status(error.code || 500); // default status code 500 if no returned
      res.json({message: error.message || 'An unknown error occurred!'});
})

app.listen(5000);
```


```

```