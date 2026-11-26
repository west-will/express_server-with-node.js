import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";

import {
    createTodo,
    getTodos,
    getTodoById,
    updateTodo,
    deleteTodo,
    toCsv
} from "./todo.js";

const app = express();

app.use(express.json());
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// POST - Create a new Todo
app.post("/todos", (req, res) => {
    try {
        const newTodo = createTodo(req.body);
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET - Get all Todos
app.get("/todos", (req, res) => {
    const { state } = req.query;

    const result = getTodos(state);

    const format = req.accepts([
        "application/json",
        "text/csv"
    ]);

    if (format === "text/csv") {
        res.type("text/csv");
        return res.status(200).send(toCsv(result));
    }

    if (format === "application/json") {
        return res.status(200).json(result);
    }

    return res.status(406).json({
        error: "Not Acceptable. Supported formats: application/json, text/csv"
    });
});

// GET - Get a Todo by ID
app.get("/todos/:id", (req, res) => {
    const todo = getTodoById(req.params.id);

    if (!todo) {
        return res.status(404).json({ error: "Todo not found." });
    }

    res.status(200).json(todo);
});

// PUT - Update a Todo
app.put("/todos/:id", (req, res) => {
    try {
        const updatedTodo = updateTodo(req.params.id, req.body);

        if (!updatedTodo) {
            return res.status(404).json({ error: "Todo not found." });
        }

        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE - Delete a Todo
app.delete("/todos/:id", (req, res) => {
    const deletedTodo = deleteTodo(req.params.id);

    if (!deletedTodo) {
        return res.status(404).json({ error: "Todo not found." });
    }

    res.status(200).json(deletedTodo);
});

export default app;
