
    // const ingredientButton = document.getElementById("addIngredient");

let ingredientId, directionId; 
document.addEventListener('DOMContentLoaded', function() {
    var sidebar = document.querySelectorAll('.sidenav');
    var tabs = document.querySelectorAll(".tabs")
    var select = document.querySelectorAll('select');
    var imgs = document.querySelectorAll('.materialboxed');
    var sidenavInstance = M.Sidenav.init(sidebar, {});
    var tabInstance = M.Tabs.init(tabs, {});
    var selectInstance = M.FormSelect.init(select, {});
    var imgInstance = M.Materialbox.init(imgs, {});
    // var instance = M.Tabs.getInstance(tabs);
    
    

});

if(document.getElementById("homePage")) M.toast({html: 'Click an image to enlarge it'})
if(document.getElementById("accountPage")) M.toast({html: "Click the plus to create new recipes!"})


if(document.getElementById("addIngredient")){
    ingredientId = 0;
    directionId = 0;
    document.getElementById("addIngredient").addEventListener("click", addIngredients);
    document.getElementById("deleteIngredient").addEventListener("click", deleteIngredient);
    document.getElementById("addDirection").addEventListener("click", addDirections);
    document.getElementById("deleteDirection").addEventListener("click", deleteDirections)
}




function addIngredients(){
    const input = document.createElement("input");
    const div = document.createElement("div");
    const label = document.createElement("label");
    const ingredientContainer = document.querySelector(".ingredient-container")

    ingredientId++

    input.classList.add("ingredients");
    input.type = "text"
    input.name = "recipeIngredient"

    div.classList.add("input-field")
    div.id = `ingredient-${ingredientId}`

    label.innerText = "Add Ingredients"
    label.setAttribute("for", "recipeIngredient")

    ingredientContainer.appendChild(div)
    
    div.appendChild(input)
    div.appendChild(label)
  
}
  


function deleteIngredient() {
    let div = document.getElementById(`ingredient-${ingredientId}`)
    
    if(ingredientId == 0) return
  
    div.innerHTML = " "    
    
    div.remove()
    ingredientId--
    
}

function addDirections(){
    const textarea = document.createElement("textarea");
    const div = document.createElement("div");
    const span = document.createElement("span");
    const label = document.createElement("label");
    const directionContainer = document.querySelector(".direction-container")


    directionId++

    span.classList.add("prefix");
    span.innerText = `${directionId + 1}:`

    textarea.classList.add("materialize-textarea");
    textarea.id = "recipeDirection"
    textarea.name = "recipeDirection"

    textarea.required = true
    div.classList.add("input-field")
    div.id = `direction-${directionId}`

    label.innerText = "Add Direction"
    label.setAttribute("for", "recipeDirection")    

    directionContainer.appendChild(div)

    div.appendChild(span)
    div.appendChild(textarea)
    div.appendChild(label)
  
}
  
function deleteDirections() {
    let div = document.getElementById(`direction-${directionId}`)
    
    if(directionId == 0) return
  
    div.innerHTML = " "    
    
    div.remove()
    directionId--
    
}