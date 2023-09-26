import mDom, { buttonHandler } from "./mdom";
import { listOfProjects } from "./project"
import Render from "./render";

export let listOfTasks = [];

export class Task {
    
    constructor(description, target, done) {
        this.description = description;
        this.target = target;
        this.done = done;
        let editin;
    };
    
    checkTarget() {
        
        listOfProjects.forEach((obj) => {
            if (obj.projectName == this.target) {
                obj.task.push({description: this.description, done: this.done});
            }
        })
        listOfTasks.push(this);
    }

    del() {
        listOfTasks = listOfTasks.filter(task => task !== this);
        listOfProjects.forEach((project) => {
            project.task = project.task.filter(task => task.description !== this.description);
        });
    }

    edit(editedTask) {
        for (let i = listOfProjects.length-1; i >= 0; i--) {
            if (listOfProjects[i].projectName == this.target) {
                listOfProjects[i].task.forEach((item) => {
                    if (item.description == this.description) {
                        item.description = editedTask
                    }
                })
            }
        }
        listOfTasks.splice(listOfTasks.indexOf(this), 1, new Task(editedTask.trim(), this.target, this.done, 'edit'));
    }
    
    tick() {
        this.done = !this.done;
        for (let i = listOfProjects.length-1; i >= 0; i--) {
            if (listOfProjects[i].projectName == this.target) {
                listOfProjects[i].task.forEach((item) => {
                    if (item.description == this.description) {
                        item.done = this.done
                    }
                })
            }
        }

    }

    sc(scope) {

        if (scope == 'alltasks') {
            Render.fillTasks(listOfTasks);
        } else if (scope == 'projet') {
            listOfProjects.forEach((project) => {
                if (project.projectName === this.target) {
                    Render.fillTasks(project.task)
                    buttonHandler.projectClick(project.task)
                }
            })
        } else if (scope == 'donetasks') {
            Render.fillDoneTasks()
        } else {
            Render.fillDueTasks()
        }

    }

}



const task1 = new Task ('Learn Html css', 'Learning web dev', true);
const task7 = new Task ('Do Projects lot of it', 'Learning web dev', true);
const task4 = new Task ('Learn Node.js', 'Learning web dev', false);
const task5 = new Task ('Go Gym', 'Increase strength', true);
const task6 = new Task ('Exercise Breathing', 'Learn Swimming', true);
const task8 = new Task ('Learn to hold Breath', 'Learn Swimming', true);
const task9 = new Task ('Internship', 'Learning web dev', false);
const task10 = new Task ('Lift Weights', 'Increase strength', true);
const task2 = new Task ('Learn to Kick underwater', 'Learn Swimming', false);
const task3 = new Task ('Learn React', 'Learning web dev', false);
const task12 = new Task ('Train your Legs', 'Increase strength', false);
const task13 = new Task ('Chest Day', 'Increase strength', false);

task1.checkTarget()
task2.checkTarget()
task3.checkTarget()
task4.checkTarget()
task5.checkTarget()
task6.checkTarget()
task7.checkTarget()
task8.checkTarget()
task9.checkTarget()
task10.checkTarget()
task12.checkTarget()
task13.checkTarget()