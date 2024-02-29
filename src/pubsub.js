// my take on implementing a pubsub function 

const pubsub = (function(){
    const events = {}
    const subscribe = function(evName, evTask){
        events[evName] = (events[evName] || [])
        events[evName].push(evTask)
    }
    const publish = function(evName, evValue){
        if (events[evName]){
            events[evName].forEach(task => {task(evValue)});
        }
    }
    return {subscribe, publish, events}
})()


//function sumAll(nList){
//     const initialValue = 0
//     const summedValues = nList.reduce((accumulator, currentValue)=>{
//         return accumulator + currentValue
//     }, initialValue)
//     console.log(summedValues);
// }

// pubsub.subscribe('Log', (logVal) => console.log(logVal))
// pubsub.subscribe('Log', (logVal) => console.log(logVal + ' second subscribed'))
// pubsub.publish('Log', 'publishing1')

// pubsub.subscribe('summing', sumAll)
// pubsub.publish('summing', [1,2,3,4,5])


export {pubsub}