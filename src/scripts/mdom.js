import Render from "./render";
import { compareAsc, format } from 'date-fns'
import { Project, listOfProjects } from "./project";
import { Task, listOfTasks } from "./task";
import { da } from "date-fns/locale";
import delImg from '../assets/delete.png'
import editImg from '../assets/edit.png'
import circleImg from '../assets/circle.png'
import { render } from "sass";

const mDom = (() => {

    let editing;

    let currentProject;
    const content = document.querySelector('.content');
    let contentTexts = "";
    let flagForTaskForm;

    const checkPriority = () => {
        editing = false;
        for(let i = 0; i < listOfProjects.length; i++) {
            if (listOfProjects[i].priority == "high") {
                (document.querySelector(`.project${i}`)).setAttribute('style', 'background: rgba(255, 0, 0, 0.7)');
            } else if (listOfProjects[i].priority == "medium") {
                (document.querySelector(`.project${i}`)).setAttribute('style', 'background: rgba(255, 0, 0, 0.3)');
            }

            if (listOfProjects[i].task.length > 0 && listOfProjects[i].task.every((t) => t.done == true)) {
                (document.querySelector(`.project${i}`)).setAttribute('style', 'background: rgba(0, 255, 0, 0.4)');
            }

        }

    }

    const checkStat = (tasks) => {

        for(let i = 0; i < tasks.length ; i++) {

            if (tasks[i].done) {
                let doc = document.querySelector(`.task${i}`);
                if (!doc) return;
                doc.setAttribute('style', 'text-decoration: line-through');
                let circ = document.querySelector(`.task${i} > .iimages > img:last-of-type`);
                if (circ) {
                    circ.setAttribute('style', 'background: green;')
                }
            }
        }
    }

    
    const projectEventListner = () => {
        (document.querySelectorAll('#allprojects > div')).forEach((proj) => {
            const btn = document.querySelectorAll('#allprojects > div > button')
            proj.addEventListener('click', (e) => {
                if (e.target.nodeName == 'BUTTON' ) {return}
                buttonHandler.projectClick(proj);
                currentProject = listOfProjects[(proj.classList.value).split('t')[1]]
            });
        })
        taskEventListner()
    }
    
    const taskEventListner = () => {
        
        
        const tasksFImg = document.querySelectorAll('.iimages > img')
        
        tasksFImg.forEach((taskImg, key) => taskImg.addEventListener('click', () => {
            if (editing) {return}
            buttonHandler.taskButtons(taskImg, key);
        }))

    }

    const projectBtnListener = () => {
        const delBttns = document.querySelectorAll('#allprojects > div >button');
        delBttns.forEach((bttn) => {
            bttn.addEventListener('click', buttonHandler.projDelbtn);
        })
    }
    

    const fillProjects = (list, i) => {

        contentTexts += `

                    <div class="project${i}">
                        <button id = ${i}>Del</button>
                        <h2 class="name">${list[i].projectName}</h2>
                        <div>${list[i].date}</div>
                    </div>
        
        `;
        content.innerHTML = contentTexts;


    };

    const fillTasks = (task, i) => {

        

        const imgHtml = `<div class="iimages">
                            <img src=${delImg} id="d">
                            <img src=${editImg} id = "e">
                            <img src=${circleImg} id = "c">
                        </div>`
        contentTexts += `
        
                    <div class="task${i}">
                        ${task.description}
                        ${task.target ? "" : imgHtml}
                    </div>

        `;

        content.innerHTML = contentTexts;

    }

    const resetCotext = () => {
        flagForTaskForm = false
        contentTexts = "";
        content.innerHTML = contentTexts;
    };

    const addTask = (e) => {
        if (flagForTaskForm) {return}
        if (editing) {return}
        flagForTaskForm = true
        const taskForm = document.createElement('div')
        taskForm.id = 'taskForm'
        taskForm.innerHTML = `
                <input type="text" id="taskName" placeholder = "New Task Name"></input>
                <button type="button" id="aaa">Add</button>
                <button type="button" id="ccc">Cancel</button>
            `;
        content.appendChild(taskForm);
        document.querySelector('#aaa').addEventListener('click', () => {
            if (!document.querySelector('#taskName').value) {alert(`this field cannot be empty`); content.removeChild(taskForm); flagForTaskForm = false; return;}
            const newTask = new Task(document.querySelector('#taskName').value, currentProject.projectName, false)
            newTask.checkTarget()
            Render.fillTasks(currentProject.task)
            buttonHandler.projectClick(currentProject.task)
        })
        document.querySelector('#ccc').addEventListener('click', () => {
            content.removeChild(taskForm)
            flagForTaskForm = false
        })

    }

    const editTask = (img, task) => {
        editing = true;
        const taskElem = img.parentElement.parentElement

        const name = taskElem.textContent
        taskElem.innerHTML = `
                            <input name="taskEdit" value="${name.trim()}">
                            <button name="ok">ok</button>
                            `

        document.querySelector('[name="ok"]').addEventListener('click', () => {
            const edited = document.querySelector('[name="taskEdit"]').value
            task.edit(edited);
            task.sc('projet');
            editing = false;
        })

        
    }
    
    const fillNote = (note) => {
        const noteDiv = document.createElement('div');
        noteDiv.id = 'notes'
        noteDiv.textContent = `Note: ${note}`;
        content.appendChild(noteDiv);
    }

    return {
        fillProjects,
        fillTasks,
        resetCotext,
        checkPriority,
        checkStat,
        projectEventListner,
        taskEventListner,
        projectBtnListener,
        addTask,
        editTask,
        fillNote
    }



})();


