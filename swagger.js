import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "Todo API",
            version: "1.0.0",
            description: "API documentation for managing Todo items"
        },

        servers: [
            {
                url: "http://localhost:3000",
                description: "Local development server"
            }
        ],

        paths: {
            "/todos": {
                get: {
                    summary: "Get all Todos",
                    description: "Returns all Todos. Supports JSON and CSV formats.",

                    parameters: [
                        {
                            name: "state",
                            in: "query",
                            required: false,
                            description: "Filter Todos by state",
                            schema: {
                                type: "string",
                                enum: ["todo", "in-progress", "done"]
                            }
                        },
                        {
                            name: "Accept",
                            in: "header",
                            required: false,
                            description: "Choose the response format",
                            schema: {
                                type: "string",
                                enum: ["application/json", "text/csv"],
                                default: "application/json"
                            }
                        }
                    ],

                    responses: {
                        200: {
                            description: "List of Todos in JSON or CSV format",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: {
                                            $ref: "#/components/schemas/Todo"
                                        }
                                    }
                                },
                                "text/csv": {
                                    schema: {
                                        type: "string",
                                        example: "id,title,description,state,dueDate,createdAt,updatedAt"
                                    }
                                }
                            }
                        },
                        406: {
                            description: "Requested response format is not supported"
                        }
                    }
                },

                post: {
                    summary: "Create a new Todo",

                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/TodoInput"
                                }
                            }
                        }
                    },

                    responses: {
                        201: {
                            description: "Todo created successfully",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Todo"
                                    }
                                }
                            }
                        },
                        400: {
                            description: "Invalid Todo data"
                        }
                    }
                }
            },

            "/todos/{id}": {
                get: {
                    summary: "Get a Todo by ID",

                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            description: "The ID of the Todo",
                            schema: {
                                type: "string",
                                format: "uuid"
                            }
                        }
                    ],

                    responses: {
                        200: {
                            description: "Todo found",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Todo"
                                    }
                                }
                            }
                        },
                        404: {
                            description: "Todo not found"
                        }
                    }
                },

                put: {
                    summary: "Update a Todo",

                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            description: "The ID of the Todo",
                            schema: {
                                type: "string",
                                format: "uuid"
                            }
                        }
                    ],

                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/TodoUpdate"
                                }
                            }
                        }
                    },

                    responses: {
                        200: {
                            description: "Todo updated successfully",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Todo"
                                    }
                                }
                            }
                        },
                        400: {
                            description: "Invalid update data"
                        },
                        404: {
                            description: "Todo not found"
                        }
                    }
                },

                delete: {
                    summary: "Delete a Todo",

                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            description: "The ID of the Todo",
                            schema: {
                                type: "string",
                                format: "uuid"
                            }
                        }
                    ],

                    responses: {
                        200: {
                            description: "Todo deleted successfully",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Todo"
                                    }
                                }
                            }
                        },
                        404: {
                            description: "Todo not found"
                        }
                    }
                }
            }
        },

        components: {
            schemas: {
                Todo: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            format: "uuid"
                        },
                        title: {
                            type: "string"
                        },
                        description: {
                            type: "string"
                        },
                        state: {
                            type: "string",
                            enum: ["todo", "in-progress", "done"]
                        },
                        dueDate: {
                            type: "string"
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time"
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time"
                        }
                    }
                },

                TodoInput: {
                    type: "object",
                    required: ["title", "description"],
                    properties: {
                        title: {
                            type: "string",
                            example: "Learn Swagger"
                        },
                        description: {
                            type: "string",
                            example: "Document my Todo API"
                        },
                        state: {
                            type: "string",
                            enum: ["todo", "in-progress", "done"],
                            example: "todo"
                        },
                        dueDate: {
                            type: "string",
                            example: "2026-12-01"
                        }
                    }
                },

                TodoUpdate: {
                    type: "object",
                    properties: {
                        title: {
                            type: "string"
                        },
                        description: {
                            type: "string"
                        },
                        state: {
                            type: "string",
                            enum: ["todo", "in-progress", "done"]
                        },
                        dueDate: {
                            type: "string"
                        }
                    }
                }
            }
        }
    },

    apis: []
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
