function loadRepos(){
    $('#repos').empty();
    let username = $('#username').val();
    let url = 'https://api.github.com/users/' + username + '/repos';
    let request = {
        url,
        success : displayRepos,
        error : displayError
    };
    $.ajax(request);
    function displayRepos(repos) {
        for (const repo of repos) {
            $(`<li><a href='${repo.html_url}'>${repo.full_name}</a></li>`).appendTo('#repos');
        }
    }
    function displayError(err) {
        $(`<div>${err.status} : ${err.statusText}</div>`).appendTo('#repos');
    }
}