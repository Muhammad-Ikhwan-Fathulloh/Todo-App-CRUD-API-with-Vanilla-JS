//get url api
let url_api = "https://62bcfafbc5ad14c110b50245.mockapi.io/api/v1/todo";
//get url api

//get element by id
const title = document.getElementById("title")
const description = document.getElementById("description")
const button = document.getElementById("button-todo")
const button_clear = document.getElementById("button-clear")
//get element by id

//variabel update data
let update = false
let update_id = null
//variabel update data

// Function to fetch data all method GET, POST, PUT, and DELETE
function myFetch(url, type, data) {
    //GET
    if (type === "GET") {
    return fetch(url, {
    method: type,
    headers: {
        'Content-type': 'application/json'
    }
    })
    .then(res => {
        if (res.ok) { console.log("HTTP request successful") }
        else { console.log("HTTP request unsuccessful") }
        return res
    })
    .then(res => res.json())
    .then(data => data)
    .catch(error => error)
    }
  
    //DELETE
    if (type === "DELETE") {
    return fetch(url, {
    method: type,
    headers: {
        'Content-type': 'application/json'
    }
    })
    .then(res => {
        if (res.ok) { console.log("HTTP request successful") }
        else { console.log("HTTP request unsuccessful") }
        return res
    })
    .catch(error => error)
    }
  
    //POST or PUT
    if (type === "POST" | type === "PUT") {
    return fetch(url, {
    method: type,
    mode: 'cors', 
    cache: 'no-cache', 
    credentials: 'same-origin', 
    redirect: 'follow', 
    referrerPolicy: 'no-referrer',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    })
    .then(res => {
        if (res.ok) { console.log("HTTP request successful") }
        else { console.log("HTTP request unsuccessful") }
        return res
    })
    .then(res => res.json())
    .then(data => data)
    .catch(error => error)
    }
}
// Function to fetch data all method GET, POST, PUT, and DELETE

// Function to fetch data
function fetchTodoData() {
    fetch(url_api)
    .then(resp => resp.json())
    .then(data => renderTodo(data))
}
// Function to fetch data

// Function to render data to dom
function renderTodo(data) {
    for (const value of data) {

    const todoUL = document.querySelector('#todo-list')

    const todoLi = document.createElement('li')
    const p1 = document.createElement('p')
    const p2 = document.createElement('p')
    const btnEdit = document.createElement('p')
    const btnDelete = document.createElement('p')
    const br = document.createElement('br')
    const hr = document.createElement('hr')

    todoLi.className = 'todo-card'          
    p1.className = 'mb-3'   
    p2.className = 'mb-3' 
    btnEdit.className = 'mb-3'                      
    btnDelete.className = 'mb-3'   
    todoLi.dataset.id = value.id

    p1.innerHTML = value.title
    p2.innerHTML = value.description
    btnEdit.innerHTML = `<button class="btn btn-primary" id="${value.id}" onClick="todoEdit(this.id)">Edit</button>`
    btnDelete.innerHTML = `<button class="btn btn-danger" id="${value.id}" onClick="todoDelete(this.id)">Delete</button>`

    todoLi.append(p1)
    todoLi.append(p2)
    todoLi.append(btnEdit)
    todoLi.append(btnDelete)
    todoUL.append(todoLi)
    }
}
// Function to render data to dom

// function to clear data
function clearTodo(){
    // refresh value
        document.getElementById("title").value = ""
    document.getElementById("description").value = ""
}
// function to clear data

// function to show data by id
function todoEdit(id) {
    fetch(`${url_api}/${id}`)
    .then(resp => resp.json())
    .then(data => DetailTodo(data, id))
}

function DetailTodo(data, id) {
        document.getElementById("title").value = data.title
        document.getElementById("description").value = data.description

    console.log(data)

    update = true
    update_id = id
}
// function to show data by id

// Button to clear data
button_clear.addEventListener("click", function() {
    clearTodo()
    update = false
    update_id = null
})
// Button to clear data

// Button to insert and update data
button.addEventListener("click", function() {
    // validasi input
    if (title.value == "" || description.value == "") {
        // alert failed
        alert("Input title and description")
    }else{
        //condition insert data update == false 
        if(update == false){
            document.getElementById("todo-list").innerHTML = `<ul id="todo-list"></ul>`
            myFetch(url_api, "POST",{
                title: title.value ,
                description: description.value
               }).then(res => console.log(res))
               
               clearTodo()
               alert("Create todo successful")
               fetchTodoData()
        }

        //condition update data update == true 
        else if(update == true){
            document.getElementById("todo-list").innerHTML = `<ul id="todo-list"></ul>`
            myFetch(`${url_api}/${update_id}`, "PUT",{
                title: title.value ,
                description: description.value
               } 
            ).then(res => console.log(res))

            clearTodo()
            alert("Update todo successful")
            fetchTodoData()
        } 
    }       
})
// Button to insert and update data

// Function to delete data
function todoDelete(id) {
    document.getElementById("todo-list").innerHTML = `<ul id="todo-list"></ul>`
    myFetch(`${url_api}/${id}`, "DELETE").then(res => console.log(res))
    
    alert("Delete todo successful")
    fetchTodoData()
}
// Function to delete data

//render data
fetchTodoData()
//render data