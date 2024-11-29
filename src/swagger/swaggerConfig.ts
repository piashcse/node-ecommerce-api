import swaggerJsDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node E-Commerce API",
      version: "1.0.0",
      description: "API for managing an e-commerce system",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    tags: [
      {
        name: "User",
        description: "API for user management",
      },
      {
        name: "Product",
        description: "API for product management",
      },
      {
        name: "Cart",
        description: "API for managing shopping cart",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "integer",
            },
            email: {
              type: "string",
            },
            role: {
              type: "string",
              enum: ["CUSTOMER", "SELLER"],
            },
          },
        },
        UserInput: {
          type: "object",
          properties: {
            email: {
              type: "string",
            },
            password: {
              type: "string",
              format: "password",
            },
            role: {
              type: "string",
              enum: ["CUSTOMER", "SELLER"],
              default: "CUSTOMER",
            },
          },
          required: ["email", "password", "role"],
        },
        ProductInput: {
          type: "object",
          properties: {
            name: { type: "string" },
            description: { type: "string" },
            price: { type: "number", format: "decimal" },
            stock: { type: "integer" },
          },
        },
        Product: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
            description: { type: "string" },
            price: { type: "number", format: "decimal" },
            stock: { type: "integer" },
          },
        },
        CartItem: {
          type: "object",
          properties: {
            id: { type: "integer" },
            productId: { type: "integer" },
            quantity: { type: "integer" },
          },
        },
        AddToCartInput: {
          type: "object",
          properties: {
            productId: { type: "integer" },
            quantity: { type: "integer" },
          },
          required: ["productId", "quantity"],
        },
        UpdateCartItemInput: {
          type: "object",
          properties: {
            cartItemId: { type: "integer" },
            quantity: { type: "integer" },
          },
          required: ["cartItemId", "quantity"],
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"], // Ensure this path matches your route files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default swaggerDocs;
