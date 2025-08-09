const bookmarkName = document.getElementById("name");
const bookmarkURL = document.getElementById("url");
const addBookmark = document.getElementById("add-btn");
const bookmarkContainer = document.querySelector(".bookmark-container");
const bookmarkValue = document.querySelector(".bm-value");

addBookmark.addEventListener("click", addBookmarkList)
let data = JSON.parse(localStorage.getItem("bmValue")) || [];
function addBookmarkList(){
    let name = bookmarkName.value;
    bookmarkName.value = "";
    let url =  bookmarkURL.value;
    bookmarkURL.value = "";

    data.push({
        id:Date.now(),
        name,
        url,
    });
   localStorage.setItem("bmValue",JSON.stringify(data));
   updateBoomarkContainer();
}


function updateBoomarkContainer(){
    bookmarkContainer.innerHTML = "";

    const sortedData = [...data].reverse();

    sortedData.forEach(data=>{
        
        const newelem = createlists(data);
        bookmarkContainer.append(newelem);
        });
}

function createlists(data){
    let li = document.createElement("li");
    li.classList.add("bm-value");

    li.innerHTML=`
     <a href="${data.url}">${data.name}</a>
                <button onclick="removelist(${data.id})" id="remove-btn">Remove</button>
    `;
    return li;
}

function removelist(id){
    data = data.filter(data=>data.id !== id);
    localStorage.setItem("bmValue",JSON.stringify(data));
     updateBoomarkContainer();
}
 updateBoomarkContainer();