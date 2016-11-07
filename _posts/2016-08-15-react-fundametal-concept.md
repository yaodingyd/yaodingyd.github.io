---
layout: post
title:  "React Fundametals"
date:   2016-08-15
---

### React Element
JSX: 

```javascript
    var reactElementExample = <div myProp="test">example</div>;
```
ES5: 

```javascript
    var x = React.createElement(
        "div",
        {myProp: "test"},
        "a div block"
    );
```
React element is a plain old JavaScript Object without any functions.

### React Component

ES6:

```javascript
    Class Example extends React.Component {
        constructor(props){
            super(props)
            this.state = {
                title: props.title
            };
        };
        myFunction{};
        render {};
    }

    Example.propTypes = {
        title: PropTypes.string.isRequired
    }
```

ES5:

```javascript
    React.createClass({
        render: function(){},
        myFunction: function(){},
        propTypes: {
        title: ReactPropTypes.string.isRequired
        },
        getInitialState: function() {
            return {
                title: this.props.title
            };
        }
    });
```

React Component have states, functions and Component lifecycle hooks.

### Bind 'this'

ES6

```javascript
    constructor(props){
        super(props);
        this.someFunction = this.someFunction.bind(this);
    }

    someFunction(){
        this.state.someState = 1;
    }
```

or use arrow function, you don't have to explicitly bind `this`:

```javascript
     someFunction = () => {this.state.someState = 1;}
```


### Stateless Function Component
ES5 and JSX:

```javascript
    function Example(props){
        return <div>{props.title}</div>;
    }
```
ES6:

```javascript
    const Example(props) => ( <div>{props.title}</div>);
```
Stateless function component does not have states and lifecycle hooks. It is a pure function of props.

### Backing instance
The actual DOM node for React element instance or component instance.

Component Instance
`var componentInstance = ReactDOM.render(<CustomForm />, document.getElementById("root"));`

Backing Instance
`var domInstance = ReactDOM.findDDOMNode(componentInstance);`

### Refs
Avoid use refs in component.
Only use refs to refer componet's backing instance.(If you really need to do DOM stuff)

### Presentational and Container Components

A container does data fetching and then renders its corresponding sub-component.
A presentational component only deals with view.
