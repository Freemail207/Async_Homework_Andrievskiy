function getBookById(id) {
    document.getElementById('book').textContent = 'Please wait. Book is loading';

    fetch('api/books/' + id,
        {
            method: 'GET'
        })
        .then(function (response) {
            document.getElementById('book').textContent = response.name;
        })
        .catch(function (error) {
            document.getElementById('book').textContent = 'Error. Please refresh your browser';
        });
}
/////////////////
function loadPage(bookId) {
    document.getElementById('book').textContent = 'Please wait. Book is loading';
    document.getElementById('author').textContent = 'Please wait. Author details are loading';
    document.getElementById('similar').textContent = 'Please wait. Similar books are loading';

    fetch('api/books/' + id, {
        method: 'GET'
    }).then(function (response) {
        document.getElementById('book').textContent = response.name;
        return response;

    })
        .then(function (response) {
            fetch('api/autors' + response.authorId,
                {
                    method: 'GET'
                }).then(function (response) {
                    document.getElementById('author').textContent = response.name;
                    var similarBooksLoaded = 0;
                    var similarBooksAmount = response.books.lenght;
                    Promise.all(response.books.forEach(function (similarBookId) {
                        fetch('api/bestsellers/similar/' + similarBookId, {
                            method: 'GET'
                        }).then(function (response) {
                            var p = document.getElementById('similar').appendChild('p').textContent = response;
                            similarBooksLoaded += 1
                            if (similarBooksLoaded === similarBooksAmount) {
                                alert('Horray everything loaded');
                            }

                        });
                        return response;
                    }));
                    return response;
                })
        }).catch(function (error) {
            document.getElementById('book').textContent = 'Error. Please refresh your browser';
        });

}
