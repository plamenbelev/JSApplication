function loadCommits(){
    let username = $('#username').val();
    let repo = $('#repo').val();

    url = `https://api.github.com/repos/${username}/${repo}/commits`;
    let request = {
        url,
        success : displayCommits,
        error : handleError
    }
    $.ajax(request);
    let commitsList = $('#commits');
    function displayCommits(res) {
        
        commitsList.empty();
        for (const commit of res) {
            commitsList.append(`<li>${commit.commit.author.name}: ${commit.commit.message}</li>`);
        }
    }
    function handleError(err) {
        commitsList.empty();
        commitsList.append(`<li>Error: ${err.status} (${err.statusText})</li>`)
    }
}