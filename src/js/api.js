// api.js
const baseUrl = "https://developer.nps.gov/api/v1/";

async function getJson(endpoint) {
  const apiKey = "YOUR_API_KEY"; // replace with your real key
  const url = baseUrl + endpoint;

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": apiKey
    }
  };

  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
  return data;
}

function listTemplate(item) {
  return `<li>
    <a href="${item.url}" target="_blank">${item.fullName}</a>
    (${item.states})
  </li>`;
}

async function renderClimbingList() {
  const endpoint = "activities/parks?q=climbing";
  const listElement = document.getElementById("outputList");

  const data = await getJson(endpoint);

  // data.data is an array of activity objects
  // each activity contains a parks array
  const parks = data.data.flatMap(activity => activity.parks);

  const listHtml = parks.map(listTemplate).join("");
  listElement.innerHTML = listHtml;
}

renderClimbingList();