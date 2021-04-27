const button = document.querySelector(".linkBox");
const linkIcon = document.querySelector(".linkBox i");
const linkContainer = document.querySelector(".linkContainer");
const addLink = document.querySelector(".addLink");
const cancelBtn = document.querySelector(".cancelBtn");
const linkName = document.querySelector(".js-linkName");
const linkUrl = document.querySelector(".js-linkUrl");
const linkShow = document.querySelector(".js-linkShow");
const linkNameInput = linkName.querySelector("input");
const linkUrlInput = linkUrl.querySelector("input");

const LINK_N = "linksName"; //링크 이름 스토리지
let linksName = [];
const LINK_U = "linksUrl"; //링크 주소 스토리지
let linksUrl= [];

function saveLinkName(){
  localStorage.setItem(LINK_N, JSON.stringify(linksName));
}

function handleSubmitLinkName(event) { //linkName 제출
  event.preventDefault();
  const selector = event.target;
  let currentValue = "";
  if (selector.className === "js-linkName") {
    currentValue = linkNameInput.value;
    linkNameInput.value = ""; // 엔터치고 나서 인풋 폼을 공백으로 만드는 것
    paintLinkList(currentValue);
  } else {
    currentValue = selector.lastChild.value;
    selector.classList.remove("clicked"); // 엔터 친 이후 input란이 사라지도록
    selector.previousSibling.classList.remove("removed"); // 엔터 친 이후 toDo가 나타나도록
    selector.previousSibling.innerHTML = `${currentValue}`; // 엔터 친 이후 currentValue로
    linksName[selector.parentNode.id - 1].text = `${currentValue}`;
    saveLinkName();
  }
}

function saveLinkUrl(){
  localStorage.setItem(LINK_U, JSON.stringify(linksUrl));
}

function handleSubmitLinkUrl(event) { //linkName 제출
  event.preventDefault();
  const selector = event.target;
  let currentValue = "";
  if (selector.className === "js-linkUrl") {
    currentValue = linkUrlInput.value;
    linkUrlInput.value = ""; // 엔터치고 나서 인풋 폼을 공백으로 만드는 것
    //paintLinkList(currentValue);
  } else {
    currentValue = selector.lastChild.value;
    selector.classList.remove("clicked"); // 엔터 친 이후 input란이 사라지도록
    selector.previousSibling.classList.remove("removed"); // 엔터 친 이후 toDo가 나타나도록
    selector.previousSibling.innerHTML = `${currentValue}`; // 엔터 친 이후 currentValue로
    linksUrl[selector.parentNode.id - 1].text = `${currentValue}`;
    saveLinkUrl();
  }
}

function deleteLinkList(event) {
  // 투두리스트를 삭제하는 함수
  const btn = event.target;
  const content = btn.parentNode;
  linkShow.removeChild(content);

  const cleanLinkList = linksName.filter(function(linkList) {
    return linkList.id !== parseInt(content.id); // content.id가 string이기 때문에 int로 바꿔준다
  }); // filter는 조건에 맞는 애들을 array에서 찾아준다.
  
  linksName = cleanLinkList;
  saveLinkName();
  saveLinkUrl();
}

function modifyLinkList(event) {
  // 투두리스트를 수정하는 함수
  const modifyForm = event.target.parentNode.lastChild; // 사용자가 toDo를 선택했을 때 선택한 toDo의 부모인 li element의 마지막 자식인 modifyForm을 선택
  const previousText = modifyForm.previousSibling; // modifyForm의 이전 형제인 수정 전의 toDo를 가져옴
  previousText.classList.add("removed"); // 수정 전의 toDo에 display: none의 removed클래스를 줘서 안보이게 처리
  modifyForm.classList.add("clicked"); // 수정 할 수 있는 Form을 display: flex의 clicked클래스를 줘서 
  modifyForm.addEventListener("submit", handleSubmit);
}

function paintLinkList(text) {
  // 새로운 toDo 리스트 생성 함수
  const linkList = document.createElement("li");
  const deleteBtn = document.createElement("button");
  const listContent = document.createElement("span");
  const modifyForm = document.createElement("form");
  const modifyInput = document.createElement("input");
  const newId = linksName.length + 1;

  linkList.classList.add("linklist");
  listContent.classList.add("text");
  modifyForm.classList.add("modifyForm");
  modifyInput.type = "text";
  modifyInput.classList.add("modifyInput");
  modifyInput.setAttribute("value", text);

  deleteBtn.classList.add("deleteBtn");
  deleteBtn.innerHTML = "✖";
  deleteBtn.addEventListener("click", deleteToDos);

  listContent.addEventListener("click", modifyLinkList);
  listContent.innerText = text; // submit에서 온 값

  linkList.appendChild(deleteBtn);
  linkList.appendChild(linkListContent);
  linkList.appendChild(modifyForm);
  modifyForm.appendChild(modifyInput);

  linkList.id = newId;
  linkShow.appendChild(linkList);

  const linkListObj = {
    id: newId,
    text: text
  };

  linksName.push(linkListObj);
  saveToDos();
}











function handleAddLink() {
  cancelBtn.classList.remove("removed");
  addLink.classList.add("removed");
  linkName.classList.remove("removed");
  linkUrl.classList.remove("removed");
}

function handleCancelBtn() {
  cancelBtn.classList.add("removed");
  addLink.classList.remove("removed");
  linkName.classList.add("removed");
  linkUrl.classList.add("removed");
}

function handleClick() {
  linkContainer.classList.toggle("showing");
  addLink.addEventListener("click", handleAddLink);
  linkName.addEventListener("submit", handleSubmitLinkName);
 // linkUrl.addEventListener("submit", handleSubmitLinkUrl);
  cancelBtn.addEventListener("click", handleCancelBtn);
  console.log(cancelBtn, 111);
}

function loadLinks() {
  linkIcon.addEventListener("click", handleClick);
}

function init() {
  loadLinks();
}
init();
