function attachEvents(){
    //let author = $('#author').val();
    //let content = $('#content').val();
    //let timestamp = Date.now();
    
    let request = {
        url : 'https://messenger-efc06.firebaseio.com/.json',
        success : displaymessages

    };
    $.ajax(request);
    function displaymessages(messages) {
        for (const message in messages) {
            console.log(key + ' ' + messages[key]);
        }
    }
}