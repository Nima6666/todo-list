import { listOfTasks } from './task.js';
import { listOfProjects} from './project.js';
import mDom from './mdom';



const Render = (() => {

    const fillProjects = () => {
        (document.querySelector('.content')).id = "allprojects";
        (document.querySelector('.lside > h3:last-of-type')).classList.value = 'active';
        mDom.resetCotext();
        for(let i = 0; i < listOfProjects.length; i++) {
            mDom.fillProjects(listOfProjects, i);
        }
        
        mDom.checkPriority();
        mDom.projectEventListner();
        mDom.projectBtnListener();

    }

    const fillTasks = (tasks) => {
        mDom.resetCotext();

        if (!tasks.length) {alert('Add Tasks to your Project')}
        
        tasks.forEach((task, i) => {
            mDom.fillTasks(task, i)
        });

        
        mDom.checkStat(tasks);
        mDom.taskEventListner();
        
        if (tasks.target) {return}
        listOfProjects.forEach((project) => {
            if (project.task == tasks) {
                mDom.fillNote(project.notes);
            }
        })
    }

    const fillDoneTasks = () => {
        mDom.resetCotext();

        listOfTasks.forEach((task, i) => {
            if (task.done) {
                mDom.fillTasks(task, i);
            }
        })

        mDom.checkStat(listOfTasks);
        mDom.taskEventListner();

    }

    const fillDueTasks = () => {
        mDom.resetCotext();

        listOfTasks.forEach((task, i) => {
            if (!task.done) {
                mDom.fillTasks(task, i);
            }
        })

        mDom.checkStat(listOfTasks);
        mDom.taskEventListner();

    }

    return {
        fillProjects,
        fillTasks,
        fillDoneTasks,
        fillDueTasks
    }

})()

export default Render;