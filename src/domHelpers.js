// const todoList = [
//     {
//       title: 'hello world',
//       desc: 'improve coding skills',
//       dueDate: 'anytime',
//       priority: '--dont_care'
//     }
// ]

import {todoItem, getTodoList, createTodoList, addTodoToList, updateTodoList, delTodoItem, delTodoList, allTodos, updateTodoTitle, getAllItemTitles, getAllListTitles} from './todoList.js'
import {pubsub} from './pubsub.js'
import {parse as dateParse, format as dateFormat} from 'date-fns'
import './style.css'
import deleteIcon from './delete-1-svgrepo-com.svg'
import editIcon from './edit-svgrepo-com.svg'

function addObjListToDiv(objList, divToAdd){
    let li = document.createElement('li')
    li.classList.add('todoItem')
    let textDiv = document.createElement('div')
    textDiv.classList.add('todoItemInfo')
    for(let i = 0; i <= objList.length + 1; i++){
        if (i === 0) {
            // first add {
    
            let spanOpenBrackets = document.createElement('span')
            spanOpenBrackets.appendChild(document.createTextNode('{ '))
            spanOpenBrackets.classList.add('todoInfoOpenCloseBrackets')
            textDiv.appendChild(spanOpenBrackets)
    
        } else if (i === objList.length + 1){
            // lastly add }
    
            let spanOpenBrackets = document.createElement('span')
            spanOpenBrackets.appendChild(document.createTextNode(' }'))
            spanOpenBrackets.classList.add('todoInfoOpenCloseBrackets')
            textDiv.appendChild(spanOpenBrackets)
    
        } else{
    
            for (const [objIndex, [key, value]] of Object.entries(Object.entries(objList[i-1]))){
                
                
                console.log(objIndex, Object.entries(objList[i-1]).length)
                if (i === objList.length && Number(objIndex) + 1 === Object.entries(objList[i-1]).length){
                    // dont add ',' in the last one 
                    
                    let spanTitleKey = document.createElement('span')
                    spanTitleKey.appendChild(document.createTextNode(key + ': '))
                    spanTitleKey.classList.add('todoInfoKey')
                    let spanTitleValue = document.createElement('span')
                    spanTitleValue.appendChild(document.createTextNode(value))
                    spanTitleValue.classList.add('todoInfoValue')
                    textDiv.appendChild(spanTitleKey)
                    textDiv.appendChild(spanTitleValue)
                } else{
    
                    let spanTitleKey = document.createElement('span')
                    spanTitleKey.appendChild(document.createTextNode(key + ': '))
                    spanTitleKey.classList.add('todoInfoKey')
                    let spanTitleValue = document.createElement('span')
                    spanTitleValue.appendChild(document.createTextNode(value + ', '))
                    spanTitleValue.classList.add('todoInfoValue')
                    textDiv.appendChild(spanTitleKey)
                    textDiv.appendChild(spanTitleValue)
                }
            }
        }
    }
    li.appendChild(textDiv)
    divToAdd.appendChild(li)
}

function renderTodoList(event){
    if (event === 'changingList' || event.target.classList.contains('todoGroup')){
        clearTodoList(event)
        if (event !== 'changingList'){
            document.currentTodoListTitle = event.target.textContent
        }
        let todoList = getTodoList(document.currentTodoListTitle, allTodos) 
        let todoListDom = document.querySelector('.todoList')
        if(todoList.length === 0){
            renderAddTodoItemButton(event)
            try {
                mainDiv.removeEventListener('mouseleave', removeAddTodoItemButton)
            } catch (error) {
                console.log(error);
            }
            return
        }
        addObjListToDiv(todoList, todoListDom)
    }
    mainDiv.addEventListener('mouseover', renderAddTodoItemButton)
    mainDiv.addEventListener('mouseleave', removeAddTodoItemButton)
    let allItems = document.querySelectorAll('.mainDiv > ul > li')
    allItems.forEach((li) =>{
        li.addEventListener('mouseenter', renderRemoveEditTodoItem)
        li.addEventListener('mouseleave', removeRemoveEditTodoItem)
    })
}

function updateLocalStorage(){
    console.log('im updt local storage')
    localStorage.setItem('allTodos', JSON.stringify(allTodos))
    allTodos = JSON.parse(localStorage.getItem('allTodos'))
}

function isValidItemTitle(itemTitle){
    if (getAllItemTitles(document.currentTodoListTitle, allTodos).includes(itemTitle)){
        return false
    } else {
        return true
    }
}

function isValidListTitle(listTitle){
    if (getAllListTitles(allTodos).includes(listTitle)){
        return false
    } else {
        return true
    }
}

