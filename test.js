let itemList = [{'first': '1', 'second': '2', 'third':'3'}, 
                {'first': '4', 'second': '5', 'third':'6'}, 
                {'first': '7', 'second': '8', 'third':'9'},]



let acumulator = ''
for(let i = 0; i <= itemList.length + 1; i++){

    if (i === 0) {
        acumulator += '{'
    } else if (i === itemList.length + 1){
        acumulator += '}'
    } else{
        for (const [objIndex, [key, value]] of Object.entries(Object.entries(itemList[i-1]))){
            console.log(objIndex, Object.entries(itemList[i-1]).length)
            if (i === itemList.length && Number(objIndex) + 1 === Object.entries(itemList[i-1]).length){
                acumulator += key + ':' + value
            } else{
                acumulator += key + ':' + value + ', '
            }
        }
    }
}

function addObjListToDiv(objList, divToAdd){
    for(let i = 0; i <= objList.length + 1; i++){

        if (i === 0) {
            // first add {
    
            let spanOpenBrackets = document.createElement('span')
            spanOpenBrackets.appendChild(document.createTextNode('{ '))
            spanOpenBrackets.classList.add('todoInfoOpenCloseBrackets')
            divToAdd.appendChild(spanOpenBrackets)
    
        } else if (i === objList.length + 1){
            // lastly add }
    
            let spanOpenBrackets = document.createElement('span')
            spanOpenBrackets.appendChild(document.createTextNode(' }'))
            spanOpenBrackets.classList.add('todoInfoOpenCloseBrackets')
            divToAdd.appendChild(spanOpenBrackets)
    
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
                    divToAdd.appendChild(spanTitleKey)
                    divToAdd.appendChild(spanTitleValue)
                } else{
    
                    let spanTitleKey = document.createElement('span')
                    spanTitleKey.appendChild(document.createTextNode(key + ': '))
                    spanTitleKey.classList.add('todoInfoKey')
                    let spanTitleValue = document.createElement('span')
                    spanTitleValue.appendChild(document.createTextNode(value + ', '))
                    spanTitleValue.classList.add('todoInfoValue')
                    divToAdd.appendChild(spanTitleKey)
                    divToAdd.appendChild(spanTitleValue)
                }
            }
        }
    }
}




console.log(acumulator);