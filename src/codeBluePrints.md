//GREAT SYNTAX BELOW OF NOT MODIFYING STATE

import React from 'react';
import ReactDOM from 'react-dom';

function App() {

     const [thingsArray, setThingsArray] = React.useState(["Thing 1", "Thing 2"])
    
     function addItem() {
         // We'll work on this next
         setThingsArray(prevThingsArray => {
             return [...prevThingsArray, `Thing ${prevThingsArray.length + 1}`]
         })
     }
     
     const thingsElements = thingsArray.map(thing => <p key={thing}>{thing}</p>)
     
     return (
         <div>
             <button onClick={addItem}>Add Item</button>
             {thingsElements}
         </div>
     )
 }
 
 ReactDOM.render(<App />, document.getElementById('root'));



PROPS AND STATE COMBO

import React from "react"
import Count from "./Count"

export default function App() {
    const [count, setCount] = React.useState(0)
    
    function add() {
        setCount(prevCount => prevCount + 1)
    }
    
    function subtract() {
        setCount(prevCount => prevCount - 1)
    }
    
    return (
        <div className="counter">
            <button className="counter--minus" onClick={subtract}>–</button>
            <Count number={count} />
            <button className="counter--plus" onClick={add}>+</button>
        </div>
    )
}


//Count.jsx
import React from "react"

export default function Count(props) {
    return (
        <div className="counter--count">
            <h1>{props.number}</h1>
        </div>
    )
}



//CHILD USING PARENT FUNCTION TO UPDATE PARENT ARRAY

import React from "react"
import Star from "./Star"

export default function App() {
    const [contact, setContact] = React.useState({
        firstName: "John",
        lastName: "Doe",
        phone: "+1 (719) 555-1212",
        email: "itsmyrealname@example.com",
        isFavorite: true
    })
    
    function toggleFavorite() {
        setContact(prevContact => ({
            ...prevContact,
            isFavorite: !prevContact.isFavorite
        }))
    }
    
    return (
        <main>
            <article className="card">
                <img src="./images/user.png" className="card--image" />
                <div className="card--info">
                    <Star isFilled={contact.isFavorite} handleClick={toggleFavorite} />
                    <h2 className="card--name">
                        {contact.firstName} {contact.lastName}
                    </h2>
                    <p className="card--contact">{contact.phone}</p>
                    <p className="card--contact">{contact.email}</p>
                </div>
                
            </article>
        </main>
    )
}

import React from "react"

export default function Star(props) {
    const starIcon = props.isFilled ? "star-filled.png" : "star-empty.png"
    return (
        <img 
            src={`../images/${starIcon}`} 
            className="card--favorite"
            onClick={props.handleClick}
        />
    )
}



import React from "react"
import boxes from "./boxes"

export default function App() {
    const [squares, setSquares] = React.useState(boxes)
    const squareElements = boxes.map( () => (
        <div className="box" key={squares.id}></div>
    )
    )

     return (
        <main>
            {squareElements}
        </main>
    )
}


function App() {
    let someVar
    if () {
        someVar = <SomeJSX />
    } else if() {
        
    } else {
        
    }
    return (
        <div>{someVar}</div>
    )
}



//UPDATING FORMS

import React from "react"

import React from "react"

export default function Form() {
    const [formData, setFormData] = React.useState(
        {
            firstName: "", 
            lastName: "", 
            email: "", 
            comments: "", 
            isFriendly: true,
            employment: "",
            favColor: ""
        }
    )
    
    function handleChange(event) {
        const {name, value, type, checked} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }
    
    function handleSubmit(event) {
        event.preventDefault()
        // submitToApi(formData)
        console.log(formData)
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="First Name"
                onChange={handleChange}
                name="firstName"
                value={formData.firstName}
            />
            <input
                type="text"
                placeholder="Last Name"
                onChange={handleChange}
                name="lastName"
                value={formData.lastName}
            />
            <input
                type="email"
                placeholder="Email"
                onChange={handleChange}
                name="email"
                value={formData.email}
            />
            <textarea 
                value={formData.comments}
                placeholder="Comments"
                onChange={handleChange}
                name="comments"
            />
            <input 
                type="checkbox" 
                id="isFriendly" 
                checked={formData.isFriendly}
                onChange={handleChange}
                name="isFriendly"
            />
            <label htmlFor="isFriendly">Are you friendly?</label>
            <br />
            <br />
            
            <fieldset>
                <legend>Current employment status</legend>
                <input 
                    type="radio"
                    id="unemployed"
                    name="employment"
                    value="unemployed"
                    checked={formData.employment === "unemployed"}
                    onChange={handleChange}
                />
                <label htmlFor="unemployed">Unemployed</label>
                <br />
                
                <input 
                    type="radio"
                    id="part-time"
                    name="employment"
                    value="part-time"
                    checked={formData.employment === "part-time"}
                    onChange={handleChange}
                />
                <label htmlFor="part-time">Part-time</label>
                <br />
                
                <input 
                    type="radio"
                    id="full-time"
                    name="employment"
                    value="full-time"
                    checked={formData.employment === "full-time"}
                    onChange={handleChange}
                />
                <label htmlFor="full-time">Full-time</label>
                <br />
            </fieldset>
            <br />
            
            <label htmlFor="favColor">What is your favorite color?</label>
            <br />
            <select 
                id="favColor" 
                value={formData.favColor}
                onChange={handleChange}
                name="favColor"
            >
                <option value="red">Red</option>
                <option value="orange">Orange</option>
                <option value="yellow">Yellow</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
                <option value="indigo">Indigo</option>
                <option value="violet">Violet</option>
            </select>
            <br />
            <br />
            <button>Submit</button>
        </form>
    )
}

//useEffect API calls

import React from "react"

export default function App() {
    const [starWarsData, setStarWarsData] = React.useState({})
    const [count, setCount] = React.useState(1)

    
    React.useEffect(function() {
        console.log("Effect ran")
        fetch(`https://swapi.dev/api/people/${count}`)
            .then(res => res.json())
            .then(data => setStarWarsData(data))
    }, [count])
    
    return (
        <div>
            <h2>The count is {count}</h2>
            <button onClick={() => setCount(prevCount => prevCount + 1)}>Get Next Character</button>
            <pre>{JSON.stringify(starWarsData, null, 2)}</pre>
        </div>
    )
}

//classic useState --- show if true

- the return function in the window component use effect is there to clean up the side effect.
- when the show window component is true the useEffect is read and the return function is stored in memory
- when the show window is set to false, the window object is destroyed and the return function is read
- in this case it is to clean up (clean up function) the DOM eventlistener with (removeEventListener) which would create a memory leak,
- if not destroyed, as addEventListener sits in the DOM and not the component

import React from "react"
import WindowTracker from "./WindowTracker"

export default function App() {

    
    const [show, setShow] = React.useState(true)
    
    function toggle() {
        setShow(prevShow => !prevShow)
    }
    
    return (
        <div className="container">
            <button onClick={toggle}>
                Toggle WindowTracker
            </button>
            {show && <WindowTracker />}
        </div>
    )
}

import React from "react"

export default function WindowTracker() {
    
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)
    
    React.useEffect(() => {
        function watchWidth() {
            console.log("Setting up...")
            setWindowWidth(window.innerWidth)
        }
        
        window.addEventListener("resize", watchWidth)
        
        return function() {
            console.log("Cleaning up...")
            window.removeEventListener("resize", watchWidth)
        }
    }, [])
    
    return (
        <h1>Window width: {windowWidth}</h1>
    )
}