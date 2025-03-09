const stressThreshold = 10;

const startHabit = document.querySelector("#start-habit");
const popupOverlay = document.querySelector(".popup-overlay");
const exit = document.querySelector("#cancelBtn");
const goOn = document.querySelector("#submitBtn");
const stress = document.querySelector("#stressInput");
const notificationsCard = document.querySelector("#notifications");
const pastAchievementsCard = document.querySelector("#past-achievements");

startHabit.addEventListener("click", () => {
  popupOverlay.style.display = "flex";
});

exit.addEventListener("click", () => {
  popupOverlay.style.display = "none";
  stress.value = "";
});

goOn.addEventListener("click", () => {
  const stressValue = parseInt(stress.value, 10);

  if (isNaN(stressValue)) {
    alert("숫자를 입력해주세요.");
  } else if (stressValue < stressThreshold) {
    window.location.href = "1_gratitude.html";
  } else {
    window.location.href = "3_anger.html";
  }
});

// Notifications 클릭 시 이동
notificationsCard.addEventListener("click", () => {
  window.location.href = "notifications_select.html";
});
// Past achievements 클릭 시 이동
pastAchievementsCard.addEventListener("click", () => {
  window.location.href = "achievements_select.html";
});
