package storage

import "desafio-fullstack-veritas/backend/models"

var tasks = []models.Task{
	{
		ID:     1,
		Title:  "Tarefa 1",
		Status: "todo",
	},
}

var nextID = 2

func GetAllTask() []models.Task {
	return tasks
}

func CreateTask(task models.Task) models.Task {
	task.ID = nextID
	nextID++

	tasks = append(tasks, task)

	return task
}

func UpdateTask(id int, updatedTask models.Task) (models.Task, bool) {
	for i, task := range tasks {
		if task.ID == id {
			updatedTask.ID = id
			tasks[i] = updatedTask

			return updatedTask, true
		}
	}

	return models.Task{}, false
}

func DeleteTask(id int) bool {
	for i, task := range tasks {
		if task.ID == id {
			tasks = append(tasks[:i], tasks[i+1:]...)
			return true
		}
	}

	return false
}
