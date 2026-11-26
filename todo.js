import { v4 as uuidv4 } from "uuid";

let todos = [];

const allowedStates = ["todo", "in-progress", "done"];

// Create a Todo
export function createTodo(data) {
    const { title, description, state, dueDate } = data;

    if (!title || typeof title !== "string") {
        throw new Error("Title is required.");
    }

    if (!description || typeof description !== "string") {
        throw new Error("Description is required.");
    }

    if (state && !allowedStates.includes(state)) {
        throw new Error("Invalid state.");
    }

    const newTodo = {
        id: uuidv4(),
        title,
        description,
        state: state || "todo",
        dueDate,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    todos.push(newTodo);

    return newTodo;
}

// Get all Todos
export function getTodos(state) {
    if (state) {
        return todos.filter(todo => todo.state === state);
    }

    return todos;
}

// Get a Todo by ID
export function getTodoById(id) {
    return todos.find(todo => todo.id === id);
}

// Update a Todo
export function updateTodo(id, data) {
    const todo = todos.find(todo => todo.id === id);

    if (!todo) {
        return null;
    }

    if (data.title !== undefined) {
        if (typeof data.title !== "string" || !data.title) {
            throw new Error("Invalid title.");
        }
        todo.title = data.title;
    }

    if (data.description !== undefined) {
        if (typeof data.description !== "string" || !data.description) {
            throw new Error("Invalid description.");
        }
        todo.description = data.description;
    }

    if (data.state !== undefined) {
        if (!allowedStates.includes(data.state)) {
            throw new Error("Invalid state.");
        }
        todo.state = data.state;
    }

    if (data.dueDate !== undefined) {
        todo.dueDate = data.dueDate;
    }

    return todo;
}

// Delete a Todo
export function deleteTodo(id) {
    const index = todos.findIndex(todo => todo.id === id);

    if (index === -1) {
        return null;
    }

    return todos.splice(index, 1)[0];
}

export function toCsv(todos) {
    const headers = [
        "id",
        "title",
        "description",
        "state",
        "dueDate",
        "createdAt",
        "updatedAt"
    ];

    const escapeCsv = (value) => {
        const stringValue = String(value ?? "");
        return `"${stringValue.replace(/"/g, '""')}"`;
    };

    const rows = todos.map(todo =>
        headers.map(header => escapeCsv(todo[header])).join(",")
    );

    return [
        headers.join(","),
        ...rows
    ].join("\n");
}