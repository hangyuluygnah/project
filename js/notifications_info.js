const notificationData = [
  "Gratitude Journal",
  "Positive Self talk",
  "Anger Acceptance",
  "Planning",
];

// URL 파라미터에서 id 가져오기
const urlParams = new URLSearchParams(window.location.search);
const currentId = parseInt(urlParams.get("id"), 10);

const notificationTitle = document.querySelector("#notificationTitle");

notificationTitle.textContent = notificationData[currentId - 1];
