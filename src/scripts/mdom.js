import Render from "./render";
import { compareAsc, format } from 'date-fns'
import { Project, listOfProjects } from "./project";
import { Task, listOfTasks } from "./task";
import { da } from "date-fns/locale";
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

    const checkStat = () => {
        for(let i = 0; i < listOfTasks.length-1 ; i++) {

            if (listOfTasks[i].done) {
                let doc = document.querySelector(`.task${i}`);
                if (!doc) return;
                doc.setAttribute('style', 'text-decoration: line-through');
            }
        }
    }

    const projectEventListner = () => {
        (document.querySelectorAll('#allprojects > *')).forEach((proj) => {
            proj.addEventListener('click', () => {
                buttonHandler.projectClick(proj);
            });
        })
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

        contentTexts += `
        
                    <div class="task${i}">
                        ${task.description ? task.description : task}
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
        projectEventListner
    }



})();


const buttonHandler = (() => {
    const dvForm = document.querySelector('.form');
    
    function cross() {
        dvForm.classList.remove('active');
    }

    const addP = () => {

        dvForm.classList.add('active');
        const crossBtn = document.querySelector('#cross');
        crossBtn.addEventListener('click', cross);

    } 

    const submit = () => {
        let date = (document.querySelector('#date').value)
        date = date.split('-');
        date = format(new Date(date[0], date[1], date[2]), 'eeee yyyy-MM-dd');
        const newProjt = new Project(document.querySelector('#project').value, document.querySelector('#note').value, date, (document.querySelector('#priority').value));
        (document.querySelector('form')).reset();
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
        (document.querySelector('.content')).id = 'project';
        console.log(listOfProjects[index].task);
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
    

    return {
        addP,
        submit,
        lside,
        projectClick
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