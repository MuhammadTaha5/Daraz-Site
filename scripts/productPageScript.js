const params = new URLSearchParams(window.location.search)

const title = params.get("title")
const price = params.get("price")
const img = params.get("img")

document.querySelector("h1#productName").textContent = title
document.getElementById("mainProductImg").src = "assets/" + img
document.getElementById("discPrice").textContent = "Rs. " +price
document.getElementById("hookImg").src = "assets/" + img



document.getElementById("arrowLeft").addEventListener("click", ()=>{
    console.log("hello")
    const container = document.getElementById("thumbContainer");
    console.log("Scroll clicked");
    container.scrollLeft += -1 * 150;
})
document.getElementById("arrowRight").addEventListener("click", ()=>{
    console.log("hello")
    const container = document.getElementById("thumbContainer");
    console.log("Scroll clicked");
    container.scrollLeft += 1 * 150;
})

window.changeImage = function(img){
    document.getElementById("mainProductImg").src = img.src;
    
}
let mainProductImg = document.getElementById("mainProductImg");

let optionImagesVartants = document.getElementById("optionImagesVartants");
let optionimgs = optionImagesVartants.querySelectorAll("img");

for(let i = 0; i<optionimgs.length; i++){
    optionimgs[i].addEventListener("mouseover", ()=>{
        mainProductImg.setAttribute("src", optionimgs[i].getAttribute("src"))
    })
}

let productQuantity = document.getElementById("productQuantity")
let minus = document.getElementById("minus")
let add = document.getElementById("add")

add.addEventListener("click", ()=>{
    valueQuantity = parseInt(productQuantity.value) + 1
    productQuantity.value = valueQuantity;
})

minus.addEventListener("click", ()=>{
    
    if(productQuantity.value>1){
        valueQuantity = parseInt(productQuantity.value) - 1
        productQuantity.value = valueQuantity;
        
    }
})

document.getElementById("mainProductImg").addEventListener("mouseover", ()=>{
    imageZoom("mainProductImg", "myresult");
})
function imageZoom(imgID, resultID) {

  var img, lens, result, cx, cy;
  img = document.getElementById(imgID);
  result = document.getElementById(resultID);
  /* Create lens: */
  lens = document.createElement("DIV");
  lens.setAttribute("class", "img-zoom-lens");
  /* Insert lens: */
  img.parentElement.insertBefore(lens, img);
  /* Calculate the ratio between result DIV and lens: */
  cx = result.offsetWidth / lens.offsetWidth;
  cy = result.offsetHeight / lens.offsetHeight;
  /* Set background properties for the result DIV */
  result.style.backgroundImage = "url('" + img.src + "')";
  result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
  /* Execute a function when someone moves the cursor over the image, or the lens: */
  lens.addEventListener("mousemove", moveLens);
  img.addEventListener("mousemove", moveLens);
  /* And also for touch screens: */
  lens.addEventListener("touchmove", moveLens);
  img.addEventListener("touchmove", moveLens);
  img.addEventListener("mouseleave", ()=>{
    document.querySelector(".img-zoom-result").style.visibility = "hidden";
  })
  function moveLens(e) {
    document.querySelector(".img-zoom-result").style.visibility = "visible";
    var pos, x, y;
    /* Prevent any other actions that may occur when moving over the image */
    e.preventDefault();
    /* Get the cursor's x and y positions: */
    pos = getCursorPos(e);
    /* Calculate the position of the lens: */
    x = pos.x - (lens.offsetWidth / 2);
    y = pos.y - (lens.offsetHeight / 2);
    /* Prevent the lens from being positioned outside the image: */
    if (x > img.width - lens.offsetWidth) {x = img.width - lens.offsetWidth;}
    if (x < 0) {x = 0;}
    if (y > img.height - lens.offsetHeight) {y = img.height - lens.offsetHeight;}
    if (y < 0) {y = 0;}
    /* Set the position of the lens: */
    lens.style.left = x + "px";
    lens.style.top = y + "px";
    /* Display what the lens "sees": */
    result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
  }
  function getCursorPos(e) {
    var a, x = 0, y = 0;
    e = e || window.event;
    /* Get the x and y positions of the image: */
    a = img.getBoundingClientRect();
    /* Calculate the cursor's x and y coordinates, relative to the image: */
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /* Consider any page scrolling: */
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return {x : x, y : y};
  }
  
}

