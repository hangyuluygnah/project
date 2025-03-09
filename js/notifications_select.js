const items = document.querySelectorAll(".notification-item");

console.log(items);

items.forEach((item) => {
  item.addEventListener("click", () => {
    const id = item.getAttribute("data-id");
    window.location.href = `notifications_info.html?id=${id}`;
  });
});
