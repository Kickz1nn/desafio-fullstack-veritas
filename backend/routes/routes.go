package routes

import (
	"net/http"
	"strings"

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

	mux.HandleFunc("/tasks/", func(w http.ResponseWriter, r *http.Request) {
		path := strings.TrimPrefix(r.URL.Path, "/tasks/")

		if path == "" {
			http.Error(w, "ID da tarefa não fornecido", http.StatusBadRequest)
			return
		}

		switch r.Method {
		case http.MethodPut:
			handlers.UpdateTask(w, r, path)
		default:
			http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
		}
	})

	return mux
}
