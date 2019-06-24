window.addEventListener("load", function() {
    let options = this.document.getElementsByClassName("track-options");
    options.addEventListener("click", function () {
         options.classList.toggle("change");
         if (options.lastChild.style.display === "none") {
             options.lastChild.style.display = "block";
         } else {
            options.lastChild.style.display = "none";
         }
    });
});


const showModal = (modal) => {
    
}