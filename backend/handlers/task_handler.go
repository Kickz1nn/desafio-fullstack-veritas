package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"desafio-fullstack-veritas/backend/models"
	"desafio-fullstack-veritas/backend/storage"
	"desafio-fullstack-veritas/backend/validators"
)

func GetTasks(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	tasks := storage.GetAllTask()

	json.NewEncoder(w).Encode(tasks)
}

func CreateTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var task models.Task

	err := json.NewDecoder(r.Body).Decode(&task)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	task, validationError := validators.ValidateTask(task)

	if validationError != "" {
		http.Error(w, validationError, http.StatusBadRequest)
		return
	}

	createdTask := storage.CreateTask(task)

	w.WriteHeader(http.StatusCreated)

	json.NewEncoder(w).Encode(createdTask)
}

func UpdateTask(w http.ResponseWriter, r *http.Request, idString string) {
	w.Header().Set("Content-Type", "application/json")

	id, err := strconv.Atoi(idString)

	if err != nil {
		http.Error(w, "ID inválido", http.StatusBadRequest)
		return
	}

	var task models.Task

	err = json.NewDecoder(r.Body).Decode(&task)

	if err != nil {
		http.Error(w, "JSON inválido", http.StatusBadRequest)
		return
	}

	task, validationError := validators.ValidateTask(task)

	if validationError != "" {
		http.Error(w, validationError, http.StatusBadRequest)
		return
	}

	updatedTask, found := storage.UpdateTask(id, task)

	if !found {
		http.Error(w, "Tarefa não encontrada", http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(updatedTask)
}

func DeleteTask(w http.ResponseWriter, r *http.Request, idString string) {
	id, err := strconv.Atoi(idString)

	if err != nil {
		http.Error(w, "ID inválido", http.StatusBadRequest)
		return
	}

	deleted := storage.DeleteTask(id)

	if !deleted {
		http.Error(w, "Tarefa não encontrada", http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
