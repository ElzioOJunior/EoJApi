# Tivia
Api desenvolvida para participação no processo seletivo.

A API tem por finalidade expor endpoints para cadastro de usuários, login e autenticação via JWT.

 - IDE utilizada para desenvolvimento:
        Visual Studio Code

 - Tecnologia Usada: 
        Node.Js

 - Base de dados:
        Mongo DB

 - Outros recursos utilizados:
        EsLint
        Express
        
 Como executar:
 Os Endpoints são:
 
 #Login -> https://apieoj.herokuapp.com/api/login
 Realizar um post com o modelo de json abaixo
 {
    "email": "teste@teste.com",
    "senha": "688eb3276ac518726abb0a04f9fe2f01"
 }
 
 #Salvar usuário -> https://apieoj.herokuapp.com/api/usuarios
 Realizar um post com o modelo de json abaixo
 {
    "nome": "Elzio",
    "email": "elziooliveira@msn.com",
    "senha": "123546",   
    "telefone": [{
      "numero": "991587892",
	     "ddd": "19"
	}]
}

#Buscar usuário -> https://apieoj.herokuapp.com/api/usuarios/{id}
Realizar um get substituindo a variável ID por um id válido.
Informar no header a variável token, passando um token válido.

