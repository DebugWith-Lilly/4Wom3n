function updateTime() {
    const now = new Date();

    const time = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    document.getElementById("time").textContent = time;
}

updateTime();
setInterval(updateTime, 1000);

// ===============================
// PAIN MAP
// ===============================

// Body container
const bodyContainer = document.getElementById("bodyContainer");

// Selected colour (default = No Pain)
let selectedColor = "#EBDAB8";

// Pain colours
const colours = {
    "no-pain-item": "#EBDAB8",
    "mild-item": "#F4B24F",
    "moderate-item": "#E67E22",
    "severe-item": "#D62828"
};

// Select a pain level 
document.querySelectorAll(".legend-item").forEach(item => {

    item.addEventListener("click", () => {

        // Remove previous selection
        document.querySelectorAll(".legend-item").forEach(i => {
            i.classList.remove("selected");
        });

        // Highlight selected item (G)
        item.classList.add("selected");

        // Set selected colour 
        if(item.classList.contains("no-pain-item"))
            selectedColor = colours["no-pain-item"];

        if(item.classList.contains("mild-item"))
            selectedColor = colours["mild-item"];

        if(item.classList.contains("moderate-item"))
            selectedColor = colours["moderate-item"];

        if(item.classList.contains("severe-item"))
            selectedColor = colours["severe-item"];

    });

});

// Place pain dots (G)
bodyContainer.addEventListener("click", function(e){

    const rect = bodyContainer.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const dot = document.createElement("div");

    dot.classList.add("pain-dot");

    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;
    dot.style.backgroundColor = selectedColor;

    // Remove dot when clicked
    dot.addEventListener("click", function(event){
        event.stopPropagation();
        dot.remove();
    });

    bodyContainer.appendChild(dot);

});
