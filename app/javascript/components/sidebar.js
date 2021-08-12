const sideBar = () => {
  const btn = document.getElementById("btn");
  const searchBtn = document.querySelector(".bx-search");
  const sidebar = document.querySelector('.sidebar');

  btn.addEventListener("click", () => {
    sidebar.classList.toggle("active")
  })

    .searchBtn.addEventListener("click", () => {
      sidebar.classList.toggle("active")
    })
}

export { sideBar };
