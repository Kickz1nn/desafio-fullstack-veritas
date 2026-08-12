package routes

import (
	"net/http"

	"desafio-fullstack-veritas/backend/handlers"
)

func SetupRoutes() *http.ServeMux {
	mux := http.NewServeMux()

	mux.HandleFunc("/tasks", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet:
			handlers.GetTasks(w, r)
		case http.MethodPost:
			handlers.CreateTask(w, r)
		default:
			http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
		}
	})

	return mux
}
