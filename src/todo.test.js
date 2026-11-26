
import { test } from "node:test";
import assert from "node:assert";
import {
    createTodo,
    getTodos,
    getTodoById,
    updateTodo,
    deleteTodo
} from "./todo.js";

// Test creating a Todo
test("Create a Todo", () => {
    const todo = createTodo({
        title: "Test task",
        description: "Testing"
    });

    assert.strictEqual(todo.title, "Test task");
    assert.strictEqual(todo.state, "todo");
    assert.ok(todo.id);
});

// Test invalid input
test("Creating a Todo without a title should fail", () => {
    assert.throws(() => {
        createTodo({
            description: "Testing"
        });
    });
});

// Test getting all Todos
test("Get all Todos", () => {
    assert.ok(Array.isArray(getTodos()));
});

// Test getting a Todo by ID
test("Get a Todo by ID", () => {
    const todo = createTodo({
        title: "Find me",
        description: "Testing ID"
    });

    assert.strictEqual(getTodoById(todo.id).id, todo.id);
});

// Test updating a Todo
test("Update a Todo", () => {
    const todo = createTodo({
        title: "Old title",
        description: "Testing"
    });

    const updated = updateTodo(todo.id, {
        title: "New title"
    });

    assert.strictEqual(updated.title, "New title");
});

// Test deleting a Todo
test("Delete a Todo", () => {
    const todo = createTodo({
        title: "Delete me",
        description: "Testing"
    });

    const deleted = deleteTodo(todo.id);

    assert.strictEqual(deleted.id, todo.id);
    assert.strictEqual(getTodoById(todo.id), undefined);
});
