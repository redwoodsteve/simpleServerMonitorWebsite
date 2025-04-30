var topbarHeight = document.getElementById("topBar").clientHeight;
var tbHeight = document.getElementById("themeButton").clientHeight;
document.getElementById("dashboard").style.marginTop = topbarHeight + "px";
document.getElementById("dashboard").style.top = topbarHeight + "px";
document.getElementById("themeButton").style.top = ((topbarHeight / 2) - (tbHeight / 2)).toString() + "px"
console.log(((topbarHeight / 2) - (tbHeight / 2)).toString());