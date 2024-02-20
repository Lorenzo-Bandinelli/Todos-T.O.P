// const todoList = [
//     {
//       title: 'hello world',
//       desc: 'improve coding skills',
//       dueDate: 'anytime',
//       priority: '--dont_care'
//     }
// ]

import {todoItem, getTodoList, createTodoList, addTodoToList, updateTodoList, delTodoItem, delTodoList, allTodos, updateTodoTitle} from './todoList.js'
import {pubsub} from './pubsub.js'

function renderTodoList(event){
    console.log(event.target)
    if (event === 'changingList' || event.target.classList.contains('todoGroup')){
        clearTodoList(event)
        if (event !== 'changingList'){
            document.currentTodoListTitle = event.target.textContent
        }
        let todoList = getTodoList(document.currentTodoListTitle, allTodos) 
        let todoListDom = document.querySelector('.todoList')
        for (let todoItemofList of todoList){
            let {title, desc, dueDate, priority} = todoItemofList
            let li = document.createElement('li')
            let textDiv = document.createElement('div')
            textDiv.classList.add('todoItemInfo')

            let spanTitleKey = document.createElement('span')
            spanTitleKey.appendChild(document.createTextNode('Title: '))
            spanTitleKey.classList.add('todoInfoKey')
            let spanTitleValue = document.createElement('span')
            spanTitleValue.appendChild(document.createTextNode(title))
            spanTitleValue.classList.add('todoInfoValue')

            let spanDescKey = document.createElement('span')
            spanDescKey.appendChild(document.createTextNode('Description: '))
            spanDescKey.classList.add('todoInfoKey')
            let spanDescValue = document.createElement('span')
            spanDescValue.appendChild(document.createTextNode(desc))
            spanDescValue.classList.add('todoInfoValue')

            let spanDateKey = document.createElement('span')
            spanDateKey.appendChild(document.createTextNode('Due Date: '))
            spanDateKey.classList.add('todoInfoKey')
            let spanDateValue = document.createElement('span')
            spanDateValue.appendChild(document.createTextNode(dueDate))
            spanDateValue.classList.add('todoInfoValue')

            let spanPriorityKey = document.createElement('span')
            spanPriorityKey.appendChild(document.createTextNode('Priority: '))
            spanPriorityKey.classList.add('todoInfoKey')
            let spanPriorityValue = document.createElement('span')
            spanPriorityValue.appendChild(document.createTextNode(priority))
            spanPriorityValue.classList.add('todoInfoValue')

            let textValue = document.createTextNode(`${JSON.stringify(todoItemofList)}`) ;
            li.classList.add('todoItem')
            textDiv.appendChild(textValue)
            li.appendChild(textDiv)
            todoListDom.appendChild(li)
        }
    }
    mainDiv.addEventListener('mouseover', renderAddTodoItemButton)
    mainDiv.addEventListener('mouseleave', removeAddTodoItemButton)
    let allItems = document.querySelectorAll('.mainDiv > ul > li')
    allItems.forEach((li) =>{
        li.addEventListener('mouseenter', renderRemoveEditTodoItem)
        li.addEventListener('mouseleave', removeRemoveEditTodoItem)
    })
}

function renderTodoTitles(allTodos){
    for (let todo of allTodos){
        let titleDiv = document.createElement('div')
        let titleSpan = document.createElement('span')
        titleSpan.classList.add('todoGroup')
        let todoTitleText = document.createTextNode(todo.itemListName)
        titleSpan.appendChild(todoTitleText)
        titleDiv.appendChild(titleSpan)
        sideDiv.appendChild(titleDiv)
    }
    sideDiv.addEventListener('click', renderTodoList)
    sideDiv.addEventListener('mouseenter', renderAddTodoTitleButton)
    sideDiv.addEventListener('mouseleave', removeAddTodoTitleButton)
    let allTitles = document.querySelectorAll('.sideDiv > div')
    allTitles.forEach(thisTitle => {
        thisTitle.addEventListener('mouseenter', renderRemoveEditTitleButton)
        thisTitle.addEventListener('mouseleave', removeRemoveEditTitleButton)
    })
}

function clearTodoTitles(){
    sideDiv.replaceChildren()
}

function clearTodoList(event){
    if (event === 'changingList' || event.target.classList.contains('todoGroup')){
        let ul = document.querySelector('.todoList')
        ul.replaceChildren()
        if (document.querySelector('.mainDiv > form')){
            let form = document.querySelector('.mainDiv > form')
            form.remove()
        }
    }
}

