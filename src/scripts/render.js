require('./project.js');
import { listOfTasks } from './project.js';
import mDom from './mdom';



const Render = (() => {

    const fill = () => {

        for(let i = 0; i < listOfTasks.length; i++) {
            mDom.fill(listOfTasks, i);
        }
        
        mDom.checkPriority();

    }

    return {
        fill
    }

})()

export default Render;