const stressThreshold = 10;

const startHabitCard = document.querySelector("#start-habit");
const notificationsCard = document.querySelector("#notifications");
const pastAchievementsCard = document.querySelector("#past-achievements");

const popupOverlay = document.querySelector("#popup-overlay");
const stressInput = document.querySelector("#stressInput");
const cancelBtn = document.querySelector("#cancelBtn");
const submitBtn = document.querySelector("#submitBtn");

console.log("home.js loaded!!");
console.log("I'm so happy to see you here! 😊");
console.log("Let's start today's habit!");

// "Start today's habit!" 클릭 시 팝업 열기
startHabitCard.addEventListener("click", () => {
  popupOverlay.style.display = "flex";
});

// 팝업 닫기 (취소 버튼)
cancelBtn.addEventListener("click", () => {
  popupOverlay.style.display = "none";
  stressInput.value = "";
});

// 팝업 제출 버튼
submitBtn.addEventListener("click", () => {
  const stressValue = parseInt(stressInput.value, 10);

  if (isNaN(stressValue)) {
    alert("숫자를 입력해주세요.");
    return;
  }

  // stress 조건에 따라 다른 페이지로 이동
  if (stressValue < stressThreshold) {
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
