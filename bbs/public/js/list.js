let boardsStr = localStorage.getItem("bbs");

if (boardsStr === null) {
  const listStr = JSON.stringify([]);
  localStorage.setItem("bbs", listStr);
  boardsStr = listStr;
}

const boardsObj = JSON.parse(boardsStr);

const template = (index, objValue) => {
  return `
  <tr>
  <td>${index + 1}</td>
  <td><a href="C:\\Users\\admin\\Documents\\cplus_prac\\bbs\\board\\view.html?index=${objValue.index}">${objValue.subject}</a></td>
  <td>${objValue.writer}</td>
  <td>${objValue.date}</td>
  <td>${objValue.views}</td>
  </tr>
  `;
};

const tbody = document.querySelector("tbody");

for (let i = 0; i < boardsObj.length; i++) {
  tbody.innerHTML += template(i, boardsObj[i]);
}