apiKey = "ce1bfd64e5a948879f38f3d09de15f5c";
url = "https://newsapi.org/v2/everything?q=";

function reload(){
    window.location.reload();
}

window.addEventListener("load",()=>fetchNews('India'));

async function fetchNews(query){
    const response = await fetch(`${url}${query}&apiKey=${apiKey}`);
    const data = await response.json();
    fillDataInCard(data.articles);
}
fillDataInCard = articles => {
    const cardContainer = document.getElementById("card-container")
    const newsCardTemplate = document.getElementById("news-card");
    cardContainer.innerHTML = "";
    articles.forEach(article => {
        if(!article.urlToImage) return; 
        const cardClone = newsCardTemplate.content.cloneNode(true);
        const newsImage = cardClone.getElementById("news-img")
        const newsTitle = cardClone.getElementById("news-title");
        const newsAuthorWithDate = cardClone.getElementById("news-author-with-date");
        const newDescription = cardClone.getElementById("description")
        newsImage.src = article.urlToImage;
        newsTitle.innerHTML = article.title;
        let date = new Date(article.publishedAt).toDateString()
        newsAuthorWithDate.innerHTML = `-${article.source.name}, ${date}`;
        newDescription.innerHTML = article.description
        cardClone.getElementById("card").addEventListener('click',()=>{
            window.open(article.url,"__blank")
        });
        cardContainer.appendChild(cardClone);
        })
}

const searchButton = document.getElementById("search-button");
searchButton.addEventListener('click',()=>{
    const searchText = document.getElementById("search-input").value;
    fetchNews(searchText)
    console.log("hi",searchText);
})

let selectedNavItem = null;

function navSearch(id){
    fetchNews(id);
    const navItem  = document.getElementById(id);
    selectedNavItem?.classList.remove('active');
    selectedNavItem = navItem;
    navItem.classList.add('active');
    console.log("clicked");
}