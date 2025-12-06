const input = document.querySelector('input');
const btn = document.querySelector('#btn');
const output = document.querySelector('.output');
const todo = [];

// Validate input
function check(val, arr) {
    if (!val.trim()) return false;

    if (arr.some(item => item.title === val)) {
        alert("Task already exists!");
        return false;
    }
    return true;
}

// Delete task
function delTask(index) {
    todo.splice(index, 1);
    render();
}

// Mark completed
function doneTask(index) {
    todo[index].completed = !todo[index].completed;
    render();
}

// Render UI
function render() {
    output.innerHTML = "";

    todo.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("container");

        div.innerHTML = `
            <div class='${item.completed ? "line" : ""}'>${item.title}</div>
            <button class="done">Done</button>
            <button class="delete">Del</button>
        `;

        // Attach events
        div.querySelector(".done").addEventListener("click", () => doneTask(index));
        div.querySelector(".delete").addEventListener("click", () => delTask(index));

        output.appendChild(div);
    });
}

// Add new task
function add() {
    const inputVal = input.value.trim();

    if (check(inputVal, todo)) {
        todo.push({
            title: inputVal,
            completed: false
        });
        input.value = "";
        render();
    }
}

// Add via Enter key
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") add();
});

// Add via button
btn.addEventListener("click", add);

function render() {
    output.innerHTML = '';

    todo.forEach((item, i) => {
        const container = document.createElement('div');
        container.className = 'container';

        // Title
        const titleDiv = document.createElement('div');
        titleDiv.textContent = item.title;
        if (item.completed) titleDiv.classList.add('line');

        // Done Button
        const doneBtn = document.createElement('button');
        doneBtn.className = 'done';
        doneBtn.innerHTML = `<i class="fas fa-check"></i> Done`;
        doneBtn.addEventListener('click', () => doneTask(i));

        // Delete Button
        const delBtn = document.createElement('button');
        delBtn.className = 'delete';
        delBtn.innerHTML = `<i class="fas fa-trash"></i> Del`;
        delBtn.addEventListener('click', () => delTask(i));

        // Append
        container.appendChild(titleDiv);
        container.appendChild(doneBtn);
        container.appendChild(delBtn);

        output.appendChild(container);
    });
}

