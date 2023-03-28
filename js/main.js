window.addEventListener('load', () => {
    const form = document.querySelector('#add_form');
    const input = document.querySelector('#new_work');
    const list_el = document.querySelector('#tasks');

    // Load saved tasks from local storage
    const saved_tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    saved_tasks.forEach((task) => {
        const task_el = createTaskElement(task);
        list_el.appendChild(task_el);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value;

        if (!task) {
            alert("Please Fill Out the Task")
            return;
        }

        const task_el = createTaskElement(task);

        // Add task to saved tasks in local storage
        const saved_tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        saved_tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(saved_tasks));

        list_el.appendChild(task_el);
        input.value = "";
    });

    function createTaskElement(task) {
        const task_el = document.createElement("div");
        task_el.classList.add("task");

        const task_content_el = document.createElement("div");
        task_content_el.classList.add("content");

        task_el.appendChild(task_content_el);

        const task_input_el = document.createElement("input");
        task_input_el.classList.add("text");
        task_input_el.value = task;
        task_input_el.setAttribute("readonly", "readonly");
        task_input_el.type = "text";

        task_content_el.appendChild(task_input_el);

        const task_action_el = document.createElement("div");
        task_action_el.classList.add("actions");

        const task_edit_el = document.createElement("button");
        task_edit_el.classList.add("edit");
        task_edit_el.innerText = "Edit";

        task_edit_el.addEventListener('click', () => {
            if( task_edit_el.innerText.toLowerCase() === "edit") {
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
                task_edit_el.innerHTML="Save";
            } else {
                task_input_el.setAttribute("readonly", "readonly");
                task_edit_el.innerText="Edit";
                
                // Update task in saved tasks in local storage
                const saved_tasks = JSON.parse(localStorage.getItem('tasks')) || [];
                const index = saved_tasks.indexOf(task);
                if (index !== -1) {
                    saved_tasks[index] = task_input_el.value;
                    localStorage.setItem('tasks', JSON.stringify(saved_tasks));
                }
            }
        });

        const task_delete_el = document.createElement("button");
        task_delete_el.classList.add("delete");
        task_delete_el.innerText = "Delete";

        task_delete_el.addEventListener('click', () => {
            task_el.remove();

            // Remove task from saved tasks in local storage
            const saved_tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            const index = saved_tasks.indexOf(task);
            if (index !== -1) {
                saved_tasks.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(saved_tasks));
            }
        });

        task_action_el.appendChild(task_edit_el);
        task_action_el.appendChild(task_delete_el);

        task_el.appendChild(task_action_el);

        return task_el;
    }
});



// sweet Alert

Swal.fire({ title: 'Title', text: 'Message', icon: 'success' });    