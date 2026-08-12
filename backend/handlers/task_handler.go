package handlers

import (
	"encoding/json"
	"net/http"

	"desafio-fullstack-veritas/backend/storage"
)

func GetTasks(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	tasks := storage.GetAllTask()

	json.NewEncoder(w).Encode(tasks)
}
