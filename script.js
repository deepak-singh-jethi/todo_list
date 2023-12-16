let listNumber = 1;
let listObject = {};
let todoCount = 0;
let priorityCount = 0;
const form = document.querySelector("form");
const items = document.querySelector("#items");
const spanToDoCount = document.getElementById("toDoNumber");
const noItemConatiner = document.querySelector(".noItemConatiner");
const toDoHighPriority = document.querySelector("#toDoHighPriority");

form.addEventListener("submit", addData);

function addData(event) {
  event.preventDefault();
  //remove no list conatiner

  noItemConatiner.classList.add("displayNone");
  const content = form.content.value;
  const date = form.date.value;

  listObject[`${listNumber}`] = {
    content: content,
    date: date,
    inPripority: false,
  };

  //print data on the display
  printData(listNumber, content, date);

  todoCount++;
  listNumber++;

  //update toDo number
  spanToDoCount.innerText = todoCount;
  form.reset();
}

function printData(listNumber, content, date) {
  let div = document.createElement("div");
  div.className = "item";
  div.id = `item-${listNumber}`;

  div.innerHTML = `<label for="checkBox-${listNumber}">
              <span class="material-icons" id="checkSpan-${listNumber}">fiber_manual_record </span>
              <!-- <span class="material-icons">check_circle </span> -->
            </label>
            <input type="checkbox" id="checkBox-${listNumber}"  checkBoxPointer = "checkSpan-${listNumber}"/>
            <div class="content" id="contentNumber-${listNumber}">
             ${content}
            </div>
            <div class="content" id="contentNumber-${listNumber}">
             ${date}
            </div>
            <button id="editBtn-${listNumber}" class="material-icons" contentPointer = "contentNumber-${listNumber}">edit</button>
            <button id="deleteBtn-${listNumber}" class="material-icons" itemPointer = "item-${listNumber}" >delete</button>`;

  items.appendChild(div);

  //evevnt listner for edit button
  const editBtn = document.querySelector(`#editBtn-${listNumber}`);
  editBtn.addEventListener("click", () => {
    const divId = editBtn.getAttribute("contentPointer");
    editContent(divId, listNumber);
  });

  //event listner for delete button
  const deleteBtn = document.getElementById(`deleteBtn-${listNumber}`);
  deleteBtn.addEventListener("click", (event) => {
    const itemId = deleteBtn.getAttribute("itemPointer");
    deleteItem(itemId, listNumber);
  });

  //high priority checking

  const checkBox = document.getElementById(`checkBox-${listNumber}`);
  checkBox.addEventListener("change", function () {
    // Check if the checkbox is checked

    const checkSpanId = checkBox.getAttribute("checkBoxPointer");

    const checkSpanElement = document.getElementById(`${checkSpanId}`);

    if (checkBox.checked) {
      checkSpanElement.innerText = "task_alt";
      priorityCount++;
    } else {
      checkSpanElement.innerText = "fiber_manual_record";
      priorityCount--;
    }
    toDoHighPriority.innerText = priorityCount;
    console.log(checkSpanElement);
  });
}
//checkBox functionality

function checkBoxFunction(checkSpanId) {}
//delete button functionality
function deleteItem(itemId, listNumber) {
  todoCount--;
  spanToDoCount.innerText = todoCount;
  const item = document.getElementById(`${itemId}`);
  item.parentNode.removeChild(item);
  if (todoCount === 0) {
    noItemConatiner.classList.remove("displayNone");
    console.log("0");
  }
}

//edit button functionality
function editContent(divId, listNumber) {
  const div = document.getElementById(`${divId}`);
  div.contentEditable = true;

  div.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      div.contentEditable = false;
      listObject[`${listNumber}`].content = div.innerText;
    }
  });
}
