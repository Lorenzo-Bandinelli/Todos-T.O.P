var allTodos = [
    {
      itemList: [{"title":1,"desc":2,"dueDate":3,"priority":4}, {"title":4,"desc":"oloco","dueDate":2,"priority":1}],
      itemListName: '_____itemList______ ' ,
      todoListId: 'TODOID'
    },
    {
      itemList: [{"title":"hello world","desc":"improve coding skills","dueDate":"anytime","priority":"--dont_care"}],
      itemListName: '______itemList1______ ',
      todoListId: 'TODOID'
    }
]

const todoItem = (title, desc, dueDate, priority) => {return {title, desc, dueDate, priority}}

const getTodoList = (todoListName, allTodos) => {
    let tempObj = allTodos.filter((element)=>element.itemListName === todoListName)
    return tempObj[0].itemList
    }

function createTodoList (todoListName){
    allTodos.push({
        itemList: [],
        itemListName: todoListName,
        todoListId: 'TODOID' 
    })
}

function addTodoToList(todoItem, todoListName){
    allTodos.forEach((todoList) => {
        if (todoList.itemListName === todoListName){
            todoList.itemList.push(todoItem)
        }
    })
}

function updateTodoList(todoListName, todoTitle ,changePropertyName, newValue){
    allTodos.forEach((todoList) => {
        if (todoList.itemListName === todoListName){
            let itemIndex = todoList.itemList.findIndex(todoItem => todoItem.title === todoTitle)
            todoList.itemList[itemIndex][changePropertyName] = newValue
        }
    });
}

function delTodoItem(todoListName, todoItem){
    let itemIndex = allTodos.findIndex(todoList => todoList.itemListName === todoListName)
    allTodos[itemIndex].itemList.splice(allTodos[itemIndex].itemList.indexOf(todoItem), 1)
}

function delTodoList(todoListName){
    let todoListIndex = allTodos.findIndex(todoList => todoList.itemListName === todoListName)
    allTodos.splice(todoListIndex, 1)
}

function updateTodoTitle(todoOldTitle, todoNewTitle){
    let todoListIndex = allTodos.findIndex(todoList => todoList.itemListName === todoOldTitle)
    allTodos[todoListIndex].itemListName = todoNewTitle
}

// let item = todoItem(1,2,3,4)
// let item1 = todoItem('hello world', 'improve coding skills', 'anytime', '--dont_care')
// let item2 = todoItem(4,3,2,1)
// createTodoList('itemList')
// createTodoList('itemList1')
// addTodoToList(item, 'itemList')
// addTodoToList(item2, 'itemList')
// addTodoToList(item1, 'itemList1')
// updateTodoList('itemList', 4 ,'desc', 'oloco')
// // delTodoItem('itemList', item2)
// // delTodoList('itemList')
// console.log(allTodos);
// console.log(JSON.stringify(item));
// console.log(JSON.stringify(item1));
// console.log(JSON.stringify(item2));

// console.log(JSON.stringify(allTodos));
// updateTodoTitle('______itemList1______ ', '___NewTitle__')
// console.log(JSON.stringify(allTodos));

export {todoItem, getTodoList, createTodoList, addTodoToList, updateTodoList, delTodoItem, delTodoList, updateTodoTitle,allTodos}