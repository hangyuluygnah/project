const items = document.querySelectorAll(".achievements-item");

console.log(items);

items.forEach((item) => {
  item.addEventListener("click", () => {
    const id = item.getAttribute("data-id");
    window.location.href = `achievements_info.html?id=${id}`;
  });
});
