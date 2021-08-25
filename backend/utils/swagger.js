const swaggerJSDoc=require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "CollegeConnect",
    version: "1.0.0",
    description: "API Specifications",
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  servers: [
    {
      url: "http://localhost:8000",
    },
  ],
  tags: [
    {
      name: "Authentication",
      description: "All APIs for authentication and onboarding",
    }
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js", "./docs/*.yaml"],
};

module.exports = swaggerJSDoc(options);
