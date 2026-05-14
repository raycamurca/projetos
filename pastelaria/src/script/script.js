// Trocar entre temas

let theme = null;
const icon = document.querySelector("#theme");

icon.addEventListener("click", evt => {
  loadTheme(evt.target.classList.contains("fa-moon") ? "dark" : "light");
});

function loadTheme(iconTheme){
    theme = iconTheme;
    if(iconTheme === "dark"){
        document.body.classList.add(iconTheme);
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    } else {
        document.body.classList.remove("dark");
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    }
    saveLocalStorage();
    return
}

function saveLocalStorage(){
    localStorage.setItem("theme", theme);
}

function loadLocalStorage(){
    const savedTheme = localStorage.getItem("theme");
    if(!savedTheme) return;
    theme = savedTheme;
    loadTheme(theme);
}

loadLocalStorage();