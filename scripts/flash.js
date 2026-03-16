let cardFsContent = document.getElementsByClassName("cardFsContent")[0];
let cards =  cardFsContent.querySelectorAll(".cards a");
for(let i =0; i<cards.length; i++)
{
    let fsProductTitle =  cards[i].querySelector("#fsProductTitle").textContent;
    let fsProductPrice = cards[i].querySelector("#fsProductPrice").textContent;
    
    let fsProductImgLink = cards[i].querySelector("#fsProductImgLink").getAttribute("src");
    fsProductImgLink = fsProductImgLink.replace("assets/", "");
    console.log(fsProductImgLink)
    
 cards[i].setAttribute("href", `productPage.html?title=${encodeURIComponent(fsProductTitle)}&price=${fsProductPrice}&img=${fsProductImgLink}`);
cards[i].style.color = "inherit";
cards[i].style.textDecoration = "none";
}