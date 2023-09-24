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

        if (!tasks.length) {alert('ladooooooooooooooooo')}
        
        tasks.forEach((task, i) => {
            mDom.fillTasks(task, i)
        });

        mDom.checkStat(tasks);
        mDom.taskEventListner();
        mDom.taskBtnListener();

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
        mDom.taskBtnListener();

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
        mDom.taskBtnListener();

    }

    return {
        fillProjects,
        fillTasks,
        fillDoneTasks,
        fillDueTasks
    }

})()

export default Render;