package handlers

import (
	"encoding/json"
	"net/http"

	"desafio-fullstack-veritas/backend/models"
	"desafio-fullstack-veritas/backend/storage"
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

	createdTask := storage.CreateTask(task)

	w.WriteHeader(http.StatusCreated)

	json.NewEncoder(w).Encode(createdTask)
}
