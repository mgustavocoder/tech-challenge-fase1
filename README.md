# Projeto lanchonete DDD com Arquitetura Hexagonal (Ports and Adapters)
Esse projeto é o Tech Challenge da fase 1 da Pós Tech da FIAP em Arquitetura de Software, que consiste um uma aplicação monolítica para uma lanchonete, com uma API contendo funcionalidades de cadastro e listagem de produtos, realização de pedidos, entre outras coisas, vide documentação da API abaixo.

A incialização do projeto, containers de aplicação, banco de dados são feitos através da ferramenta docker compose.

A arquitetura de software é a Arquitetura Hexagonal, juntamente com a modelagem Domain Driven Design.

O design estratégico e tático do DDD, além do Event Storming pode ser encontrado nessa página do Miro

https://miro.com/app/board/uXjVKKkB6uI=/?share_link_id=33815948017


## Executando o projeto
Execute o projeto utilizando o **Docker Compose**, executando o comando abaixo, na raíz do projeto
```
docker-compose up --build
```
Esse comando irá subir dois containers docker (**tc-db** e **tc-app**), um para servir o banco de dados MySQL e outro para rodar a aplicação NodeJS.

## Documentação da API
### Adicionar um lanche ao cardápio:
```
curl --request POST \
  --url http://localhost:3000/api/produtos \
  --header 'Content-Type: application/json' \
  --cookie JSESSIONID=90ED2EA964471F20F03954DE12951B0B \
  --data '{
	"nome": "X-Bacon",
	"descricao": "Hambúrguer, presunto, mussarela, bacon, alface, tomate, catchup e maionese do cheff",
  "preco": 36.00,
  "categoria": "LANCHE"
}'
```
### Adicionar um acompanhamento ao cardápio:
```
curl --request POST \
  --url http://localhost:3000/api/produtos \
  --header 'Content-Type: application/json' \
  --cookie JSESSIONID=90ED2EA964471F20F03954DE12951B0B \
  --data '{
	"nome": "Nostro Chips Crocante",
	"descricao": "Deliciosa Batata Asterix Crocante",
  "preco": 7.00,
  "categoria": "ACOMPANHAMENTO"
}'
```
### Adicionar uma bebida ao cardápio:
```
curl --request POST \
  --url http://localhost:3000/api/produtos \
  --header 'Content-Type: application/json' \
  --cookie JSESSIONID=90ED2EA964471F20F03954DE12951B0B \
  --data '{
	"nome": "Coca cola 2l",
	"descricao": "",
  "preco": 12.00,
  "categoria": "BEBIDA"
}'
```
### Adicionar uma sobremesa ao cardápio:
```
curl --request POST \
  --url http://localhost:3000/api/produtos \
  --header 'Content-Type: application/json' \
  --cookie JSESSIONID=90ED2EA964471F20F03954DE12951B0B \
  --data '{
	"nome": "Mentos Frutas",
	"descricao": "Mentos Pastilhas/Balinhas redondo ",
  "preco": 3.00,
  "categoria": "SOBREMESA"
}'
```
### Listar todos os produtos:
```
curl --request GET \
  --url http://localhost:3000/api/produtos \
  --cookie JSESSIONID=90ED2EA964471F20F03954DE12951B0B
```
### Listar todos os lanches:
```
curl --request GET \
  --url http://localhost:3000/api/lanches \
  --cookie JSESSIONID=90ED2EA964471F20F03954DE12951B0B
```
### Listar todos os acompanhamentos:
```
curl --request GET \
  --url http://localhost:3000/api/acompanhamentos \
  --cookie JSESSIONID=90ED2EA964471F20F03954DE12951B0B
```
### Listar todos as bebidas:
```
curl --request GET \
  --url http://localhost:3000/api/bebidas \
  --cookie JSESSIONID=90ED2EA964471F20F03954DE12951B0B
```
### Listar todos as sobremesas:
```
curl --request GET \
  --url http://localhost:3000/api/sobremesas \
  --cookie JSESSIONID=90ED2EA964471F20F03954DE12951B0B
```
### Cadastrar cliente:
```
curl --request POST \
  --url http://localhost:3000/api/acessos/sign-up \
  --header 'Content-Type: application/json' \
  --cookie JSESSIONID=90ED2EA964471F20F03954DE12951B0B \
  --data '{
	"nome": "Sergio Lago",
	"email": "sergio.lago@teste.com",
	"cpf": "99200223819",
	"senha": "abc123"
}'
```
### Autenticar cliente:
```
curl --request POST \
  --url http://localhost:3000/api/acessos/sign-in \
  --header 'Content-Type: application/json' \
  --cookie JSESSIONID=90ED2EA964471F20F03954DE12951B0B \
  --data '{
	"email": "sergio.lago@teste.com",
	"senha": "abc123"
}'
```
### Criar pedido cliente não autenticado:
```
curl --request POST \
  --url http://localhost:3000/api/pedidos \
  --header 'Content-Type: application/json' \
  --cookie JSESSIONID=90ED2EA964471F20F03954DE12951B0B \
  --data '{
	"ponto_de_venda_id": 1,
	"itens": [
		{
			"nome": "X-Bacon",
			"preco": 30.0,
			"descricao": "Hambúrguer, presunto, mussarela, bacon, alface, tomate, catchup e maionese do cheff",
			"categoria": "LANCHE"
		},
		{
			"nome": "Coca-Cola",
			"preco": 12.5,
			"descricao": "",
			"categoria": "BEBIDA"
		}
	]
}'
```
### Criar pedido cliente autenticado:
```
curl --request POST \
  --url http://localhost:3000/api/pedidos \
  --header 'Authorization: Baerer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21lIjoiTWF0aGV1cyBHdXN0YXZvIiwiZW1haWwiOiJtZ3VzdGF2b0BnbWFpbC5jb20iLCJjcGYiOiIzNzEwMDIyMzgwNiIsImlhdCI6MTcxNjY5NzEwNiwiZXhwIjoxNzE2NzA0MzA2fQ.C1bHHAs_Y6QX_SzLMoYbJg92VGU2XVTQeCLeqwjo030' \
  --header 'Content-Type: application/json' \
  --cookie JSESSIONID=90ED2EA964471F20F03954DE12951B0B \
  --data '{
	"ponto_de_venda_id": 1,
	"itens": [
		{
			"nome": "X-Bacon",
			"preco": 30.0,
			"descricao": "Hambúrguer, presunto, mussarela, bacon, alface, tomate, catchup e maionese do cheff",
			"categoria": "LANCHE"
		},
		{
			"nome": "Coca-Cola",
			"preco": 12.5,
			"descricao": "",
			"categoria": "BEBIDA"
		}
	]
}'
```
### Listar todos os pedidos:
```
curl --request GET \
  --url http://localhost:3000/api/pedidos/ \
  --header 'Cookie: JSESSIONID=90ED2EA964471F20F03954DE12951B0B' \
  --cookie JSESSIONID=90ED2EA964471F20F03954DE12951B0B
```
### Listar pedido por ID:
```
curl --request GET \
  --url http://localhost:3000/api/pedidos/1 \
  --header 'Cookie: JSESSIONID=90ED2EA964471F20F03954DE12951B0B' \
  --cookie JSESSIONID=90ED2EA964471F20F03954DE12951B0B
```
### Listar todos os clientes:
```
curl --request GET \
  --url http://localhost:3000/api/clientes \
  --cookie JSESSIONID=90ED2EA964471F20F03954DE12951B0B
```
### Listar clientes por CPF
```
curl --request GET \
  --url http://localhost:3000/api/clientes/99200223819 \
  --cookie JSESSIONID=90ED2EA964471F20F03954DE12951B0Ba
```
