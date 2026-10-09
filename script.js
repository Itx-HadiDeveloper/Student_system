let students = JSON.parse(localStorage.getItem("students")) || [];

renderTable();

$("#addStudent").click(function () {
    let name = $("#name").val();
    let className = $("#class").val();
    let roll = $("#roll").val();

    if (!name || !className || !roll) return;

    students.push({ name, className, roll });
    saveData();
    renderTable();

    $("#name, #class, #roll").val("");
});

function renderTable(filter = "") {
    $("#studentTable").empty();

    students
        .filter(s => s.name.toLowerCase().includes(filter))
        .forEach((s, index) => {
            $("#studentTable").append(`
                <tr>
                    <td>${s.name}</td>
                    <td>${s.className}</td>
                    <td>${s.roll}</td>
                    <td>
                        <button onclick="editStudent(${index})">Edit</button>
                        <button onclick="deleteStudent(${index})">Delete</button>
                    </td>
                </tr>
            `);
        });
}

function deleteStudent(index) {
    students.splice(index, 1);
    saveData();
    renderTable();
}

function editStudent(index) {
    let s = students[index];
    $("#name").val(s.name);
    $("#class").val(s.className);
    $("#roll").val(s.roll);

    students.splice(index, 1);
    saveData();
}

$("#search").on("keyup", function () {
    renderTable($(this).val().toLowerCase());
});

function saveData() {
    localStorage.setItem("students", JSON.stringify(students));
}
