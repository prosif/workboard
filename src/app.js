const board = document.getElementById('board');

board.addEventListener('mousedown', () => {
    const randomString = Math.random().toString(36);
    window.location.replace('https://github.com/login/oauth/authorize?client_id=' + clientId + '&state=' + randomString);
});

const params = new URLSearchParams(location.search);

const makePost = (url, data, cb) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.onreadystatechange = () => {
        if (xhr.readystate > 3 && xhr.status == 200) {
            cb && cb(xhr.responseText);
	}
    };
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
    return xhr;
};

if (params.get('code')) {
    console.log('github code');
    console.log(params.get('code'));
//    makePost(url, {'ayy': 'lmao'}, (data) => {
//        console.log('hello');
//	console.log(data);
//    });
}
