import { test, before, after } from "node:test";
import assert from "node:assert";
import app from "./app.js";

let server;
let url;
let todoId;

before(async () => {
    server = app.listen(0);
    await new Promise(resolve => server.once("listening", resolve));
    url = `http://localhost:${server.address().port}`;
});

after(() => {
    server.close();
});

// Test creating a Todo
test("POST - Create Todo", async () => {
    const response = await fetch(`${url}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: "Test",
            description: "Testing"
        })
    });

    const data = await response.json();

    assert.strictEqual(response.status, 201);
    assert.strictEqual(data.title, "Test");

    todoId = data.id;
});

// Test invalid input
test("POST - Invalid Todo", async () => {
    const response = await fetch(`${url}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            description: "Missing title"
        })
    });

    assert.strictEqual(response.status, 400);
});

// Test getting a Todo
test("GET - Get Todo", async () => {
    const response = await fetch(`${url}/todos/${todoId}`);
    const data = await response.json();

    assert.strictEqual(response.status, 200);
    assert.strictEqual(data.id, todoId);
});

// Test missing Todo
test("GET - Todo does not exist", async () => {
    const response = await fetch(`${url}/todos/not-found`);

    assert.strictEqual(response.status, 404);
});

// Test updating a Todo
test("PUT - Update Todo", async () => {
    const response = await fetch(`${url}/todos/${todoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "Updated" })
    });

    const data = await response.json();

    assert.strictEqual(response.status, 200);
    assert.strictEqual(data.title, "Updated");
});

// Test deleting a Todo
test("DELETE - Delete Todo", async () => {
    const response = await fetch(`${url}/todos/${todoId}`);

    assert.strictEqual(response.status, 200);

    const deleteResponse = await fetch(`${url}/todos/${todoId}`, {
        method: "DELETE"
    });

    assert.strictEqual(deleteResponse.status, 200);
});

// Test deleting a missing Todo
test("DELETE - Todo does not exist", async () => {
    const response = await fetch(`${url}/todos/${todoId}`);

    assert.strictEqual(response.status, 404);
});
