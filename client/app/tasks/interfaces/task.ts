export interface Task{
    _id:string;
    name:string;
    date:number;
    project:string;
    completed:boolean;
}


export function tasksToMap(tasks:Task[]):Map<string,Task[]>{
    const taskMap = new Map<string,Task[]>();
    for (let task of tasks){
        const newArr:Task[] = taskMap.get(task.project) === undefined? [task]:taskMap.get(task.project)?.concat(task) as Task[]
        taskMap.set(task.project, newArr)
    }
    return taskMap
}

export const addTaskMap = (task:Task, taskMap:Map<string,Task[]>):Map<string,Task[]> => {
    const tempTaskMap:Map<string,Task[]> = new Map(taskMap)
    tempTaskMap.get(task.project) === undefined ? tempTaskMap.set(task.project, [task]) : tempTaskMap.set(task.project, (tempTaskMap.get(task.project) as Task[]).concat(task))
    return tempTaskMap;
}

export const removeTaskMap = (task:Task, taskMap:Map<string,Task[]>):Map<string,Task[]> => {
    const tempTaskMap:Map<string,Task[]> = new Map(taskMap)
    if (tempTaskMap.get(task.project) === undefined) return taskMap;
    
    return tempTaskMap;
}
