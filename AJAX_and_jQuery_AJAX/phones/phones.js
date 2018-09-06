function attachEvents(){
    let baseUrl = 'https://paco-phones.firebaseio.com/';
    $('#btnLoad').click(loadPhones);
    $('#btnCreate').click(createEntry);
    loadPhones();
    let error;
    function loadPhones(){
        let list = $('#phonebook');
        list.empty();
        let request = {
            url : baseUrl + '.json',
            success : (data) => {
                for (const person in data) {
                    list.append($(`<li>${data[person]['name']}: ${data[person]['phone']}</li>`).append($('<button>Delete</button>').on('click', deleteEntry.bind(person)) ) );
                }
            },
            error : displayError
        };
        $.ajax(request);

    }
    function deleteEntry(){

        let url = `${baseUrl}${this}.json`;
        let request = {
            url : url,
            method : 'DELETE',
            success : loadPhones,
            error : displayError
        };
        $.ajax(request);
    }
    function createEntry(){
        let url = baseUrl + '.json';
        let name = $('#person').val();
        let phone = $('#phone').val();
        if (name.length === 0) {
            error = $('<div>Name can not be empty!</div>').appendTo($('html'));
            setTimeout(function(){ error.text(''); }, 3000);
            return;
        }
        if (phone.length === 0) {
            error = $('<div>Phone can not be empty!</div>').appendTo($('html'));
            setTimeout(function(){ error.text(''); }, 3000);
            return;
        }
        let body = {
            name ,
            phone
        };
        let request = {
            url : url,
            method : 'POST',
            data : JSON.stringify(body),
            success : loadPhones,
            error : displayError,
        };
        $.ajax(request);
    }
    function displayError(err){
        error = $(`<div>${err.statusText}</div>`).appendTo($('html'));
        setTimeout(function(){ error.text(''); }, 3000);
    }
    
}