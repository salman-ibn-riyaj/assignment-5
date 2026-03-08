const apiUrl = "https://phi-lab-server.vercel.app/api/v1/lab/issues";


let cardContainer = document.getElementById("allCardContainer");


let allIssueData = [];


let dataLoad = () => {

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


document.getElementById('allBtn').addEventListener('click', () => {
  btnActiveKoro('allBtn');
  issueCardDekhao(allIssueData);
});

document.getElementById('openBtn').addEventListener('click', () => {
  btnActiveKoro('openBtn');

  let openGula = allIssueData.filter(item => item.status === 'open');
  issueCardDekhao(openGula);
});

document.getElementById('closeBtn').addEventListener('click', () => {
  btnActiveKoro('closBtn');

  let closedGula = allIssueData.filter(item => item.status === 'closed');

  issueCardDekhao(closedGula);
});





