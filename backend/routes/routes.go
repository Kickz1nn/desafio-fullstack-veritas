package routes

import (
	"net/http"

	"desafio-fullstack-veritas/backend/handlers"
)

func SetupRoutes() *http.ServeMux {
	mux := http.NewServeMux()

	mux.HandleFunc("/tasks", handlers.GetTasks)

	return mux
}
