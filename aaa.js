function addBtnEvent() {
    const taskForms = document.getElementsByClassName('task-list');

    // 수정, 삭제 버튼 이벤트 등록
    for (let i = 0; i < taskForms.length; i++) {
        const updateBtnId = 'update-'+ index;
        const deleteBtnId = 'delete-' + index;
        const hiddenInput = 'task-' + index;

        const updateBtn = document.getElementById(updateBtnId);
        const deleteBtn = document.getElementById(deleteBtnId);
        const taskID = document.getElementById(hiddenInput);

        updateBtn.addEventListener('click', event => {

        });
        deleteBtn.addEventListener('click', (event, taskID) => {
            event.preventDefault();
            deleteTask(taskID);
        });
    };
}

function deleteTask(taskID) {
    fetch('/task', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskID),
    })
    .then(res => console.log('dd'))
    .catch(err => console.error(err));
}

function updateTask(event) {
    
}

window.onload = function() {
    addBtnEvent();
}