function renderAddTodoTitleButton(event){
    if (!document.querySelector('sideDiv > .addButton')){
        let sideDiv = document.querySelector('.sideDiv')
        let addButton = document.createElement('span')
        addButton.classList.add('addButton')
        addButton.appendChild(document.createTextNode('__CLICK ME__'))
        sideDiv.appendChild(addButton)
        if (addButton){
            addButton.addEventListener('click', addNewTodoList)
        }
    }
}

function removeAddTodoTitleButton(event){
    if (document.querySelector('.sideDiv > .addButton')){
        let addButton = document.querySelector('.sideDiv > .addButton')
        addButton.remove()
    }
}

function addNewTodoList(event){
    removeAddTodoTitleButton(event)
    sideDiv.removeEventListener('mouseenter', renderAddTodoTitleButton)
    sideDiv.removeEventListener('mouseleave', removeAddTodoTitleButton)
    let form = document.createElement('form')
    let textForm = document.createElement('input')
    textForm.type = 'text'
    textForm.name = 'todoListName'
    let sbtButton = document.createElement('input')
    sbtButton.type = 'submit'
    form.appendChild(textForm)
    form.appendChild(sbtButton)
    sideDiv.appendChild(form)
    form.addEventListener('submit', submitNewTodoList)
}

pubsub.subscribe('submitNewTodoList', clearTodoTitles)
pubsub.subscribe('submitNewTodoList', renderTodoTitles)
pubsub.subscribe('submitNewTodoList', () => {
    sideDiv.addEventListener('mouseenter', renderAddTodoTitleButton)
    sideDiv.addEventListener('mouseleave', removeAddTodoTitleButton)
})
function submitNewTodoList(event){
    event.preventDefault()
    let formData = Object.fromEntries(new FormData(event.target).entries())
    createTodoList(formData.todoListName)
    pubsub.publish('submitNewTodoList', allTodos)
}

function renderAddTodoItemButton(event){
    if (!document.querySelector('.mainDiv > .addButton') && !document.querySelector('.mainDiv > form') && document.currentTodoListTitle){
        let addButton = document.createElement('button')
        addButton.classList.add('addButton')
        addButton.appendChild(document.createTextNode('CLICK ME'))
        mainDiv.appendChild(addButton)
        if (addButton){
            addButton.addEventListener('click', addNewTodoItem)
        }
    }
}

function removeAddTodoItemButton(){
    if (document.querySelector('.mainDiv > .addButton')){
        let addTodoItemButton = document.querySelector('.mainDiv > .addButton')
        addTodoItemButton.remove()
    }   
}

function addNewTodoItem(event){
    removeAddTodoItemButton()
    mainDiv.removeEventListener('mouseover', renderAddTodoItemButton)
    mainDiv.removeEventListener('mouseleave', removeAddTodoItemButton)
    let form = document.createElement('form')
    let formTitle = document.createElement('input')
    formTitle.type = 'text'
    formTitle.name = 'todoTitle'
    formTitle.placeholder = 'Title'
    let formDesc = document.createElement('input')
    formDesc.type = 'text'
    formDesc.name = 'todoDesc'
    formDesc.placeholder = 'Description'
    let formDuedate = document.createElement('input')
    formDuedate.type = 'text'
    formDuedate.name = 'todoDuedate'
    formDuedate.placeholder = 'Due Date'
    let formPriority = document.createElement('input')
    formPriority.type = 'text'
    formPriority.name = 'todoPriority'
    formPriority.placeholder = 'Priority'
    let sbtButton = document.createElement('input')
    sbtButton.type = 'submit'
    Array(formTitle, formDesc, formDuedate, formPriority ,sbtButton).forEach(element => form.appendChild(element))
    mainDiv.appendChild(form)
    form.addEventListener('submit', submitNewTodoItem)
}

pubsub.subscribe('submitNewTodoItem', clearTodoList)
pubsub.subscribe('submitNewTodoItem', renderTodoList)
pubsub.subscribe('submitNewTodoItem', ()=> {
    mainDiv.addEventListener('mouseover', renderAddTodoItemButton)
    mainDiv.addEventListener('mouseleave', removeAddTodoItemButton)
})
function submitNewTodoItem(event){
    event.preventDefault()
    let {todoTitle, todoDesc, todoDuedate, todoPriority} = Object.fromEntries(new FormData(event.target).entries())
    addTodoToList(todoItem(todoTitle, todoDesc, todoDuedate, todoPriority), document.currentTodoListTitle)
    pubsub.publish('submitNewTodoItem', 'changingList')
}

