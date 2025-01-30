const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

function showNotes() {
  notesContainer.innerHTML = localStorage.getItem("notes") || ""; // Load saved notes or empty
  addEventListeners(); // Reapply event listeners after loading
}

function updateStorage() {
  localStorage.setItem("notes", notesContainer.innerHTML);
}

createBtn.addEventListener("click", () => {
  let inputBox = document.createElement("p");
  let img = document.createElement("img");

  inputBox.classList = "input-box";
  inputBox.setAttribute("contenteditable", "true");
  img.src = "img/delete.png";

  inputBox.appendChild(img);
  notesContainer.appendChild(inputBox);

  updateStorage();
  addEventListeners(); // Ensure new note has events attached
});

notesContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "IMG") {
    e.target.parentElement.remove();
    updateStorage();
  }
});

function addEventListeners() {
  let notes = document.querySelectorAll(".input-box");
  notes.forEach(note => {
    note.addEventListener("keyup", updateStorage);
  });
}

// Prevent Enter key from breaking formatting
document.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    document.execCommand("insertLineBreak");
    event.preventDefault();
  }
});

showNotes(); // Initialize saved notes on page load
