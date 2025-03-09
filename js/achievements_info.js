const urlParams = new URLSearchParams(window.location.search);
const currentId = parseInt(urlParams.get("id"), 10);
const title = document.querySelector(".title");

const title_list = [
  "Gratitude Journal",
  "Positive Self talk",
  "Anger Acceptance",
  "Planning",
];

title.textContent = title_list[currentId - 1];
