$(() =>{
    $('#btnCreate').on('click', createEntry);
    let baseUrl = 'https://paco-phones.firebaseio.com/';
    let url = baseUrl + '.json';
    loadContacts();
    function loadContacts(){
        let request = {
            url : url,
            success : displayPhones,
            error : displayError
        };
        $.ajax(request);
    }
    function displayPhones(contacts){
        //console.log(this);
        $('#disp').empty();
        for (const key in contacts) {
            //console.log(contacts[key]);
            let list = $(`<li>${contacts[key].name} - ${contacts[key].phone}</li>`);
            list.append($('<button>Delete</button>').on('click', () => deleteEntry(key)));
            list.appendTo('#disp');
        }
    }
    function deleteEntry(contact){
        //console.log(contact);
        let request = {
            url : `${baseUrl}/${contact}.json`,
            method : 'DELETE',
            success : loadContacts,
            error : displayError
        };
        $.ajax(request);
    }
    function createEntry() {
        let name = $('#name').val();
        let phone = $('#phone').val();
        let person = {
            name : name,
            phone : phone
        };
        //console.log(person);
        let req = {
            url : url,
            method : 'POST',
            data : JSON.stringify(person),
            success : loadContacts,
            error : displayError
        };
        $.ajax(req);
        
        
    }
    function displayError(err){
        $(`<p>${err.statusText}</p>`).appendTo($('#disp'));
    }
    
});