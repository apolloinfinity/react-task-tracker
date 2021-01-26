# Useful bits about React

```javascript
import {useState} from 'react';

const component () => {
    const [count, setCount] = useState();
}
```
First item(count) in the useState pair is the initial state. State is immutable. The second item(setCount) is the function that updates the initial state. They can be named anything if you would like. As any good programmer, name the variables something meaningful within it's context. Within this tutorial, the initial state data is ut inside the useState() function. 


useEffect is used to create side effects. It's often used with data that needs to be loaded as soon as the webpage is called. Like ngOnInit in Angular.  

The dependancy array in the useEffect is used to run a value if needed. It also prevents the useEffect from running more than once with an empty array. 

## React Router DOM
Using regular a tags will do a full page render. In order to stop a full page render, use react router dom's Link. For example:
```jsx
import { Link } from 'react-router-dom';

<Link to="/">Home</Link>
```