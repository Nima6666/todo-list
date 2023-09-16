import { listOfProjects } from "./project"

let listOfTasks = [];

export class Task {

    constructor(description, target, done) {
        this.description = [description];
        this.done = done;
        listOfTasks.push(this);
        this.check()
    }

    check() {
        for (let i = 0; i < listOfProjects.length; i++) {
            if (listOfProjects[i].projectName == this.target) {
                listOfProjects[i].task = this.description;
                console.log(listOfProjects[i])
            }   
        }
    }

}



const task1 = new Task ('done Projects', 'Learning web dev', true);
const task2 = new Task ('done Projects alkjsdhl', 'Learning web dev', false);

console.log(listOfTasks)