import { useEffect, useState } from 'react';
import './Names.css'

// This component should stay in sync with our demo-server API.
// Our api supports:
// CRUD - Create, Read, Update, Delete

// - ✅C: Adding a name to the list & save to the API
// - ✅R: Reading a list of names.
// - ✅U: Bonus points? Add ability to update a name?
// - ✅D: Delete names from the list.

function Names() {
    const [ names, setNames ] = useState([])  // {id: 1, name: "Brad", isEditing: false}

    function fetchNames() { // GET the list of names from the API
        const myRequest = new Request("http://localhost:3000/api");
        fetch(myRequest)
            .then((response) => response.json())
            .then((json) => {
                const newNames = json.map((obj) => {
                    obj.isEditing = false;
                    return obj;
                });
                setNames(newNames);
            });
    }

    function createName(event) { // POST a new name to the API
        event.preventDefault();
        const data = new FormData(event.target);
        const payload = {"name": data.get("newName")}
        console.log(payload)

        const url = "http://localhost:3000/api";
        const request = new Request(url, {
            method: "POST",
            mode: "cors", // important!
            headers: {"Content-Type": "application/json"},  // MIME.
            body: JSON.stringify(payload)
        })
        fetch(request)
            .then((response) => response.json())
            .then((newItem) => {
                console.log(newItem);
                // what should happen to the ui?
                //names.push(newItem); // React: NEVER mutate your state variables.
                setNames([...names, newItem]);
            })
        
    }

    function deleteName(event) { // send a DELETE request to the API
        const id = parseInt(event.target.dataset.id);
        const url = "http://localhost:3000/api/" + id;
        console.log(url);

        const deleteRequest = new Request(url, {
            method: "DELETE"
        });
        fetch(deleteRequest)
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data); // what next?
                // How do we remove the deleted item from our state?
                const result = names.filter((obj) => obj.id != id);
                setNames(result);
            });
    }
    
    function updateName(event) { // Send a PUT request to update
        event.preventDefault();

        //const data = new FormData(event.target); WHY did this not work!?
        const form = event.target;
        const id = parseInt(event.target.children[0].value);
        const newName = event.target.children[1].value;

        const url = "http://localhost:3000/api/" + id;
        const payload = {
            "name": newName
        }
        console.log("Update? ", url, payload);
        const request = new Request(url, {
            method: "PUT",
            mode: "cors", // important!
            headers: {"Content-Type": "application/json"},  // MIME.
            body: JSON.stringify(payload)
        })
        fetch(request)
            .then((response) => response.json())
            .then((newItem) => {
                console.log(newItem);
                // newItem will be somethign like: { id: 5, name: "whatever" }
                // Get all the existing names, except for the one we just updated.
                const oldNames = names.filter((obj) => obj.id != newItem.id);
                newItem.isEditing = false; // Ensure our UI knows we're no longer editing this.
                oldNames.push(newItem)

                //names.push(newItem); // React: NEVER mutate your state variables.
                // We're sorting all names based on .id before updating the state.
                setNames(oldNames.toSorted((obj1, obj2) => obj1.id - obj2.id));
            })

    } 

    useEffect(() => {
        fetchNames()
    }, []);

    function enableEditing(event) {
        const id = parseInt(event.target.dataset.id);
        const results = names.map((obj) => {
            if(obj.id === id) {
                obj.isEditing = true;
            }
            return obj;
        });
        setNames(results);
    }

    function disableEditing(event) {  // TODO: this didn't work, read up on
        console.log("We're blurred?")
        const result = names.map((obj) => {
            obj.isEditing = false;
            return obj; 
        })
    }

    // Each object looks like: {id: 1, name: "brad"}
    const items = names.map((obj) => {
        return (
            <li key={'id-' + obj.id}>
                {obj.isEditing &&
                    <form action="#" onSubmit={updateName}>
                        <input type="hidden" name="id" value={obj.id} />
                        <input type="text" 
                            name="name" 
                            placeholder={obj.name} 
                            onBlur={disableEditing} />
                    </form>
                }
                {obj.isEditing === false &&
                <>
                    <span onClick={enableEditing} data-id={obj.id}>
                        [{obj.id}]
                        {obj.name}
                    </span>
                    <button onClick={deleteName} 
                            id={"delete-" + obj.id} 
                            data-id={obj.id}
                            title="Delete">🗑️</button>
                </>
                }
            </li>
        );
    });

    return (
        <div>
            <h1>Names!</h1>
            <form action="#" onSubmit={createName}>
                <p><input type="text" name="newName" placeholder="Enter a name"/></p>
                <p><input type="submit" /></p>
            </form>
            <ul>
                {items}
            </ul>
        </div>
    )
}

export default Names;