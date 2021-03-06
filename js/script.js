var id = 0;
if (localStorage.getItem("id_tasks") != null) {
    id = JSON.parse(localStorage.getItem("id_tasks"));
}
var ToDo = document.getElementById("ulred");
var InProg = document.getElementById("ulyellow");
var Done = document.getElementById("ulgreen");
var ulToDoLs = localStorage.getItem("ulToDo");
var ulInProgLs = localStorage.getItem("ulInProg");
var ulDoneLs = localStorage.getItem("ulDone");
if (ulToDoLs != undefined && ulToDoLs != "" && ulToDoLs != null) {
    ToDo.innerHTML = ulToDoLs;
}
if (ulInProgLs != undefined && ulInProgLs != "" && ulInProgLs != null) {
    InProg.innerHTML = ulInProgLs;
}
if (ulDoneLs != undefined && ulDoneLs != "" && ulDoneLs != null) {
    Done.innerHTML = ulDoneLs;
}

function addItem() {

    id++;
    var Item = document.getElementById("tasks").value;
    if (Item != "") {

        var litodo = document.createElement("li");
        var p = document.createElement("p");
        p.innerHTML = Item;
        litodo.setAttribute("id", "li" + id);
        litodo.setAttribute("ondragstart", "drag(event);");
        litodo.setAttribute("ondragover", "stopDropping(event);");
        litodo.setAttribute("draggable", "true");
        var del = document.createElement("input");
        del.setAttribute("value", "X");
        // del.style.cssFloat = "right";
        del.setAttribute("onclick", "Delete(\'li" + id + "\');");
        del.setAttribute("type", "button");
        // del.style.height = "auto";
        litodo.appendChild(p);
        litodo.appendChild(del);
        ToDo.appendChild(litodo);
        document.getElementById("tasks").value = "";
        localStorage.setItem("id_tasks", id);
        localStorage.setItem("ulToDo", ToDo.innerHTML);
    }
}

function Reset() {
    ToDo.innerHTML = "";
    InProg.innerHTML = "";
    Done.innerHTML = "";
    localStorage.removeItem("ulToDo");
    localStorage.removeItem("ulInProg");
    localStorage.removeItem("ulDone");
    localStorage.removeItem("id_tasks");
}

function Delete(li) {

    if (confirm("do you want to delete element?")) {
        document.getElementById(li).remove();
        localStorage.setItem("ulToDo", ToDo.innerHTML);
        localStorage.setItem("ulInProg", InProg.innerHTML);
        localStorage.setItem("ulDone", Done.innerHTML);
    }

}

function drag(ev) {
    ev.dataTransfer.setData("li", ev.target.id);
}

function drop(ev) {
    var ul = ev.target;
    var TaskID = ev.dataTransfer.getData("li");
    var draggedElement = document.getElementById(TaskID);
    ul.appendChild(draggedElement);
    localStorage.setItem("ulToDo", ToDo.innerHTML);
    localStorage.setItem("ulInProg", InProg.innerHTML);
    localStorage.setItem("ulDone", Done.innerHTML);

}

// function drop(ev) {
//     var ul = ev.target;
//     var TaskID = ev.dataTransfer.getData("li");
//     var draggedElement = document.getElementById(TaskID);
//     draggedElement.setAttribute("draggable", "false");
//     ul.appendChild(draggedElement);
//     localStorage.setItem("ulToDo", ToDo.innerHTML);
//     localStorage.setItem("ulInProg", InProg.innerHTML);
//     localStorage.setItem("ulDone", Done.innerHTML);

// }
function allowDrop(ev) {
    ev.preventDefault();
}

function stopDropping(ev) {
    ev.stopPropagation();
}