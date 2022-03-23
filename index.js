/*
Project Name : TODO List
Date Created : 13-03-2022
created by : Ansari Shahzeb Mohammed Gousoddin.
Languages Used : HTML5 CSS3 CORE JAVASCRIPT + ES6.
lines of code : HTML(30) CSS(74) JAVASCRIPT(157)
*/



// checking input field is empty or not.
let isEmpty = () =>{
    if(document.getElementById('taskField').value.trim() == ''){
        return true;
    }else{
        return false;
    }
}

//declearing taskList which will hold all Task Object  
let taskList = [];
//declearing layout list which will hold all layouts
let layoutList =[];

//constructor function for creating new Task;
function Task(id,state,value){
    this.id = id;
    this.state = state;
    this.value = value;

}
//checking new id is equal to any previous any task object id or not
let isIdEqualToPrevious = (id) =>{

    for(value of taskList){
        if(value.id == id){
            return true;
        }
    }
    return false;
}

//creating new id 
let getNewUniqueId = () =>{
    let id = Math.trunc((Math.random() *1000 +1));
    if(!isIdEqualToPrevious(id)){
        return id;
    }else{
        getNewUniqueId();
    }
}

//creating and storing new task layout
let createTaskLayout = () =>{
    layoutList = [];
    for(current of taskList){
        let task_wrapper = document.createElement('div');
        task_wrapper.className= 'task_wrapper';
        task_wrapper.id = current.id;

        if(current.state == true){
            task_wrapper.style.borderLeft = '5px solid #00b894'
        }else{
            task_wrapper.style.borderLeft = '5px solid #bdc3c7'
        }

        let input = document.createElement('input');
        input.type = 'checkbox';
        input.id = 'check';
        if(current.state){
            input.checked = true;
        }else{
            input.checked = false;
        }
        input.onchange = () => taskHasDone(task_wrapper.id) ;

        let p = document.createElement('p');
        p.innerHTML = current.value;

        if(current.state == true){
            p.style.textDecoration = 'line-through';
        }

        let i = document.createElement('i')
        i.className = 'fas fa-trash';

        let button = document.createElement('button');
        button.className = 'delete';
        button.appendChild(i);
        button.onclick = () => deleteTask(task_wrapper.id);

        task_wrapper.appendChild(input);
        task_wrapper.appendChild(p);
        task_wrapper.appendChild(button);
        //console.log(task_wrapper);

        layoutList.push(task_wrapper);
    }
    
    displayTasks();
    
}

//displaying layout into div 
let displayTasks = () =>{
    
    //let list_wrapper = document.getElementById('list_wrapper');
        document.getElementById('list-wrapper').innerHTML ='';
        console.log(layoutList.length)
    for(current of layoutList){
        console.log(current);
        document.getElementById('list-wrapper').appendChild(current);
    }
}

//creating and adding new task object into taskList
let addTaskToList = () =>{
    if(!isEmpty()){
        let str = document.getElementById('taskField').value;
        taskList.push(new Task(getNewUniqueId(), false, str));

        createTaskLayout();
    }else{
        alert('please enter your task');
    }
    
}

//finding index of element by using given id
let findIndex = (id) =>{
    for(i=0 ; i<taskList.length; i++){
        if(taskList[i].id == id){
            return i;
        }
    }
}

//function to handle task which have done
let taskHasDone = (wrapperId) =>{
    let isChecked = document.getElementById(wrapperId).firstElementChild.checked;
    let str = document.getElementById(wrapperId).childNodes[1].innerHTML.toString();
    console.log(str);

    if(isChecked){
        taskList.splice(findIndex(wrapperId),1,new Task(wrapperId,true,str));
        createTaskLayout();
    }else{
        taskList.splice(findIndex(wrapperId),1,new Task(wrapperId,false,str));
        createTaskLayout();
    }
}

//function to handle task which have deleted
let deleteTask = (wrapperId) =>{
    taskList.splice(findIndex(wrapperId),1);
    createTaskLayout();
}


