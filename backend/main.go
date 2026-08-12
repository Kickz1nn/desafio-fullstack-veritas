package main

import (
	"fmt"
	"net/http"

	"desafio-fullstack-veritas/backend/routes"
)

func main() {
	router := routes.SetupRoutes()

	fmt.Println("Servidor rodando em http://localhost:8080")

	err := http.ListenAndServe(":8080", router)

	if err != nil {
		fmt.Println("Erro ao inicializar o servidor: ", err)
	}
}
