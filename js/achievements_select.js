const achievementItems = document.querySelectorAll(".achievements-item");

achievementItems.forEach((item) => {
  item.addEventListener("click", () => {
    const id = item.getAttribute("data-id");
    window.location.href = `achievements_info.html?id=${id}`;
  });
});
