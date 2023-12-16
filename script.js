let listNumber = 1;
let listObject = {};

let todoCount = [0, 0, 0];
let inProgressCount = [0, 0, 0];
let completedCount = [0, 0, 0];

const form = document.querySelector("form");
const items_todo = document.querySelector("#items-todo");
const items_inProgress = document.querySelector("#items-inProgress");
const items_completed = document.querySelector("#items-completed");

const toDooInfo = document.getElementById("toDooInfo");
const startedInfo = document.getElementById("startedInfo");
const completedInfo = document.getElementById("completedInfo");

const noItemConatiner = document.querySelector(".noItemConatiner");
const toDoHighPriority = document.querySelector("#toDoHighPriority");
const toDoMediumPriority = document.querySelector("#toDoMediumPriority");
const toDoLowPriority = document.querySelector("#toDoLowPriority");

form.addEventListener("submit", addData);

function addData(event) {
  event.preventDefault();
  //remove no list conatiner

  noItemConatiner.classList.add("displayNone");

  const content = form.content.value;
  const date = form.date.value;
  const priority = form.priority.value;

  listObject[`${listNumber}`] = {
    content: content,
    date: date,
    priority: priority,
    conatiner: "items-todo",
  };

  //print data on the display
  printData(listNumber, content, date, priority, "items-todo");

  listNumber++;

  form.reset();
}

// print data,
function printData(listNumber, content, date, priority, box) {
  let div = document.createElement("div");
  div.className = "item";
  div.id = `item-${listNumber}`;

  div.innerHTML = `<label for="checkBox-${listNumber}">
              <span class="material-icons checkbox-color" id="checkSpan-${listNumber}">fiber_manual_record </span>
              
            </label>
            <input type="checkbox" id="checkBox-${listNumber}"  checkBoxPointer = "checkSpan-${listNumber}"/>
            <div class="content" id="contentNumber-${listNumber}">
             ${content}
            </div>
            <div class="date" id="dateNumber-${listNumber}">
             Due date - ${date}
            </div>
            <div class="priority" >
             Priority - ${priority}
            </div>

           <div>
             <label for="status">
              Task Status:- 
            </label>

            <select name="status" id="status-${listNumber}">
              <option value="items-todo">To-Do</option>
              <option value="items-inProgress">In Progress</option>
              <option value="items-completed">Completed</option>
            </select>
            </div>
          

            <div class = item-btn>
             <button id="editBtn-${listNumber}" class="material-icons" contentPointer = "contentNumber-${listNumber}">edit</button>


            <button id="deleteBtn-${listNumber}" class="material-icons" itemPointer = "item-${listNumber}" >delete</button></div>
           `;

  const container = document.querySelector(`#${box}`);
  container.appendChild(div);

  //update count
  console.log(box);
  updateCount(`${box}`, "add", priority);

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
    deleteItem(itemId, listNumber, priority);
  });

  //checkBox
  const checkBox = document.getElementById(`checkBox-${listNumber}`);
  checkBox.addEventListener("change", function () {
    // Check if the checkbox is checked
    const checkSpanId = checkBox.getAttribute("checkBoxPointer");
    const checkSpanElement = document.getElementById(`${checkSpanId}`);
    const content = document.querySelector(`#contentNumber-${listNumber}`);
    if (checkBox.checked) {
      checkSpanElement.innerText = "task_alt";
      content.classList.add("middleStroke");
      checkSpanElement.classList.add("checkbox-label");
    } else {
      checkSpanElement.innerText = "fiber_manual_record";
      content.classList.remove("middleStroke");
      checkSpanElement.classList.remove("checkbox-label");
    }
  });

  const listContainer = document.getElementById("threeListConatiner");

  listContainer.addEventListener("change", function (event) {
    const target = event.target;

    if (target.tagName === "SELECT" && target.name === "status") {
      const containerValue = target.value;
      const item = target.closest(".item");

      // Obtain priority from the current item
      const priority = item
        .querySelector(".priority")
        .innerText.trim()
        .split(" ")[2]
        .toLowerCase();

      let parentId = item.parentNode.id;
      updateCount(parentId, "sub", priority);

      if (!item.getAttribute("data-event-listener-attached")) {
        item.setAttribute("data-event-listener-attached", "true");

        printData(listNumber, content, date, priority, containerValue);
        item.remove();
      }
    }
  });
}

//delete button functionality
function deleteItem(itemId, listNumber, priority) {
  const item = document.getElementById(`${itemId}`);
  //update count
  let parentId = item.parentNode.id;
  updateCount(parentId, "sub", priority);

  item.parentNode.removeChild(item);
  if (todoCount === 0) {
    noItemConatiner.classList.remove("displayNone");
    console.log("0");
  }
}

//edit button functionality
function editContent(divId, listNumber) {
  const div = document.getElementById(`${divId}`);
  div.classList.add("editNow");
  div.contentEditable = true;

  div.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      div.contentEditable = false;
      listObject[`${listNumber}`].content = div.innerText;
      div.classList.remove("editNow");
    }
  });
}

function updateCount(containerId, operation, priority) {
  let index = null;
  if (priority === "low") {
    index = 0;
  } else if (priority === "medium") {
    index = 1;
  } else {
    index = 2;
  }

  let countArray, countElement, headerText;

  if (containerId === "items-todo") {
    countArray = todoCount;
    countElement = toDooInfo;
    headerText = "To Do";
  } else if (containerId === "items-inProgress") {
    countArray = inProgressCount;
    countElement = startedInfo;
    headerText = "Started";
  } else if (containerId === "items-completed") {
    countArray = completedCount;
    countElement = completedInfo;
    headerText = "Completed";
  }

  updateCountArray(countArray, index, operation);
  countElement.innerHTML = generateCountHTML(countArray, headerText);
}

function generateCountHTML(countArray, headerText) {
  return `<h4>${headerText} <span id="completeNumber">${
    countArray[0] + countArray[1] + countArray[2]
  }</span></h4>
          <div> Low Priority <span>${countArray[0]}</span></div>
          <div>Medium Priority <span>${countArray[1]}</span></div>
          <div>High Priority <span>${countArray[2]}</span></div>`;
}

function updateCountArray(countArray, index, operation) {
  if (operation === "add") {
    countArray[index]++;
  } else {
    countArray[index]--;
  }
}
