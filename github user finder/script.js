const searchValue = document.getElementById("input-user");
const searchBtn = document.getElementById("search-btn");
const userContainer = document.getElementById("user-container");
const companyContainer = document.getElementById("company-container");
const repoContainer = document.getElementById("repo-container");
const errorContainer = document.getElementById("error-container");
const profileSec = document.querySelector(".profile-section");
const statSec = document.querySelector(".stats");
const additionSec = document.querySelector(".additional-info");


searchValue.addEventListener("keydown",(e)=>{
    if(e.key==="Enter"){
        fetchUser();
    }
})
searchBtn.addEventListener("click", fetchUser);



async function fetchUser(){

    let user = searchValue.value;
    searchValue.value = "";
try {
     let resp = await fetch(`https://api.github.com/users/${user}`);
     let data = await resp.json();

     if(!data){
        
       
        return;
     }else if(data.message || data.documentation_url || data.status){
       
        errorContainer.classList.remove("hidden");
        userContainer.classList.add("hidden");
        
     }
     else{
          errorContainer.classList.add("hidden");
        userContainer.classList.remove("hidden");
         profileSection(data);
     statSection(data);

     additionalInfoSection(data)
     repositorySection(data);
            }
    
    
} catch (error) {
    console.log(error);
}
}



function profileSection(data){
    const date = new Date(data.created_at);
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    profileSec.innerHTML=`
    <img src="${data.avatar_url}" alt="Profile Avatar" id="avatar">

    <div class="profile-info">
                    <h2 id="name">${data.name}</h2>
                    <p id="username">@${data.login}</p>
                    <p id="bio">${data.bio}</p>
                    <div class="location-date">
                        <p>
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${data.location || "Not Specified"}</span>
                        </p>
                        <p>
                            <i class="far fa-calendar-alt"></i>
                            Joined
                            <span id="joined-date">${formattedDate}</span>
                        </p>
                    </div>
                    <a href="${data.html_url}" id="view-profile-link" class="view-btn"> View Profile</a>
                </div>
    `;


}

function statSection(data){

    statSec.innerHTML= `
    
    <div class="stat">
                    <i class="fas fa-users"></i>
                    <span id="followers">${data.followers}</span> followers
                </div>
                <div class="stat">
                    <i class="fas fa-user-friends"></i>
                    <span id="following">${data.following}</span> following
                </div>
                <div class="stat">
                    <i class="fas fa-code-branch"></i>
                    <span id="repo-count">${data.public_repos}</span> repositories
                </div>
    `;
}

function additionalInfoSection(data){

    additionSec.innerHTML=`
                <div class="info-item" id="company-container">
                    <i class="fas fa-building"></i>
                    <span id="company">${ data.company || "Not specified"}</span>
                </div>

                <div class="info-item" id="blog-container">
                    <i class="fas fa-link"></i>
                    <a target="_blank" id="blog">${data.blog||"No Website"}</a>
                </div>

                <div class="info-item" id="twitter-container">
                    <i class="fa-brands fa-twitter"></i>
                    <a id="twitter" target="_blank">${ data.twitter_username || "No Twitter"}</a>
                </div>
    `;

}

async function  repositorySection(user){

    try {
        
        let resp = await fetch(`https://api.github.com/users/${user.login}/repos`);
        let data = await resp.json();

        data.forEach(repo => {

            const date = new Date(repo.updated_at);
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);

            repoContainer.innerHTML +=`
            
             <div class="repo">
                        <a href="${repo.html_url}" class="repo-name"><i class="fas fa-code-branch"></i>${repo.name}</a>
                        <p>${repo.description || "No discription"}</p>
                        
                        <footer class="repo-details">

                            <div class="detail-item">
                            <i class="fas fa-circle"></i> <span id="language" >${repo.language}</span>
                            </div>

                            <div class="detail-item">
                            <i class="fas fa-star"></i> <span id="star-number" >${repo.stargazers_count}</span>
                            </div>

                            <div class="detail-item">
                            <i class="fas fa-code-fork"></i> <span id="code-branch">${repo.forks_count}</span>
                            </div>

                            <div class="detail-item">
                            <i class="fas fa-history"></i> <span id="restore-date">${formattedDate}</span>
                            </div>
                        </footer>

                    </div>
            `;
        });

    } catch (error) {
        console.log("This error is occur from repository Sections. ",error);
    }

}
