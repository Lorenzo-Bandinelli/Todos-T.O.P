let itemList = [{'first': '1', 'second': '2', 'third':'3'}, 
                {'first': '4', 'second': '5', 'third':'6'}, 
                {'first': '7', 'second': '8', 'third':'9'},]



let acumulator = ''

function addObjListToDiv(objList, divToAdd){
    for(let i = 0; i < objList.length; i++){
        // if (i === 0) {
        //     // when entering the loop, do somethiing
        //     acumulator += '['
        // } else if (i === objList.length + 1){
        //     // when leaving the loop, do something
        //     acumulator += ']'
        // } else{
        let li = document.createElement('li')
        li.classList.add('todoItem')
        let textDiv = document.createElement('div')
        textDiv.classList.add('todoItemInfo')
        
        for (const [objIndex, [key, value]] of Object.entries(Object.entries(objList[i]))){
            let entered = false
            if (Number(objIndex) === 0){
                //first key value pair

                let spanOpenBrackets = document.createElement('span')
                spanOpenBrackets.appendChild(document.createTextNode('{ '))
                spanOpenBrackets.classList.add('todoInfoOpenCloseBrackets')
                textDiv.appendChild(spanOpenBrackets)

                let spanTitleKey = document.createElement('span')
                spanTitleKey.appendChild(document.createTextNode(key + ': '))
                spanTitleKey.classList.add('todoInfoKey')
                let spanTitleValue = document.createElement('span')
                spanTitleValue.appendChild(document.createTextNode(value + ', '))
                spanTitleValue.classList.add('todoInfoValue')
                textDiv.appendChild(spanTitleKey)
                textDiv.appendChild(spanTitleValue)

                entered = true
            }
            if (Number(objIndex) + 1 === Object.entries(objList[i]).length){
                //last key value pair

                let spanTitleKey = document.createElement('span')
                spanTitleKey.appendChild(document.createTextNode(key + ': '))
                spanTitleKey.classList.add('todoInfoKey')
                let spanTitleValue = document.createElement('span')
                spanTitleValue.appendChild(document.createTextNode(value))
                spanTitleValue.classList.add('todoInfoValue')
                textDiv.appendChild(spanTitleKey)
                textDiv.appendChild(spanTitleValue)
                
                let spanOpenBrackets = document.createElement('span')
                spanOpenBrackets.appendChild(document.createTextNode(' }'))
                spanOpenBrackets.classList.add('todoInfoOpenCloseBrackets')
                textDiv.appendChild(spanOpenBrackets)

                li.appendChild(textDiv)
                divToAdd.appendChild(li)
                entered = true
            } 
            if(!entered){
                //any other key value pair
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
    // }
}

for(let i = 0; i < itemList.length; i++){
    // if (i === 0) {
    //     // when entering the loop, do somethiing
    //     acumulator += '['
    // } else if (i === itemList.length + 1){
    //     // when leaving the loop, do something
    //     acumulator += ']'
    // } else{
        console.log(itemList[i]);
        for (const [objIndex, [key, value]] of Object.entries(Object.entries(itemList[i]))){
            let entered = false
            if (Number(objIndex) === 0){
                //first key value pair

                acumulator += '{'
                acumulator += key + ':' + value + ', '
                entered = true
            }
            if (Number(objIndex) + 1 === Object.entries(itemList[i]).length){
                //last key value pair

                acumulator += key + ':' + value
                acumulator += '}'
                entered = true
            } 
            if(!entered){
                //any other key value pair
                acumulator += key + ':' + value + ', '
            }
        }
    }
// }

// function addObjListToDiv(objList, divToAdd){
//     for(let i = 0; i <= objList.length + 1; i++){

//         if (i === 0) {
//             // first add {
    
//             let spanOpenBrackets = document.createElement('span')
//             spanOpenBrackets.appendChild(document.createTextNode('{ '))
//             spanOpenBrackets.classList.add('todoInfoOpenCloseBrackets')
//             divToAdd.appendChild(spanOpenBrackets)
    
//         } else if (i === objList.length + 1){
//             // lastly add }
    
//             let spanOpenBrackets = document.createElement('span')
//             spanOpenBrackets.appendChild(document.createTextNode(' }'))
//             spanOpenBrackets.classList.add('todoInfoOpenCloseBrackets')
//             divToAdd.appendChild(spanOpenBrackets)
    
//         } else{
    
//             for (const [objIndex, [key, value]] of Object.entries(Object.entries(objList[i-1]))){
                
                
//                 console.log(objIndex, Object.entries(objList[i-1]).length)
//                 if (i === objList.length && Number(objIndex) + 1 === Object.entries(objList[i-1]).length){
//                     // dont add ',' in the last one 
                    
//                     let spanTitleKey = document.createElement('span')
//                     spanTitleKey.appendChild(document.createTextNode(key + ': '))
//                     spanTitleKey.classList.add('todoInfoKey')
//                     let spanTitleValue = document.createElement('span')
//                     spanTitleValue.appendChild(document.createTextNode(value))
//                     spanTitleValue.classList.add('todoInfoValue')
//                     divToAdd.appendChild(spanTitleKey)
//                     divToAdd.appendChild(spanTitleValue)
//                 } else{
    
//                     let spanTitleKey = document.createElement('span')
//                     spanTitleKey.appendChild(document.createTextNode(key + ': '))
//                     spanTitleKey.classList.add('todoInfoKey')
//                     let spanTitleValue = document.createElement('span')
//                     spanTitleValue.appendChild(document.createTextNode(value + ', '))
//                     spanTitleValue.classList.add('todoInfoValue')
//                     divToAdd.appendChild(spanTitleKey)
//                     divToAdd.appendChild(spanTitleValue)
//                 }
//             }
//         }
//     }
// }




console.log(acumulator);