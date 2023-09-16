require('./project.js');
import { listOfProjects, listOfTasks } from './project.js';
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

    }

    const fillTasks = () => {
        mDom.resetCotext();

    }

    const fillDoneTasks = () => {
        mDom.resetCotext();
    }

    const fillDueTasks = () => {
        mDom.resetCotext();
    }

    return {
        fillProjects,
        fillTasks,
        fillDoneTasks,
        fillDueTasks
    }

})()

export default Render;