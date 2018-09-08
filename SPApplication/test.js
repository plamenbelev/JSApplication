console.log('Before promise');
new Promise(function(resolve, reject){
    console.log('Inside promise');
    setTimeout(function() {
        resolve('success');
    }, 0);
}).then(function(result){
    console.log(result);
})
console.log('After promise');