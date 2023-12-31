import { compareAsc, format } from 'date-fns'
import { listOfTasks } from './task';
import { buttonHandler } from './mdom';



export let listOfProjects = [];

export class Project {
    constructor (projectName, notes, date, priority ) {
        this.projectName = projectName;
        this.notes = notes;
        this.date = date;
        this.priority = priority;
        this.task = [];
    };

    addtoList() {
        listOfProjects.push(this);
    }


    rem() {
        for (let i = listOfTasks.length - 1; i >= 0; i--) {
            if (this.projectName === listOfTasks[i].target) {
                listOfTasks[i].del()
            }
        }    

        listOfProjects.splice(listOfProjects.indexOf(this), 1)

    }
    

}

const task1 = new Project('Learning web dev', 'i want to learn', `${format((new Date()).setDate(((new Date()).getDate() - 40)), 'eeee yyyy-MM-dd')}`, 'high');
const task2 = new Project('Increase strength', 'i want to be strong', `${format((new Date()).setDate(((new Date()).getDate() - 30)), 'eeee yyyy-MM-dd')}`, 'medium');
const task3 = new Project('Learn Swimming', 'Want to Learn Swimming so Bad.', `${format((new Date()).setDate(((new Date()).getDate() - 4)), 'eeee yyyy-MM-dd')}`, 'low');

task1.addtoList()
task2.addtoList()
task3.addtoList()