function renderRemoveEditTitleButton(event){
    let removeBttn = document.createElement('button')
    removeBttn.classList.add('removeTitleButton')
    removeBttn.appendChild(document.createTextNode('X'))
    removeBttn.style.color = 'red'
    let editButton = document.createElement('button')
    editButton.classList.add('editTitleButton')
    editButton.appendChild(document.createTextNode('EDIT'))
    editButton.style.color = 'blue'
    let buttonDiv = document.createElement('div')
    buttonDiv.classList.add('buttonDiv')
    buttonDiv.appendChild(editButton)
    buttonDiv.appendChild(removeBttn)
    event.target.appendChild(buttonDiv)
    removeBttn.addEventListener('click', removeTodoTitle)
    editButton.addEventListener('click', editTodoTitle)
}

function removeRemoveEditTitleButton(event){
    if (document.querySelector('.removeTitleButton') && document.querySelector('.editTitleButton')){
        let buttonDiv = document.querySelector('.buttonDiv')
        buttonDiv.remove()
    }
}

pubsub.subscribe('removeTodoTitle', clearTodoTitles)
pubsub.subscribe('removeTodoTitle', renderTodoTitles)
function removeTodoTitle(event){
    delTodoList(event.target.textContent)
    console.log(allTodos);
    pubsub.publish('removeTodoTitle', allTodos)
}

function editTodoTitle(event){
    let inlineDiv = event.target.parentNode.parentNode
    console.log(inlineDiv);
    document.todoOldTitle = inlineDiv.firstChild.textContent
    let allTitles = document.querySelectorAll('.sideDiv > div')
    allTitles.forEach(thisTitle => {
        thisTitle.removeEventListener('mouseenter', renderRemoveEditTitleButton)
        thisTitle.removeEventListener('mouseleave', removeRemoveEditTitleButton)
    })
    sideDiv.removeEventListener('mouseenter', renderAddTodoTitleButton)
    sideDiv.removeEventListener('mouseleave', removeAddTodoTitleButton)

    removeRemoveEditTitleButton(event)
    removeAddTodoTitleButton(event)
    let form = document.createElement('form')
    let nameInput = document.createElement('input')
    nameInput.type = 'text'
    nameInput.name = 'newTitle'
    nameInput.value = document.todoOldTitle
    nameInput.classList.add('nameInputForm')
    let sbtButton = document.createElement('input')
    sbtButton.type = 'submit'
    sbtButton.classList.add('nameInputButton')
    form.appendChild(nameInput)
    form.appendChild(sbtButton)
    inlineDiv.replaceChild(form, inlineDiv.firstChild)
    form.addEventListener('submit', submitEditTitleChanges)
}

pubsub.subscribe('editTodoTitle', clearTodoTitles)
pubsub.subscribe('editTodoTitle', renderTodoTitles)
pubsub.subscribe('editTodoTitle', ()=> {
    let allTitles = document.querySelectorAll('.sideDiv > div')
    allTitles.forEach(thisTitle => {
        thisTitle.addEventListener('mouseenter', renderRemoveEditTitleButton)
        thisTitle.addEventListener('mouseleave', removeRemoveEditTitleButton)
    })
    sideDiv.addEventListener('mouseenter', renderAddTodoTitleButton)
    sideDiv.addEventListener('mouseleave', removeAddTodoTitleButton)
})
function submitEditTitleChanges(event){
    event.preventDefault()
    let {newTitle} = Object.fromEntries(new FormData(event.target).entries())
    updateTodoTitle(document.todoOldTitle, newTitle)
    pubsub.publish('editTodoTitle', allTodos)
}

function renderRemoveEditTodoItem(event){
    let removeBttn = document.createElement('button')
    removeBttn.classList.add('removeItemButton')
    removeBttn.appendChild(document.createTextNode('X'))
    removeBttn.style.color = 'red'
    let editButton = document.createElement('button')
    editButton.classList.add('editItemButton')
    editButton.appendChild(document.createTextNode('EDIT'))
    editButton.style.color = 'blue'
    let buttonDiv = document.createElement('div')
    buttonDiv.classList.add('itemButtonDiv')
    buttonDiv.appendChild(editButton)
    buttonDiv.appendChild(removeBttn)
    event.target.appendChild(buttonDiv)
    editButton.addEventListener('click', editItem)
    removeBttn.addEventListener('click', removeItem)
}

