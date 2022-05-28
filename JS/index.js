let container = document.getElementById("container")

async function createTaskFn(){
    try {
        let taskName = document.getElementById('task').value;
        let taskstatus;
        if( document.querySelector("#check").checked){
            taskstatus=true;
        }else{
            taskstatus=false;
        }
        let body={
            "title":taskName,
            "status":taskstatus
        };

        let  res = await fetch(`http://localhost:3000/tasks`,{
            method:"POST",
            body:JSON.stringify(body),
            headers:{
                "Content-Type":"application/json"
            }
        });
        let data = await res.json();
        taskManager();

    } catch (error) {
        console.log(error);
    }
}

async function taskManager(){
    try {
        container.innerHTML = "";

        let table=document.createElement('table');

        let thead=document.createElement('thead');

        let headRow=document.createElement('tr');

        let th1=document.createElement('th');
        th1.textContent = 'TASK NAME';

        let th2=document.createElement('th');
        th2.textContent = 'DELETE';

        let th3=document.createElement('th');
        th3.textContent = 'EDIT';

        headRow.append(th1,th2,th3);

        thead.append(headRow)

        let res = await fetch(`http://localhost:3000/tasks`);

        let data = await res.json();

        let tbody=document.createElement('tbody');

        data.forEach(task => {
            let row=document.createElement('tr');

            let td1=document.createElement('td');
            td1.textContent = task.title;
            td1.style=function(){
                if (taskstatus == true){
                    color:green;
                }
                else{
                    color:red;
                }
            }

            let td2=document.createElement('td');
            let dltbtn=document.createElement('button');
            dltbtn.textContent = 'Delete';
            dltbtn.onclick= async function(){
                let res = await fetch(`http://localhost:3000/tasks/${task.id}`,{
                    method:"DELETE"
                });
                taskManager();
            }

            td2.append(dltbtn)

            let td3=document.createElement('td');
            let edtbtn=document.createElement('button');
            edtbtn.textContent = 'Edit';
            edtbtn.onclick= async function(){
                console.log(task.id)
                localStorage.setItem('taskID',task.id)
                window.location.href="./edit.html"
            }

            td3.append(edtbtn)

            row.append(td1,td2,td3);

            tbody.append(row)
        });

        table.append(thead,tbody);

        container.append(table);
    } catch (error) {
        console.log(error);
    }
}
taskManager();