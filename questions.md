1. What is the difference between Component and PureComponent? give an
example where it might break my app.

Answer: The PureComponent won't trigger re-render on same props/state. When using only functional components we can do the same by using React.memo() wrapper. PureComponents make a shallow comparisons on props/state and may not detect some changes (like doing a push in a array) so it is preferable to use it when it is going to be immutable.

2. Context + ShouldComponentUpdate might be dangerous. Can think of why is
that?

Answer: Both things try to control when a component should update (Context does it by subscription with the useContext), so it may generate some inconsistency.


3. Describe 3 ways to pass information from a component to its PARENT.

Answer: Context, Callback functions

4. Give 2 ways to prevent components from re-rendering.

Answer: React.memo() if dealing with funtional components and ShouldComponentUpdate if it is a class component. In a class component you can also create it as a PureComponent.

5. What is a fragment and why do we need it? Give an example where it might
break my app.

Answer: A fragment is a component to group other components without creating any new html nodes. I don't see where it can break an app.

6. Give 3 examples of the HOC pattern.

Answer:
```js
  const AddDivToComponent = (AComponent) => {
    return <div><AComponent /></div>
  }
```
```js
  const PlaceholderForComponent = (AComponent, isComponentReady) => {
    return isComponentReady ? <AComponent /> : <p>Fetching data...</p>
  }
```
```js
  const CustomInputHandler = (AnInputComponent) => {
    const inputHandler = (paramether1) => {
      //some logic
    }

    return <AnInputComponent onChange={inputHandler} />
  }
```

7. what's the difference in handling exceptions in promises, callbacks and
async...await.
8. How many arguments does setState take and why is it async.

Answer: 2 arguments (the new state and a callback function). Don't know why it is async.

9. List the steps needed to migrate a Class to Function Component.

Answer: Take out any lifecycle related methods, if needed use useEffect hook to subscribe updates to changes in specific props or states. After that change the state if the Class Component has any, to use useState, useReducer. Turn the render method into the return of the Function Component.

10. List a few ways styles can be used with components.

Answer: We can do it simply importing CSS like:
```js
import myStyles from './myStyles.module.css';

const MyComponent = () => {
  return <div className={myStyles.customClassName}>{/* Component stuff */}</div>;
};
```
or
```js
import './myStyles.css';

const MyComponent = () => {
  return <div className="customClassName">{/* Component stuff */}</div>;
};
```
We can also do it by creating a styles object and passing to the component like that:
```js
const myStyle = {
  display: "flex"
}
const MyComponent = () => {
  return <div style={myStyle}>{/* Component stuff */}</div>;
};
```

11. How to render an HTML string coming from the server.

Answer: The only way that I know, without any lib is by using dangerouslySetInnerHTML but it is not recommended.