function removeRemoveEditTodoItem(event){
    if (document.querySelector('.itemButtonDiv')){
        let buttonDiv = document.querySelector('.itemButtonDiv')
        buttonDiv.remove()
    }
}

function editItem(event){
    let todoInfoDom = event.target.parentNode.parentNode
    let todoInfo = JSON.parse(todoInfoDom.firstChild.textContent)
    document.currentTodoItemTitle = todoInfo.title

    let allItems = document.querySelectorAll('.mainDiv > ul > li')
    allItems.forEach((li) =>{
        li.removeEventListener('mouseenter', renderRemoveEditTodoItem)
        li.removeEventListener('mouseleave', removeRemoveEditTodoItem)
    })
    removeAddTodoItemButton()
    removeRemoveEditTodoItem(event)
    mainDiv.removeEventListener('mouseover', renderAddTodoItemButton)
    mainDiv.removeEventListener('mouseleave', removeAddTodoItemButton)

    let form = document.createElement('form')
    let titleInput = document.createElement('input')
    titleInput.type = 'text'
    titleInput.name = 'newTitle'
    titleInput.value = todoInfo.title
    titleInput.classList.add('titleInputForm')
    let descInput = document.createElement('input')
    descInput.type = 'text'
    descInput.name = 'newDesc'
    descInput.value = todoInfo.desc
    descInput.classList.add('descInputForm')
    let dueDateInput = document.createElement('input')
    dueDateInput.type = 'text'
    dueDateInput.name = 'newDate'
    dueDateInput.value = todoInfo.dueDate
    dueDateInput.classList.add('dueDateForm')
    let priorityInput = document.createElement('input')
    priorityInput.type = 'text'
    priorityInput.name = 'newPriority'
    priorityInput.value = todoInfo.priority
    priorityInput.classList.add('priorityInputForm')
    let sbtButton = document.createElement('input')
    sbtButton.type = 'submit'
    sbtButton.classList.add('itemSubmitButton')
    form.addEventListener('submit', submitEditItem)
    Array(titleInput, descInput, dueDateInput, priorityInput, sbtButton).forEach((formItem) => form.appendChild(formItem))
    todoInfoDom.replaceChild(form, todoInfoDom.firstChild)
}

pubsub.subscribe('editItem', clearTodoList)
pubsub.subscribe('editItem', renderTodoList)
pubsub.subscribe('editItem', ()=>{
    let allItems = document.querySelectorAll('.mainDiv > ul > li')
    allItems.forEach((li) =>{
        li.addEventListener('mouseenter', renderRemoveEditTodoItem)
        li.addEventListener('mouseleave', removeRemoveEditTodoItem)
    })
    mainDiv.addEventListener('mouseover', renderAddTodoItemButton)
    mainDiv.addEventListener('mouseleave', removeAddTodoItemButton)
})
function submitEditItem(event){
    event.preventDefault()
    let {newTitle, newDesc, newDate, newPriority} = Object.fromEntries(new FormData(event.target).entries())
    updateTodoList(document.currentTodoListTitle, document.currentTodoItemTitle, 'priority', newPriority)
    updateTodoList(document.currentTodoListTitle, document.currentTodoItemTitle, 'dueDate', newDate)
    updateTodoList(document.currentTodoListTitle, document.currentTodoItemTitle, 'desc', newDesc)
    updateTodoList(document.currentTodoListTitle, document.currentTodoItemTitle, 'title', newTitle)
    pubsub.publish('editItem', 'changingList')
}

pubsub.subscribe('removeItem', clearTodoList)
pubsub.subscribe('removeItem', renderTodoList)
function removeItem(event){
    let todoInfo = JSON.parse(event.target.parentNode.parentNode.firstChild.textContent)
    delTodoItem(document.currentTodoListTitle, todoInfo)
    pubsub.publish('removeItem', 'changingList')
}



let sideDiv = document.querySelector('.sideDiv')
let mainDiv = document.querySelector('.mainDiv')


renderTodoTitles(allTodos)