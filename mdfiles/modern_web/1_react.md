## React




### About 

### Starting project 

Let's use create-react-app tool to create a new react app:

```
npx create-react-app new-app
```

```
cd new-app
```

```
npm start
```

Automatic reload and save changes. 

Lets build single page app, that returns single html file. 

index.js - imports to import modules. 
ReactDOM.render - executed. Renders App component into DOM element. 

App.js - a javascript function. JSX - an html-looking code. 
Is translated into React.createElement('h1', {title: 'this works', ...}) // is you import React

### Components 

React is all about components. App.js is a component. 
Components can be done via extending the class. Using functions is a modern way.
Has to return a Jsx code!!!

Have to start with a capital leter - it tells that it is not a default tag, but a custom 

How to use multiple components?
Let's rewrite the App.js component:

```
import './App.css';
import React from 'react';

function App() {
  return (
    <div className='container'>
      <h2>Student list </h2>
      <ul className='stud-list'>
        <li>Ivanov</li>
        <li>Petrov</li>
        <li>Frolov</li>
      </ul>
    </div>
  );
}

export default App;
```

Note: we can set styles in App.css, for example, class container.
Instead of class - className.

Add the following in App.css file:

```
.container{
  margin: 2rem;
}

.stud-list{
 list-style: none;
 /* margin: 2rem; */
 padding: 0; 
}

.stud-list li{
  margin: 1rem 0;
  border: 1px solid grey;
  padding: 1rem;
}
```

List element should be outsourced to the components.
Add the components folder in src, there add StudList.js file.

There we add the following: 

```
import React from 'react';

const StudList = () => {
    return (
        <ul className='stud-list'>
        <li>Ivanov</li>
        <li>Petrov</li>
        <li>Frolov</li>
      </ul>
    )
}

export default StudList;
```

And change the App.js to the following: 
```
import './App.css';
import React from 'react';
import StudList from './components/StudList';

function App() {
  return (
    <div className='container'>
      <h2>Student list </h2>
      <StudList />
    </div>
  );
}

export default App;

```

If we save now, we see the same output and the same styling as before.
But it is still a good practice to add a separate css file for a component.
StudList.css in components folder:
```
.stud-list{
    list-style: none;
    /* margin: 2rem; */
    padding: 0; 
   }
   
   .stud-list li{
     margin: 1rem 0;
     border: 1px solid grey;
     padding: 1rem;
   }
```


### Props 

Split into components - separation of concerns. But how pass data between the components? 
Via the concept of props. Props are passed automatically by react to the component.

App.js:
```
import './App.css';
import React from 'react';
import StudList from './components/StudList';

function App() {
  const sutdList = [
    {id:1, text: "Ivanov"},
    {id:2, text: "Petrov"},
    {id:3, text: "Frolov"}
  ];

  return (
    <div className='container'>
      <h2>Student list </h2>
      <StudList studs={sutdList}/>
    </div>
  );
}

export default App;
```

StudList.js: let's map array of elements to an array of jsx objects. Also added console.log to see, what comes in props.
```
import React from 'react';
import './StudList.css'

const StudList = props => {
    console.log(props.studs);

    return (
        <ul className='stud-list'>
            {
                props.studs.map((stud) => {
                    return <li>{stud.text}</li>
                })
            }
        </ul>
    )
}

export default StudList;
```


## Events:

Add component NewStudent.js 

```
import React from 'react';
import './NewStudent.css'

const NewStudent = props => {
    const addStudentHandler = event => {
        event.preventDefault();

        const newStud = {
            id: 1,
            text: 'text'
        }

        props.onAddStud(newStud);
    }

    return (
    <form className='new-student' onSubmit={addStudentHandler}>
        <input type='text'/>
        <button type='submit'>Add Student</button>
    </form>
    )
}

export default NewStudent;
```

Add styles for it: 
```
.new-student{
    margin: 2rem;
    text-align: center;
}
```



in App.js:

```
import './App.css';
import React from 'react';
import StudList from './components/StudList';
import NewStudent from './components/NewStudent/NewStudent'

function App() {
  const studList = [
    {id:1, text: "Ivanov"},
    {id:2, text: "Petrov"},
    {id:3, text: "Frolov"}
  ];

  const addNewStudHandler = (newStud) => {
    studList.push(newStud);
  }

  return (
    <div className='container'>
      <h2>Student list </h2>
      <NewStudent onAddStud={addNewStudHandler} />
      <StudList studs={studList}/>
    </div>
  );
}

export default App;
```



## State:

React has to be told when to re-render - via state updates!

in App.js:
```
import './App.css';
import React, {useState} from 'react';
import StudList from './components/StudList';
import NewStudent from './components/NewStudent/NewStudent';


function App() {
  const [studList, setStud ] = useState(
    [
      {id:1, text: "Ivanov"},
      {id:2, text: "Petrov"},
      {id:3, text: "Frolov"}
    ]
  );

  // const studList = [
  //   {id:1, text: "Ivanov"},
  //   {id:2, text: "Petrov"},
  //   {id:3, text: "Frolov"}
  // ];

  const addNewStudHandler = (newStud) => {
    setStud(studList.concat(newStud));
  }

  return (
    <div className='container'>
      <h2>Student list </h2>
      <NewStudent onAddStud={addNewStudHandler} />
      <StudList studs={studList}/>
    </div>
  );
}

export default App;
```

setStud - method that allows to handle state updates;

State can be anything. UseState always returns array with two elements - state and method to update it!

Better approach - in App.js - better for rendering:
```
import './App.css';
import React, {useState} from 'react';
import StudList from './components/StudList';
import NewStudent from './components/NewStudent/NewStudent';


function App() {
  const [studList, setStud ] = useState(
    [
      {id:1, text: "Ivanov"},
      {id:2, text: "Petrov"},
      {id:3, text: "Frolov"}
    ]
  );

  // const studList = [
  //   {id:1, text: "Ivanov"},
  //   {id:2, text: "Petrov"},
  //   {id:3, text: "Frolov"}
  // ];

  const addNewStudHandler = (newStud) => {
    // setStud(studList.concat(newStud));
    setStud( (oldStuList) => {return oldStuList.concat(newStud)} );
  }

  return (
    <div className='container'>
      <h2>Student list </h2>
      <NewStudent onAddStud={addNewStudHandler} />
      <StudList studs={studList}/>
    </div>
  );
}

export default App;

```




## Data binding

This is a two-way binding between user input and variable;
In NewStud.js:

```
import React, {useState} from 'react';
import './NewStudent.css'

const NewStudent = props => {
    const [enteredText, setText] = useState(''); 

    const addStudentHandler = event => {
        event.preventDefault();

        const newStud = {
            id: 1,
            text: enteredText
        }

        setText('');

        props.onAddStud(newStud);
    }

    const textChangeHandler = event => {
        setText(event.target.value);
    }

    return (
    <form className='new-student' onSubmit={addStudentHandler}>
        <input type='text' value={enteredText} onChange={textChangeHandler}/>
        <button type='submit'>Add Student</button>
    </form>
    )
}

export default NewStudent;
```

