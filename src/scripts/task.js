import { listOfProjects } from "./project"

export let listOfTasks = [];

export class Task {

    constructor(description, target, done) {
        this.description = description;
        this.target = target;
        this.done = done;
        this.check()
        listOfTasks.push(this);
    };

    check() {
        listOfProjects.forEach((obj) => {
            if (obj.projectName == this.target) {
                obj.task.push(this.description);
            };
        });
    };
};



const task1 = new Task ('Learn Html css', 'Learning web dev', true);
const task4 = new Task ('Learn Node.js', 'Learning web dev', false);
const task5 = new Task ('Go Gym', 'Increase strength', true);
const task6 = new Task ('Exercise Breathing', 'Learn Swimming', true);
const task7 = new Task ('Do Projects', 'Learning web dev', true);
const task8 = new Task ('Learn to hold Breath', 'Learn Swimming', true);
const task9 = new Task ('Internship', 'Learning web dev', false);
const task10 = new Task ('Lift Weights', 'Increase strength', true);
const task2 = new Task ('Learn to Kick underwater', 'Learn Swimming', false);
const task3 = new Task ('Learn React', 'Learning web dev', false);
const task12 = new Task ('Leg Day', 'Increase strength', false);
const task13 = new Task ('Chest Day', 'Increase strength', false);

console.log(listOfProjects);
console.log(listOfTasks);