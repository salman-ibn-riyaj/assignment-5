const apiUrl = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

// card container ta dhori
let cardContainer = document.getElementById("allCardContainer");

// sob data rakhbo ekhane
let allIssueData = [];

// prothome load korbo
let dataLoad = () => {
 // loading dekhao jotokkhon data na ashe
 cardContainer.innerHTML = `
   <div class="col-span-4 flex justify-center items-center py-10">
     <span class="loading loading-spinner loading-lg text-primary"></span>
   </div>`;

 fetch(apiUrl)
   .then((res) => res.json())
   .then((result) => {
     allIssueData = result.data;
     // console.log(allIssueData)
     issueCardDekhao(allIssueData);
   });
};

dataLoad();



// sob issue dekhabo
document.getElementById("allBtn").addEventListener("click", () => {
 btnTaActiveKoro("allBtn");
 issueCardDekhao(allIssueData);
});

// shudhu open issue
document.getElementById("openBtn").addEventListener("click", () => {
 btnTaActiveKoro("openBtn");
 let openGula = allIssueData.filter((item) => item.status === "open");
 issueCardDekhao(openGula);
});

// shudhu closed issue
document.getElementById("closeBtn").addEventListener("click", () => {
 btnTaActiveKoro("closeBtn");
 let closedGula = allIssueData.filter((item) => item.status === "closed");
 issueCardDekhao(closedGula);
});

// active btn er style change korbo
const btnTaActiveKoro = (activeBtnId) => {
 let btnIdGula = ["allBtn", "openBtn", "closeBtn"];

 // age shob theke active class sorie nao
 btnIdGula.forEach((id) => {
   let eachBtn = document.getElementById(id);
   eachBtn.classList.remove("btn-primary", "text-white");
 });

 // ekhon shudhu selected btn active korbo
 document.getElementById(activeBtnId).classList.add("btn-primary", "text-white");
};


// card banabo ekhane
let issueCardDekhao = (issueList) => {
 cardContainer.innerHTML = "";

 // kototai issue ache seta dekhabo
 document.getElementById("numberOfIssues").textContent = `${issueList.length} issues`;

 issueList.forEach((issue) => {
   // open hole green, closed hole purple
   let borderRong = issue.status === "open" ? "border-green-500" : "border-purple-500";
   let textRong = issue.status === "open" ? "text-green-500" : "text-purple-500";
   let imgNam = issue.status === "open" ? "Open" : "Closed";

   let newCard = document.createElement("div");

   newCard.innerHTML = `
     <div class="card bg-white shadow-lg p-3 h-full border-t-4 ${borderRong}" onclick="modalKholo(${issue.id})">

       <div class="flex justify-between items-center mb-2">
         <img src="./assets/${imgNam}-Status.png" alt="">
         <p class="text-sm capitalize font-semibold ${textRong}">${issue.status}</p>
       </div>

       <h2 class="font-bold">${issue.title}</h2>
       <p class="text-gray-400 line-clamp-2 text-sm">${issue.description}</p>

       <div class="flex gap-3 items-center p-2">
         ${issue.labels
           .map(
             (label, i) => `
           <p class="text-sm">
             <span><i class="fa-solid ${i === 0 ? "fa-bug" : "fa-life-ring"}"></i></span>
             ${label.toUpperCase()}
           </p>`
           )
           .join("")}
       </div>

       <hr class="text-gray-300">

       <div class="mt-5 text-gray-400 p-2">
         <small>#${issue.id} by ${issue.author}</small><br>
         <small>${new Date(issue.createdAt).toLocaleDateString()}</small>
       </div>

     </div>`;

   cardContainer.appendChild(newCard);
 });
};

// modal ta khulbo


const modalKholo = (issueId) => {
 let singleIssueUrl = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`;

 fetch(singleIssueUrl)
   .then((res) => res.json())
   .then((res) => {
     let issue = res.data;
     // console.log(issue)

     document.getElementById("modalContainer").innerHTML = `
       <h2 class="font-bold text-2xl mb-5">${issue.title}</h2>

       <div class="flex items-center gap-3 mb-5">
         <span class="text-black text-xs px-3 py-1 rounded-full">${issue.status.toUpperCase()}</span>
         <span class="text-gray-300 text-sm">Opened by ${issue.author} ${new Date(issue.createdAt).toLocaleDateString()}</span>
       </div>

       <div class="flex gap-2 mb-4">
         ${issue.labels
           .map(
             (label, i) => `
           <span class="border border-gray-400 text-gray-600 text-[12px] px-3 py-1 rounded-full">
             <i class="fa-solid ${i === 0 ? "fa-bug" : "fa-life-ring"}"></i> ${label.toUpperCase()}
           </span>`
           )
           .join("")}
       </div>

       <p class="text-gray-700 mb-7">${issue.description}</p>

       <div class="bg-gray-200 rounded-md p-6 flex justify-between mb-10">
         <div>
           <p class="text-gray-500 text-[16px]">Assignee:</p>
           <p class="font-medium">${issue.assignee}</p>
         </div>
         <div>
           <p class="text-gray-600 text-[16px]">Priority:</p>
           <span class="text-black text-[1rem] px-3 py-1 rounded-full">${issue.priority}</span>
         </div>
       </div>

       <div class="flex justify-end">
         <button onclick="document.getElementById('showModal').close()" class="btn text-black px-12">Close</button>
       </div>`;

     document.getElementById("showModal").showModal();
   });
};

// search button e click korle
document.getElementById("search-btn").addEventListener("click", () => {
 let khojorText = document.getElementById("searchInput").value;

 // jodi kisu na likhe search kore
 if (!khojorText) {
   issueCardDekhao(allIssueData);
   return;
 }

 // console.log("khujchi:", khojorText)

 let searchUrl = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${khojorText}`;

 fetch(searchUrl)
   .then((res) => res.json())
   .then((data) => {
     // console.log(data)
     issueCardDekhao(data.data);
   });
});
