const searchBox = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const errorContainer = document.getElementById("error-container");
const resultHeading = document.getElementById("result-heading");
const mealsContainer = document.getElementById("meals");
const mealDetailContainer = document.getElementById("meal-details");
const backBtn = document.getElementById("back-btn");
const mealDetailsContent = document.getElementById("meal-details-content");


backBtn.addEventListener("click",()=>mealDetailContainer.classList.add("hidden"));
searchBtn.addEventListener("click",fetchData);
searchBox.addEventListener("keydown",(e)=>{
    if(e.key === "Enter"){
        fetchData();
    }
})

mealsContainer.addEventListener("click",handleMealDetails);

async function fetchData(){

    let searchValue = searchBox.value;
     if (searchValue.trim()===""){
         mealsContainer.innerHTML="";
         resultHeading.textContent="Please enter recipie name!"
        return;} 

    let Api = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`;
    resultHeading.textContent = `Searching for "${searchValue}"...`; 
    let res = await fetch(Api);
    let data = await res.json();

    if(!data.meals){
        errorContainer.classList.remove("hidden");
        errorContainer.classList.add("error-active");
        resultHeading.textContent="";
        return;
        }
        else
           errorContainer.classList.remove("error-active");
        errorContainer.classList.add("hidden");  
          mealsContainer.innerHTML="";
    resultHeading.textContent=`Search Result for "${searchValue}":`

    searchBox.value="";
   
    data.meals.forEach(obj => {
    
        updateMeal(obj);
    });
   
   
}

function updateMeal(obj){

   mealsContainer.innerHTML +=`
   <div class="meal-item" data-meal-id="${obj.idMeal}">
    <img src=${obj.strMealThumb} alt="image"></img> 

                <div class="text">
                    <h3>${obj.strMeal}</h3>
                    <span>${obj.strCategory}</span>

                </div>
   </div>             
   `;

}



async function handleMealDetails(e){
    
    const recipeElem = e.target.closest(".meal-item");
    const idRecipie = recipeElem.getAttribute("data-meal-id");
    
    try{
        let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idRecipie}`);
        let data = await res.json();

        if(data.meals && data.meals[0]){
            let meal = data.meals[0];
            

            let ingredients = [];

            for(let i=1;i<=20;i++){
              
                if(meal[`strIngredient${i}`] && meal[`strIngredient${i}`].trim()!==""){

                    ingredients.push({
                        ingredient: meal[`strIngredient${i}`],
                        strMeasure: meal[`strMeasure${i}`]
                    });
                }
            }

            mealDetailsContent.innerHTML=`
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h2>${meal.strMeal}</h2>
                <span>${meal.strCategory || "Uncategorized"}</span>
                <div class="content-container">
                    <h3>Instructions</h3>
                    <p>${meal.strInstructions}</p>
                 <div class="ingredient-container">
                    <h3>Ingredients</h3>
                    <ul class="ingredients-list">
                        ${
                            ingredients.map((item)=>`
                                 <li class="list"><span class="bg-check"> <i class="fas fa-check"></i></span> ${item.strMeasure} ${item.ingredient}</li>`).join("")
                            }
                    </ul>
                     <a href="${meal.strYoutube}" class="youtube-link"><i class="fa-brands fa-youtube"></i> Watch Now</a> 
                 </div>
                </div> 
                     `;
            mealDetailContainer.classList.remove("hidden");
            mealDetailContainer.scrollIntoView({behavior:"smooth"});
        }

    } catch(error){
        console.log(error)
    }

    
}