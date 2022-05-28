const taskID = localStorage.getItem('taskID') ? localStorage.getItem('taskID') : "" ;

const updateFormInputs = async () =>{
    try {
        let res = await fetch(`http://localhost:3000/tasks/${taskID}`);
        let data = await res.json();
        const {id,title,status} = data;

        document.getElementById('task').value = title;
        document.getElementById('check').value = status;
    } catch (error) {
        console.log(error)
    }
}
updateFormInputs();

const editTaskFn = async ()=>{
    try {

        let body={
            title:document.getElementById('task').value,
            status:document.getElementById('check').value
        };

        let res = await fetch(`http://localhost:3000/tasks/${taskID}`,{
            method:"PUT",
            body:JSON.stringify(body),
            headers:{
                "Content-Type":"application/json"
            }
        });
        location.href = "./HTML/index.html"
    } catch (error) {
        console.log(error)
    }
}