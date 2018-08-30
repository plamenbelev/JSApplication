function attachEvents(){
    let url = 'https://messenger-efc06.firebaseio.com/.json';
    $('#submit').click(submit);
    $('#refresh').click(refresh);
    let err;
    function submit(){
        let author = $('#author').val();
        let content = $('#content').val();
        let timestamp = Date.now();
        let body;
        if (author.length === 0) {
            err = $(`<div>Name can't be empty!</div>`).appendTo($('#main'));
            setTimeout(function(){ err.text(''); }, 3000);
            return;
        }
        if (content.length === 0) {
            err = $(`<div>Content can't be empty!</div>`).appendTo($('#main'));
            setTimeout(function(){ err.text(''); }, 3000);
            return;
        }
            
        body = {
            author,
            content,
            timestamp
        };
        
        let request = {
            url : url,
            method : 'POST',
            data : JSON.stringify(body),
            success : displayMessages,
            error : dispalyError
        };
        $.ajax(request);
        $('#author').val('');
        $('#content').val('');
    }
    function refresh(){
        let request = {
            url : url,
            success : displayMessages,
            error : dispalyError
        };
        $.ajax(request);
    }
    
    function displayMessages(){
        let request = {
            url : url,
            success : (data)=> {
                let posts = [];
                for (const key in data) {
                    posts.push(data[key]);
                }
                posts.sort( (x,y)=> {
                    return x.timestamp - y.timestamp;
                });
                let board = posts.map(x => `${x['author']}: ${x['content']}`).join('\n');
                //for (const post of posts) {
                //    //board.append((`<p>${post['author']}: ${post['content']}</p>`));
                //    //$('#messages').val(`${post['author']}: ${post['content']}`);
                //    board = 
                //    console.log(Object.keys(post));
                //}
                $('#messages').val(board);
            }
        };
        $.ajax(request);
    }
    function dispalyError(err){
        //console.log(err);
        let error = $(`<div>${err.statusText}</div>`).appendTo($('#main'));
        setTimeout(function(){ error.text(''); }, 3000);
    }
    
}