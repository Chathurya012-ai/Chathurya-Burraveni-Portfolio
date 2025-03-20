document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".nav button");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const targetId = button.getAttribute("onclick").match(/'([^']+)'/)[1]; 
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });
});
