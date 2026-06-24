const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Workflow Automation Platform API",
      version: "1.0.0",
      description:
        "REST API for building event-driven workflows. Users create workflows, " +
        "attach ordered actions (LOG / EMAIL / WEBHOOK), and fire events that the " +
        "background worker executes asynchronously.",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local development",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Paste the JWT returned by /api/auth/login or /api/auth/signup",
        },
      },
      schemas: {
        // ---- Generic envelopes ----
        SuccessMessage: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string", example: "Done" },
          },
        },
        Error: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string", example: "Something went wrong" },
          },
        },
        // ---- Auth ----
        SignupRequest: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: { type: "string", minLength: 2, example: "Ayush" },
            email: { type: "string", format: "email", example: "ayush@example.com" },
            password: { type: "string", minLength: 6, example: "secret123" },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", format: "email", example: "ayush@example.com" },
            password: { type: "string", minLength: 6, example: "secret123" },
          },
        },
        AuthResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            data: {
              type: "object",
              properties: {
                token: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5..." },
                user: { $ref: "#/components/schemas/User" },
              },
            },
          },
        },
        User: {
          type: "object",
          properties: {
            id: { type: "string", example: "clx123abc" },
            name: { type: "string", example: "Ayush" },
            email: { type: "string", format: "email", example: "ayush@example.com" },
          },
        },
        // ---- Workflow ----
        Workflow: {
          type: "object",
          properties: {
            id: { type: "string", example: "clw456def" },
            name: { type: "string", example: "Notify on new order" },
            triggerType: {
              type: "string",
              enum: ["NEW_ORDER_CREATED", "USER_REGISTERED", "WEBHOOK_RECEIVED"],
              example: "NEW_ORDER_CREATED",
            },
            isActive: { type: "boolean", example: true },
            userId: { type: "string", example: "clx123abc" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        CreateWorkflowRequest: {
          type: "object",
          required: ["name", "triggerType"],
          properties: {
            name: { type: "string", minLength: 3, example: "Notify on new order" },
            triggerType: { type: "string", minLength: 3, example: "NEW_ORDER_CREATED" },
          },
        },
        UpdateWorkflowRequest: {
          type: "object",
          description: "At least one field must be provided.",
          minProperties: 1,
          properties: {
            name: { type: "string", minLength: 3, example: "Renamed workflow" },
            triggerType: { type: "string", minLength: 3, example: "USER_REGISTERED" },
            isActive: { type: "boolean", example: false },
          },
        },
        // ---- Workflow Action ----
        WorkflowAction: {
          type: "object",
          properties: {
            id: { type: "string", example: "cla789ghi" },
            workflowId: { type: "string", example: "clw456def" },
            actionType: {
              type: "string",
              enum: ["LOG", "EMAIL", "WEBHOOK"],
              example: "EMAIL",
            },
            sequence: { type: "integer", example: 1 },
            config: {
              type: "object",
              description: "Action-specific settings (e.g. email to/subject, webhook url).",
              example: { to: "user@example.com", subject: "Order received" },
            },
          },
        },
        CreateActionRequest: {
          type: "object",
          required: ["actionType", "sequence"],
          properties: {
            actionType: {
              type: "string",
              enum: ["LOG", "EMAIL", "WEBHOOK"],
              example: "EMAIL",
            },
            sequence: { type: "integer", minimum: 1, example: 1 },
            config: {
              type: "object",
              example: { to: "user@example.com", subject: "Order received" },
            },
          },
        },
        // ---- Event ----
        TriggerEventRequest: {
          type: "object",
          required: ["eventType", "payload"],
          properties: {
            eventType: { type: "string", example: "NEW_ORDER_CREATED" },
            payload: {
              type: "object",
              description: "Arbitrary data passed to the matched workflows' actions.",
              example: { orderId: 42, amount: 999 },
            },
          },
        },
        // ---- Execution ----
        Execution: {
          type: "object",
          properties: {
            id: { type: "string", example: "cle321jkl" },
            workflowId: { type: "string", example: "clw456def" },
            status: {
              type: "string",
              enum: ["SUCCESS", "FAILED", "PENDING"],
              example: "SUCCESS",
            },
            payload: { type: "object", example: { orderId: 42 } },
            createdAt: { type: "string", format: "date-time" },
          },
        },
      },
      responses: {
        Unauthorized: {
          description: "Missing or invalid JWT",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
              example: { success: false, message: "Unauthorized" },
            },
          },
        },
        NotFound: {
          description: "Resource not found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
        ValidationError: {
          description: "Invalid request body",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
      },
    },
    tags: [
      { name: "Auth", description: "Signup, login, current user" },
      { name: "Workflows", description: "Create and manage workflows" },
      { name: "Workflow Actions", description: "Ordered actions attached to a workflow" },
      { name: "Events", description: "Fire events that trigger workflows" },
      { name: "Executions", description: "History of workflow runs" },
    ],
  },
  // Pull @swagger JSDoc annotations from every route file
  apis: ["./src/modules/**/*.routes.js", "./src/app.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
