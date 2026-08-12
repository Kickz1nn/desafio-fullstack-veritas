package validators

import (
	"strings"

	"desafio-fullstack-veritas/backend/models"
)

func ValidateTask(task models.Task) (models.Task, string) {
	task.Title = strings.TrimSpace(task.Title)

	if task.Title == "" {
		return task, "O título da tarefa não pode estar vazio"
	}

	switch task.Status {
	case "todo", "in_progress", "done":
		return task, ""
	default:
		return task, "Status inválido"
	}

}
