package storage

import "desafio-fullstack-veritas/backend/models"

var tasks = []models.Task{
	{
		ID:     1,
		Title:  "Tarefa 1",
		Status: "todo",
	},
}

func GetAllTask() []models.Task {
	return tasks
}

func CreateTask(task models.Task) models.Task {
	task.ID = len(tasks) + 1

	tasks = append(tasks, task)

	return task
}
