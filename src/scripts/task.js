import { listOfProjects } from "./project"
import Render from "./render";

export let listOfTasks = [];

export class Task {
    
    constructor(description, target, done) {
        this.description = description;
        this.target = target;
        this.done = done;
        this.check()
        listOfTasks.push(this);
    };
    
    check(scope) {
        let a;

        if (scope) {
            listOfProjects.forEach((obj) => {
                obj.task.forEach((one) => {
                    if (one.description == this.description) {
                        console.log(one, this);
                        a = one;
                    }
                })
            })
            return a;
        } else {

            listOfProjects.forEach((obj) => {
                if (obj.projectName == this.target) {
                    obj.task.push({description: this.description, done: this.done});
                }
            })
        }
    }

    del() {
        listOfTasks.splice(listOfTasks.indexOf(this), 1);
        // console.log(this.check(1))
    }

    edit() {
        
    }
    
    tick() {
        
    }

    sc(scope) {

        if (scope == 'alltasks') {
            Render.fillTasks(listOfTasks);
        } else if (scope == 'projet') {
            listOfProjects.forEach((proj) => {
                if (proj.projectName == this.target) {
                    console.log(proj.task.indexOf(this.check(1)));
                    (proj.task).splice((proj.task).indexOf(this.check(1)), 1)
                    this.del();
                    Render.fillTasks(proj.task);
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