const feedDisplay = document.querySelector('#feed');

fetch('http://localhost:3000/results')
.then((res) => {
    res.json().then((data) => {
        console.log(data);
        data.forEach(article => {
            const title = document.createElement('h3');
            title.textContent = article.title;

            const link = document.createElement('a');
            link.textContent = "Link"
            link.setAttribute("href", article.link);
            
            feedDisplay.append(title, link);
        })
    })
})