export const buttonHandler = (() => {
    const dvForm = document.querySelector('.form');
    
    function cross() {
        dvForm.classList.remove('active');
        (document.querySelector('form')).reset();
    }

    const addP = () => {

        
        dvForm.classList.add('active');
        const crossBtn = document.querySelector('#cross');
        crossBtn.addEventListener('click', cross);
    
        
    } 

    const submit = (a) => {
        if (a.target.id !== 'sub') {return}
        let date = (document.querySelector('#date').value)
        date = date.split('-');
        date = format(new Date(date[0], date[1], date[2]), 'eeee yyyy-MM-dd');
        const newProj = new Project(document.querySelector('#project').value, document.querySelector('#note').value, date, (document.querySelector('#priority').value));
        newProj.addtoList();
        document.querySelector('form').id = 'sub';
        Render.fillProjects();
        cross();

    }

    const lside = (ev) => {
        (document.querySelectorAll('.lside > *')).forEach((comp) => {
            comp.classList.value ? comp.classList.remove('active') : 0;
        })
        ev.target.classList.add('active');
        (document.querySelector('.content')).id = (ev.target.innerHTML.split(' ').join('')).toLowerCase();

        if (document.querySelector('.content').id == 'alltasks') {

            mDom.resetCotext();
            Render.fillTasks(listOfTasks);

        } else if (document.querySelector('.content').id == 'allprojects') {

            mDom.resetCotext();
            Render.fillProjects();

        } else if (document.querySelector('.content').id == 'donetasks') {

            mDom.resetCotext();
            Render.fillDoneTasks();

        } else if (document.querySelector('.content').id == 'duetasks'){
            mDom.resetCotext();
            Render.fillDueTasks();
        }

    }

    const projectClick = (proj) => {
        if (proj.classList && proj.classList.value) {
            const index = (((proj.classList.value).split('t'))[1]);
            (document.querySelector('.content')).id = 'projet';
            Render.fillTasks(listOfProjects[index].task);
        }

        const nav = document.createElement('div');
        nav.id = 'navi';

        nav.innerHTML = `
                    <button id ="back">go back to projects</button>
                    <button id ="addtask">Add a new Task</button>
                    
        `;

        
        document.querySelector('.content').append(nav)

        const backBtn = document.querySelector('#back');

        const addTskBtn = document.querySelector('#addtask')

        backBtn.addEventListener('click', Render.fillProjects)

        addTskBtn.addEventListener('click', mDom.addTask);

    }

    const projDelbtn = (e) => {
        listOfProjects[e.target.id].rem()
        Render.fillProjects()
    }

    const taskButtons = (taskImg) => {
        const scope = ((taskImg.parentElement).parentElement.parentElement).id
        for (let i = listOfTasks.length - 1; i >= 0; i--) {
            const task = listOfTasks[i];
            const taskDescription = ((taskImg.parentElement).parentElement.textContent).trim();
        
            if (task.description == taskDescription) {
                if (taskImg.id == 'd') {
                    task.del();
                    task.sc(scope);
                    return
                } else if (taskImg.id == 'e') {
                    mDom.editTask(taskImg, task);
                    return
                } else if (taskImg.id == 'c'){
                    task.tick();
                    task.sc(scope);
                    return
                }
            }
        }
    }
    

    return {
        addP,
        submit,
        lside,
        projectClick,
        projDelbtn,
        taskButtons
    }

})()


const newProject = document.querySelector('#addProject');
const form = document.querySelector('form');
const lside = document.querySelectorAll('.lside > *');
const alltasksTab = document.querySelector('.lside > h3');


lside.forEach((side) => side.addEventListener('click', buttonHandler.lside));

form.addEventListener('submit', buttonHandler.submit);

newProject.addEventListener('click', buttonHandler.addP);


export default mDom;