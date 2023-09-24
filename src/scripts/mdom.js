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
    const content = document.querySelector('.content');
    let contentTexts = "";

    const checkPriority = () => {
        for(let i = 0; i < listOfProjects.length; i++) {
            if (listOfProjects[i].priority == "high") {
                (document.querySelector(`.project${i}`)).setAttribute('style', 'background: rgba(255, 0, 0, 0.7)');
            } else if (listOfProjects[i].priority == "medium") {
                (document.querySelector(`.project${i}`)).setAttribute('style', 'background: rgba(255, 0, 0, 0.3)');
            }
        }
    }

    const checkStat = (tasks) => {

        for(let i = 0; i < tasks.length-1 ; i++) {

            if (tasks[i].done) {
                let doc = document.querySelector(`.task${i}`);
                if (!doc) return;
                doc.setAttribute('style', 'text-decoration: line-through');
            }
        }
    }

    
    const projectEventListner = () => {
        (document.querySelectorAll('#allprojects > div')).forEach((proj) => {
            const btn = document.querySelectorAll('#allprojects > div > button')
            proj.addEventListener('click', (e) => {
                if (e.target.nodeName == 'BUTTON' ) {return}
                buttonHandler.projectClick(proj);
            });
        })
        taskEventListner()
    }
    
    const taskEventListner = () => {

        const tasksFImg = document.querySelectorAll('.iimages > img')

        tasksFImg.forEach((taskImg, key) => taskImg.addEventListener('click', () => {
            buttonHandler.taskButtons(taskImg, key);
        }))

    }

    const projectBtnListener = () => {
        const delBttns = document.querySelectorAll('#allprojects > div >button:first-of-type');
        const editBttns = document.querySelectorAll('#allprojects > div >button:last-of-type');
        delBttns.forEach((bttn) => {
            bttn.addEventListener('click', buttonHandler.projDelbtn);
        })

        editBttns.forEach((bttn) => {
            bttn.addEventListener('click', buttonHandler.projEditbtn);
        })
    }

    const taskBtnListener = () => {

    }
    

    const fillProjects = (list, i) => {

        contentTexts += `

                    <div class="project${i}">
                        <button id = ${i}>Del</button>
                        <button id = e${i}>Edit</button>
                        <h2 class="name">${list[i].projectName}</h2>
                        <div class="name">${list[i].date}</div>
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
                        ${imgHtml}
                    </div>

        `;

        content.innerHTML = contentTexts;

    }

    const resetCotext = () => {
        contentTexts = "";
        content.innerHTML = contentTexts;
    };

    return {
        fillProjects,
        fillTasks,
        resetCotext,
        checkPriority,
        checkStat,
        projectEventListner,
        taskEventListner,
        projectBtnListener,
        taskBtnListener
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

    const addPedit = (proj) => {

        dvForm.classList.add('active');
        const crossBtn = document.querySelector('#cross');
        crossBtn.addEventListener('click', cross);

        document.querySelector('#project').value = proj.projectName;
        document.querySelector('#note').value = proj.notes
        document.querySelector('#date').value = (proj.date.split(' ')[1])
        document.querySelector('#priority').value = proj.priority
    }

    const submitEdit = (proj) => {
        let dateEd = (document.querySelector('#date').value);
        const dateEdited = dateEd.split('-');
        console.log(dateEdited);
        console.log(proj)
        dateEd = format(new Date(dateEdited[0], dateEdited[1], dateEdited[2]), 'eeee yyyy-MM-dd');
            

        proj.projectName = document.querySelector('#project').value
        proj.notes = document.querySelector('#note').value
        proj.date = dateEd;
        proj.priority = document.querySelector('#priority').value;

        Render.fillProjects();
        cross();
    }

    const submit = (a) => {
        console.log(a.target.id)
        if (a.target.id !== 'sub') {return}
        alert('sub')
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
        const index = (((proj.classList.value).split('t'))[1]);
        (document.querySelector('.content')).id = 'projet';
        Render.fillTasks(listOfProjects[index].task);

        const nav = document.createElement('div');
        nav.id = 'navi';

        nav.innerHTML = `
                    <button id ="back">go back to projects</button>
                    <button id ="addtask">Add a new Task</button>
                    
        `;

        document.querySelector('.content').append(nav)

        const backBtn = document.querySelector('#back');

        backBtn.addEventListener('click', Render.fillProjects)

    }

    const projDelbtn = (e) => {
        listOfProjects[e.target.id].rem()
        Render.fillProjects()
    }

    const projEditbtn = (e) => {
        listOfProjects[((e.target.id).replace('e', ''))].edit()
        console.log(e.target.id)
        Render.fillProjects()
    }

    const taskButtons = (taskImg, key) => {
        const scope = ((taskImg.parentElement).parentElement.parentElement).id
        listOfTasks.forEach((task) => {
            if (task.description == ((taskImg.parentElement).parentElement.textContent).trim()) {
                if (taskImg.id == 'd') {
                    task.del()
                    task.sc(scope)
                } else if (taskImg.id == 'e') {
                    task.edit()
                    task.sc(scope)
                } else {
                    task.tick()
                    task.sc(scope)
                }
            }
        })
    }
    

    return {
        addP,
        submit,
        lside,
        projectClick,
        projDelbtn,
        projEditbtn,
        addPedit,
        taskButtons,
        submitEdit
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