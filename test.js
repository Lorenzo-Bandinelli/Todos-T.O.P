//working aaaaaaaaaaa

let a = '{title: 1, desc: 2, dueDate: 3, priority: 4}'
const regex = /(\w+)/g
let b = a.replace(regex,  "\"$1\"")

let c = JSON.parse(b)

console.log(b);