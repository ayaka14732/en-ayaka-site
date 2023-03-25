const handleToggle = (targetId) => {
  document.querySelectorAll("nav > ul > li").forEach((li) => {
    li.textContent === targetId
      ? li.classList.add("active")
      : li.classList.remove("active");
  });

  document.querySelectorAll("main > .content > section").forEach((section) => {
    section.id === targetId
      ? section.classList.remove("hidden")
      : section.classList.add("hidden");
  });
};

/* clock */

let mapping = {};

const loadData = async () => {
  const request = await fetch("assets/dates.txt");
  const response = await request.text();
  response
    .trimEnd()
    .split("\n")
    .forEach((line) => {
      const [gregorian, nya] = line.split("\t");
      mapping[gregorian] = nya;
    });
};

const updateTime = () => {
  const date = new Date();
  const timeZone = "Australia/Brisbane";

  const formatter = new Intl.DateTimeFormat("sv-SE", { timeZone });
  const dateString = formatter.format(date).substring(0, 10);
  const nyaDateString = mapping[dateString];

  const time = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: timeZone,
  });

  const newTime = nyaDateString + " " + time;
  const originalTime = document.getElementById("clock").textContent;
  if (originalTime !== newTime)
    document.getElementById("clock").innerText = newTime;
};

document.addEventListener("DOMContentLoaded", async () => {
  await loadData();
  updateTime();
  document.getElementById("clock-wrapper").classList.remove("hidden");
  setInterval(updateTime, 1000);
});
