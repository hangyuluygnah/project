const achievementsData = [
  "Gratitude Journal",
  "Positive Self talk",
  "Anger Acceptance",
  "Planning",
];

// URL 파라미터에서 id 가져오기
const urlParams = new URLSearchParams(window.location.search);
const currentId = parseInt(urlParams.get("id"), 10);

const achievementsTitle = document.querySelector(".title");

// ID에 해당하는 title 가져오기
achievementsTitle.textContent = achievementsData[currentId - 1];