function isValidItemInput(ArrayOfValues){
    if(ArrayOfValues.some((element) => {return element.includes(',') || element.includes('}') || element.includes('{')})){
        return false
    } else {
        return true
    }
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
        let addButton = document.createElement('button')
        let buttonDiv = document.createElement('div')
        buttonDiv.classList.add('addTodoTitleButton')
        addButton.classList.add('addButton')
        addButton.appendChild(document.createTextNode('ADD NEW'))
        buttonDiv.appendChild(addButton)
        sideDiv.appendChild(buttonDiv)
        if (addButton){
            addButton.addEventListener('click', addNewTodoList)
        }
    }
}

function removeAddTodoTitleButton(event){
    if (document.querySelector('.sideDiv > .addTodoTitleButton')){
        let addButton = document.querySelector('.sideDiv > .addTodoTitleButton')
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
pubsub.subscribe('submitNewTodoList', updateLocalStorage)
pubsub.subscribe('submitNewTodoList', () => {
    sideDiv.addEventListener('mouseenter', renderAddTodoTitleButton)
    sideDiv.addEventListener('mouseleave', removeAddTodoTitleButton)
})
function submitNewTodoList(event){
    event.preventDefault()
    let formData = Object.fromEntries(new FormData(event.target).entries())
    if(!isValidListTitle(formData.todoListName)){
        alert('Title Name Must be UNIQUE !!')
        return
    }
    createTodoList(formData.todoListName)
    pubsub.publish('submitNewTodoList', allTodos)
}

function renderAddTodoItemButton(event){
    if (!document.querySelector('.mainDiv > .addButton') && !document.querySelector('.mainDiv > form') && document.currentTodoListTitle){
        let addButton = document.createElement('button')
        addButton.classList.add('addButton')
        addButton.appendChild(document.createTextNode('ADD NEW'))
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
    formDuedate.type = 'date'
    formDuedate.name = 'todoDuedate'
    formDuedate.placeholder = 'Due Date'
    let dateFormLabel = document.createElement('label')
    dateFormLabel.for = 'todoDuedate'
    dateFormLabel.appendChild(document.createTextNode('Due Date'))
    let formPriority = document.createElement('input')
    formPriority.type = 'text'
    formPriority.name = 'todoPriority'
    formPriority.placeholder = 'Priority'
    let sbtButton = document.createElement('input')
    sbtButton.type = 'submit'
    Array(formTitle, formDesc, dateFormLabel ,formDuedate, formPriority ,sbtButton).forEach(element => form.appendChild(element))
    mainDiv.appendChild(form)
    form.addEventListener('submit', submitNewTodoItem)
}

pubsub.subscribe('submitNewTodoItem', clearTodoList)
pubsub.subscribe('submitNewTodoItem', renderTodoList)
pubsub.subscribe('submitNewTodoItem', updateLocalStorage)
pubsub.subscribe('submitNewTodoItem', ()=> {
    mainDiv.addEventListener('mouseover', renderAddTodoItemButton)
    mainDiv.addEventListener('mouseleave', removeAddTodoItemButton)
})
function submitNewTodoItem(event){
    event.preventDefault()
    let {todoTitle, todoDesc, todoDuedate, todoPriority} = Object.fromEntries(new FormData(event.target).entries())
    if(!isValidItemTitle(todoTitle)){
        alert('Item Titles Must Be Unique!!')
        return
    }

    if(!isValidItemInput(Array(todoTitle, todoDesc, todoDuedate, todoPriority))){
        alert('items cannot have " { } ," characters')
        return
    }
    todoDuedate = dateParse(todoDuedate, 'yyyy-mm-dd', new Date())
    todoDuedate = dateFormat(todoDuedate, 'dd/mm/yyyy')
    addTodoToList(todoItem(todoTitle, todoDesc, todoDuedate, todoPriority), document.currentTodoListTitle)
    pubsub.publish('submitNewTodoItem', 'changingList')
}

function renderRemoveEditTitleButton(event){
    let removeBttn = document.createElement('button')
    removeBttn.classList.add('removeTitleButton')
    let removeBttnIcon = document.createElement('img')
    removeBttnIcon.src = deleteIcon
    removeBttn.appendChild(removeBttnIcon)
    let editButton = document.createElement('button')
    editButton.classList.add('editTitleButton')
    let editBttnIcon = document.createElement('img')
    editBttnIcon.src = editIcon
    editButton.appendChild(editBttnIcon)
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
pubsub.subscribe('removeTodoTitle', updateLocalStorage)
function removeTodoTitle(event){
    delTodoList(event.target.textContent)
    pubsub.publish('removeTodoTitle', allTodos)
}

function editTodoTitle(event){
    let inlineDiv = event.target.parentNode.parentNode.parentNode
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
pubsub.subscribe('editTodoTitle', updateLocalStorage)
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
    if(newTitle != document.todoOldTitle && !isValidListTitle(newTitle)){
        alert('Title Name Must be UNIQUE !!')
        return
    }
    if(document.currentTodoListTitle === document.todoOldTitle){
        document.currentTodoListTitle = newTitle
    }
    updateTodoTitle(document.todoOldTitle, newTitle)
    pubsub.publish('editTodoTitle', allTodos)
}

function renderRemoveEditTodoItem(event){
    let removeBttn = document.createElement('button')
    removeBttn.classList.add('removeItemButton')
    let editButton = document.createElement('button')
    editButton.classList.add('editItemButton')
    let editBttnIcon = document.createElement('img')
    editBttnIcon.src = editIcon
    editButton.appendChild(editBttnIcon)
    let removeBttnIcon = document.createElement('img')
    removeBttnIcon.src = deleteIcon
    removeBttn.appendChild(removeBttnIcon)
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

function getTodoItemObject(parentElement){
    let todoItemObject = Array.from(parentElement.children).reduce((preValue, currValue) => {
        if (currValue.classList.contains('itemButtonDiv')){
            return preValue.textContent + ''
        } else {
            return preValue.textContent + currValue.textContent
        }
        })
    const regex = /(?<=[:|{|,]).*?(?=[,|}:])/g
    todoItemObject = todoItemObject.replace('due date', 'dueDate')
    todoItemObject = todoItemObject.replace(regex,  '\"$&\"')
    todoItemObject = todoItemObject.replace(/(\\)?"\s*|\s+"/g, ($0, $1) => $1 ? $0 : '"')
    return todoItemObject;
}

function editItem(event){
    let todoInfoDom = event.target.parentNode.parentNode;
    if (!todoInfoDom.classList.contains('todoItem')){
        todoInfoDom = todoInfoDom.parentNode
    }
    let todoInfo = JSON.parse(getTodoItemObject(todoInfoDom))
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
    descInput.value = todoInfo.description
    descInput.classList.add('descInputForm')
    let dueDateInput = document.createElement('input')
    dueDateInput.type = 'date'
    dueDateInput.name = 'newDate'

    try {
        let date = dateParse(todoInfo.dueDate, 'dd/mm/yyyy', new Date())
        date = dateFormat(date, 'yyyy-mm-dd')
        dueDateInput.value = date
    } catch (error) {
        dueDateInput.value = todoInfo.dueDate
    }
    

    dueDateInput.classList.add('dueDateForm')
    let dateInputLabel = document.createElement('label')
    dueDateInput.for = 'newDate'
    dateInputLabel.appendChild(document.createTextNode('Due Date'))
    let priorityInput = document.createElement('input')
    priorityInput.type = 'text'
    priorityInput.name = 'newPriority'
    priorityInput.value = todoInfo.priority
    priorityInput.classList.add('priorityInputForm')
    let sbtButton = document.createElement('input')
    sbtButton.type = 'submit'
    sbtButton.classList.add('itemSubmitButton')
    form.addEventListener('submit', submitEditItem)
    Array(titleInput, descInput, dateInputLabel, dueDateInput, priorityInput, sbtButton).forEach((formItem) => form.appendChild(formItem))
    todoInfoDom.replaceChild(form, todoInfoDom.firstChild)
}

pubsub.subscribe('editItem', clearTodoList)
pubsub.subscribe('editItem', renderTodoList)
pubsub.subscribe('editItem', updateLocalStorage)
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
    if(newTitle != document.currentTodoItemTitle && !isValidItemTitle(newTitle)){
        alert('Item Titles Must Be Unique!!')
        return
    }
    if(!isValidItemInput(Array(newTitle, newDesc, newDate, newPriority))){
        alert('items cannot have " { } ," characters')
        return
    }
    newDate = dateParse(newDate, 'yyyy-mm-dd', new Date())
    newDate = dateFormat(newDate, 'dd/mm/yyyy' )
    updateTodoList(document.currentTodoListTitle, document.currentTodoItemTitle, 'priority', newPriority)
    updateTodoList(document.currentTodoListTitle, document.currentTodoItemTitle, 'dueDate', newDate)
    updateTodoList(document.currentTodoListTitle, document.currentTodoItemTitle, 'desc', newDesc)
    updateTodoList(document.currentTodoListTitle, document.currentTodoItemTitle, 'title', newTitle)
    pubsub.publish('editItem', 'changingList')
}

pubsub.subscribe('removeItem', clearTodoList)
pubsub.subscribe('removeItem', renderTodoList)
pubsub.subscribe('removeItem', updateLocalStorage)
function removeItem(event){
    let todoInfoDom = event.target.parentNode.parentNode
    if (!todoInfoDom.classList.contains('todoItem')){
        todoInfoDom = todoInfoDom.parentNode
    }
    let todoInfo = JSON.parse(getTodoItemObject(todoInfoDom))
    
    delTodoItem(document.currentTodoListTitle, todoInfo)
    pubsub.publish('removeItem', 'changingList')
}



let sideDiv = document.querySelector('.sideDiv')
let mainDiv = document.querySelector('.mainDiv')

try {
    if(localStorage.getItem('allTodos')){
        allTodos = JSON.parse(localStorage.getItem('allTodos'))
    }
} catch (error) {
    console.log(error);
    updateLocalStorage()
}

renderTodoTitles(allTodos)