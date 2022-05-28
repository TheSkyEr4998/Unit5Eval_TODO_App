const taskID = localStorage.getItem('taskID') ? localStorage.getItem('taskID') : "" ;

const updateFormInputs = async () =>{
    try {
        let res = await fetch(`http://localhost:3000/tasks/${taskID}`);
        let data = await res.json();
        const {id,title,status} = data;

        document.getElementById('task').value = title;
        if(status===true){
            document.querySelector("#check").checked=true;
        }
        
    } catch (error) {
        console.log(error)
    }
}
updateFormInputs();

const editTaskFn = async ()=>{
    try {
        let taskStatus;
            if(document.querySelector("#check").checked){
                taskStatus=true;
            }else{
                taskStatus=false;
            }
        let body={
            title:document.getElementById('task').value,
            status:taskStatus
        };

        let res = await fetch(`http://localhost:3000/tasks/${taskID}`,{
            method:"PUT",
            body:JSON.stringify(body),
            headers:{
                "Content-Type":"application/json"
            }
        });
        location.href = "./index.html"
    } catch (error) {
        console.log(error)
    }
}