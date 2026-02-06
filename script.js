let serachBtn = document.querySelector(".search");
let userInput = document.querySelector(".usernameInput");
let profileCard = document.querySelector(".profileCard");
let githubProfile = document.querySelector(".githubProfile");



function getProfileData(username){
  return fetch(`https://api.github.com/users/${username}`).then((raw) => {
        if(!raw.ok) throw new Error("User not found.");
        return  raw.json();
  });
}

function getRepos(username){
    return fetch(`https://api.github.com/users/${username}/repos?sort=updated`).then((raw) =>{
        if(!raw.ok) throw new Error("Something went wrong");
    return raw.json();
  })
}

function decorateProfileData(details){
  console.log(details);

  let data = `
        <!-- Top Section: Avatar and Basic Info -->
        <div class="flex flex-col md:flex-row items-center md:items-start gap-6">
            <img
                src="${details.avatar_url}"
                alt="avatar"
                class="w-32 h-32 rounded-full border-4 border-blue-500 shadow-xl"
            >

            <div class="flex-1 text-center md:text-left w-full">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div>
                        <h2 class="text-3xl font-bold text-white">${details.name || details.login}</h2>
                        <p class="text-blue-400 font-medium text-lg">@${details.login}</p>
                    </div>
                    ${details.location ? `
                    <div class="mt-2 md:mt-0">
                        <span class="bg-blue-600/20 text-blue-400 text-sm font-semibold px-4 py-1.5 rounded-full border border-blue-500/30">
                            ${details.location}
                        </span>
                    </div>` : ''}
                </div>

                <!-- Bio -->
                <p class="text-gray-400 mt-4 leading-relaxed text-lg">
                    ${details.bio ? details.bio : "This user hasn't provided a bio."}
                </p>
            </div>
        </div>

        <!-- Stats Section -->
        <div class="grid grid-cols-3 gap-4 mt-8">
            <div class="bg-gray-900/60 rounded-2xl p-4 border border-gray-700/50 text-center">
                <p class="text-2xl font-bold text-white">${details.followers}</p>
                <p class="text-gray-500 text-xs uppercase tracking-widest mt-1">Followers</p>
            </div>

            <div class="bg-gray-900/60 rounded-2xl p-4 border border-gray-700/50 text-center">
                <p class="text-2xl font-bold text-white">${details.following}</p>
                <p class="text-gray-500 text-xs uppercase tracking-widest mt-1">Following</p>
            </div>

            <div class="bg-gray-900/60 rounded-2xl p-4 border border-gray-700/50 text-center">
                <p class="text-2xl font-bold text-white">${details.public_repos}</p>
                <p class="text-gray-500 text-xs uppercase tracking-widest mt-1">Repos</p>
            </div>
        </div>

        <!-- Additional Info Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mt-8 text-gray-300">
            <div class="flex items-center gap-3">
                <span class="text-xl w-6 text-center">🏢</span>
                <span class="truncate">${details.company || "Not Available"}</span>
            </div>

            <div class="flex items-center gap-3 font-medium">
                <span class="text-xl w-6 text-center">🌐</span>
                ${details.blog ? `<a href="${details.blog.startsWith('http') ? details.blog : 'https://' + details.blog}" target="_blank" class="text-blue-400 hover:underline truncate">${details.blog}</a>` : '<span>Not Available</span>'}
            </div>

            <div class="flex items-center gap-3">
                <span class="text-xl w-6 text-center">📍</span>
                <span class="truncate">${details.location || "Not Available"}</span>
            </div>

            <div class="flex items-center gap-3">
                <span class="text-xl w-6 text-center">🐦</span>
                <span>${details.twitter_username ? `@${details.twitter_username}` : 'Not Available'}</span>
            </div>
        </div>
    `;

  profileCard.innerHTML = data;
}

githubProfile.addEventListener('click', function(){
  let userInputValue = userInput.value.trim();
  location.href = `https://github.com/${userInputValue}`;
})

serachBtn.addEventListener('click', function(){
  let username = userInput.value.trim();
    if(username.length > 0){
        getProfileData(username).then((data)=>{
      decorateProfileData(data);
    })
    } else{
    alert();
  }
});
