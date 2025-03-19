function selectMethod() {
    const dropdownItems = document.querySelectorAll(".dropdown-item")
    const dropdownButton = document.getElementById("dropdownMenuButton1")

    dropdownItems.forEach(item =>
        item.addEventListener("click", function() {
            dropdownButton.innerText = item.textContent
        })
    )
}


function selectIngredients() {
    var checkboxes = document.querySelectorAll(".form-check-input");
    let checkedBoxes = [];

    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener("change", function() {
            checkedBoxes = Array.from(checkboxes)
            .filter(i => i.checked)
            .map(i => i.value);

            console.log(checkedBoxes)

        document.getElementById("ingredientList").innerText = checkedBoxes.join("\n");
        })
    })
}