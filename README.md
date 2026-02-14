



# Case Técnico – Processo Seletivo

# Conteúdos

1. [Descrição](#1---descrição)<br>
2. [Requisitos](#2-Requisitos)<br>
3. [Execução do backend](#Execução-do-backend)<br>
   2.1 [Instalando dependências](##Instalando-dependências)<br>
   2.2 [Configurando ambiente local](##Configurando-ambiente-local)<br>
   2.3 [Executando projeto](##Executando-projeto)<br>
4. [Execução do frontend](#Execução-do-frontend)<br>
   3.1 [Instalando dependências](##Instalando-dependências)<br>
   3.2 [Configurando ambiente local](##Configurando-ambiente-local)<br>
   3.3 [Executando projeto](##Executando-projeto)<br>
5. [Observações](#Observações)<br>
6. [Usando o Docker para montar o banco](#Usando-o-Docker-para-montar-o-banco)<br>

# 1 - Descrição

## **Problema**

Desenvolver uma aplicação web para **controlar o uso de espaços de ensino**, permitindo análise da taxa de ocupação.  
Um ambiente de ensino pode ser uma **sala de aula**, **laboratório** ou **sala de estudos**.  
A aplicação deve possibilitar o **cadastro de alunos**, que deverão **registrar presença ao entrar e sair do ambiente**.  
A especificidade do projeto (detalhes adicionais, regras de negócio) fica a critério do candidato.

***

## **Pré-requisitos**

*   **Não existe sistema atual na instituição** que forneça estrutura inicial.
*   **Back-end**: Java (Spring) **ou** Node.js.
*   **Front-end**: React **ou** Angular.
*   **Armazenamento**: Implementar **um mecanismo de persistência de dados** (tipo de banco ou tecnologia a critério do candidato).
*   **Funcionalidades obrigatórias**:
    *   CRUD para cadastro de alunos.
    *   Registro de entrada e saída dos ambientes de ensino.
*   **API**:
    *   Deve existir uma API para comunicação entre front-end e back-end.
    *   **A API deve implementar autenticação via token e garantir autorização adequada para que apenas usuários autenticados possam acessar e executar operações permitidas.**

***

## **Critérios de Avaliação**

*   Organização e clareza do código.
*   Uso de boas práticas (estrutura, padrões, segurança).
*   Documentação mínima para execução do projeto.
*   Qualidade da solução proposta (funcionalidade, usabilidade).
*   Criatividade na definição das regras de negócio.

***

## **Como Participar**

1.  **Faça um fork deste repositório.**
2.  Desenvolva sua solução no repositório criado pelo fork.
3.  Certifique-se de que o repositório esteja **público**.
4.  O **último commit** deve ser realizado até **24/11/2025 às 08:00**.
5.  Envie a URL do seu repositório para o e-mail ana.neneve@pucpr.br até o mesmo prazo do commit.

# 2 Requisitos

- NodeJS v20;19;5
- npm v10.8.2
- MariaDB v15.1 Distrib. 10.11.15(Foi adicionado um arquivo para montar um container docker para o banco, o .env.example já está mapeado para o uso deste container)

# 3 Execução do backend

## 3.1 Instalando dependências

Executar o comando no diretório do back-end:

```console
npm i
```

## 3.2 Configurando ambiente local

Existe um arquivo **.env.example**, copiar este arquivo para um **.env** e substituir pelas variáveis do seu banco de dados local:

```console
cp .env.example .env
```

## 3.3 Gerando chave para JWT

Opcionalmente, você pode gerar uma chave aleatória para o JWT com o comando abaixo:

```console
npm run generate:secret
```

Ao executar, copiar a chave gerada para a variável do **JWT_SECRET**.

## 3.4 Executando projeto

Para iniciar a execução do backend, basta executar o seguinte comando:

```console
npm run start
```

## 3.5 Execução de migrations

Para executar migrations com dados de teste padrão, execute o comando:

```console
npm run typeorm -- migration:run -d src/data-source.ts 
```

O comando acima criará alguns dados de alunos, salas, e um usuário admin. Para acessar o usuário de admin, o login padrão é o abaixo:
```
usuário: admin
```  
```  
senha: 12356
```

# 4 Execução do frontend

## 4.1 Instalando dependências

Executar o comando no diretório do front-end:

```console
npm i
```

## 4.2 Configurando ambiente local

Existe um arquivo **.env.example**, copiar este arquivo para um **.env** e substituir **API_URL** pelo endereço de sua API local:

```console
cp .env.example .env
```

## 4.3 Executando projeto

Para executar projeto no ambiente local, devemos executar o seguinte comando agora:

```console
npm run dev
```

Agora basta acessarmos a seguinte rota(se for a padrão) em um navegador de sua escolha. Por padrão, o NextJs iniciará na rota a seguir:

`localhost:3000`


## 4.4 Login

Para acessar o usuário padrão, utilize os dados à seguir:
```
usuário: admin
```  
```  
senha: 12356
```

# 5 Usando o Docker para montar o banco

No diretório principal deste projeto, foi disponibilizado um arquivo **yml**, este yml está configurado para criar um container docker do MariaDB 10.5, o arquivo **.env.example** já está mapeado para conectar neste banco. Para executar o container basta executar o seguinte comando se estiver com docker instalado em sua máquina local:

```console
sudo docker-compose up -d
```
