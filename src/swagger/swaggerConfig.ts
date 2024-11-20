import swaggerJsDoc from 'swagger-jsdoc';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Node E-Commerce API',
            version: '1.0.0',
            description: 'API for managing products in an e-commerce system',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
        tags: [
            {
                name: 'User',
                description: 'API for user management',
            },
            {
                name: 'Product',
                description: 'API for product management',
            },
            // Add other tags here in the order you want
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                        },
                        email: {
                            type: 'string',
                        },
                    },
                },
                UserInput: {
                    type: 'object',
                    properties: {
                        email: {
                            type: 'string',
                        },
                        password: {
                            type: 'string',
                            format: 'password',
                        },
                    },
                    required: ['email', 'password'],
                },
                Product: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        name: { type: 'string' },
                        description: { type: 'string' },
                        price: { type: 'number', format: 'decimal' },
                        stock: { type: 'integer' },
                    },
                },
            },
        },
    },
    apis: ['./src/routes/*.ts'], // Ensure this path matches your route files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default swaggerDocs;
