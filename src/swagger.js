import swaggerUi from 'swagger-ui-express';

export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'NodeJS HW API',
    version: '1.0.0',
    description: 'Backend API documentation (cookie-based auth)',
  },

  components: {
    securitySchemes: {
      CookieAuth: {
        type: 'apiKey',
        in: 'cookie',
        name: 'sessionId',
      },
    },
  },

  security: [{ CookieAuth: [] }],

  tags: [
    { name: 'Auth', description: 'Authentication & sessions' },
    { name: 'Users', description: 'User endpoints' },
    { name: 'Notes', description: 'Notes CRUD' },
  ],

  paths: {
    /* ================= AUTH ================= */

    '/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Register user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string', example: 'test@mail.com' },
                  password: { type: 'string', example: '12345678' },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'User created' },
          409: { description: 'Email already exists' },
        },
      },
    },

    '/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Login user (sets cookies)',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string' },
                  password: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Login successful, cookies set',
          },
          401: { description: 'Invalid credentials' },
        },
      },
    },

    '/auth/refresh': {
      post: {
        tags: ['Auth'],
        summary: 'Refresh user session',
        description:
          'Uses sessionId and refreshToken cookies, issues new session cookies',
        responses: {
          200: { description: 'Session refreshed' },
          401: { description: 'Session not found or expired' },
        },
      },
    },

    '/auth/logout': {
      post: {
        tags: ['Auth'],
        summary: 'Logout user',
        description: 'Deletes session and clears auth cookies',
        responses: {
          204: { description: 'Logged out successfully' },
        },
      },
    },

    '/auth/request-reset-email': {
      post: {
        tags: ['Auth'],
        summary: 'Request password reset email',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email'],
                properties: {
                  email: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description:
              'Password reset email sent (always 200, even if user not found)',
          },
        },
      },
    },

    '/auth/reset-password': {
      post: {
        tags: ['Auth'],
        summary: 'Reset password using token',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['token', 'password'],
                properties: {
                  token: { type: 'string' },
                  password: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Password reset successfully' },
          401: { description: 'Invalid or expired token' },
          404: { description: 'User not found' },
        },
      },
    },

    /* ================= USERS ================= */

    '/users/me/avatar': {
      patch: {
        tags: ['Users'],
        summary: 'Update user avatar',
        description: 'Upload and update user avatar image',
        requestBody: {
          required: true,
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                required: ['avatar'],
                properties: {
                  avatar: {
                    type: 'string',
                    format: 'binary',
                    description: 'Avatar image file',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Avatar updated successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    url: {
                      type: 'string',
                      example:
                        'https://res.cloudinary.com/demo/image/upload/avatar.jpg',
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'No file uploaded',
          },
          401: {
            description: 'Unauthorized',
          },
        },
      },
    },

    /* ================= NOTES ================= */

    '/notes': {
      get: {
        tags: ['Notes'],
        summary: 'Get all notes',
        description: 'Get paginated list of notes with optional filters',
        parameters: [
          {
            name: 'tag',
            in: 'query',
            required: false,
            schema: { type: 'string' },
            description: 'Filter notes by tag',
          },
          {
            name: 'search',
            in: 'query',
            required: false,
            schema: { type: 'string' },
            description: 'Full-text search in notes',
          },
          {
            name: 'page',
            in: 'query',
            required: false,
            schema: {
              type: 'integer',
              example: 1,
            },
            description: 'Page number',
          },
          {
            name: 'perPage',
            in: 'query',
            required: false,
            schema: {
              type: 'integer',
              example: 10,
            },
            description: 'Notes per page',
          },
        ],
        responses: {
          200: {
            description: 'Paginated notes list',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    page: { type: 'integer' },
                    perPage: { type: 'integer' },
                    totalNotes: { type: 'integer' },
                    totalPages: { type: 'integer' },
                    notes: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          _id: { type: 'string' },
                          title: { type: 'string' },
                          content: { type: 'string' },
                          tag: { type: 'string', nullable: true },
                          userId: { type: 'string' },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          401: { description: 'Unauthorized' },
        },
      },

      post: {
        tags: ['Notes'],
        summary: 'Create note',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['title', 'content'],
                properties: {
                  title: { type: 'string' },
                  content: { type: 'string' },
                  tag: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Note created',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    _id: { type: 'string' },
                    title: { type: 'string' },
                    content: { type: 'string' },
                    tag: { type: 'string', nullable: true },
                    userId: { type: 'string' },
                  },
                },
              },
            },
          },
          401: { description: 'Unauthorized' },
        },
      },
    },

    '/notes/{noteId}': {
      get: {
        tags: ['Notes'],
        summary: 'Get note by ID',
        parameters: [
          {
            name: 'noteId',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: {
            description: 'Note found',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    _id: { type: 'string' },
                    title: { type: 'string' },
                    content: { type: 'string' },
                    tag: { type: 'string', nullable: true },
                    userId: { type: 'string' },
                  },
                },
              },
            },
          },
          404: { description: 'Note not found' },
          401: { description: 'Unauthorized' },
        },
      },

      patch: {
        tags: ['Notes'],
        summary: 'Update note',
        parameters: [
          {
            name: 'noteId',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  content: { type: 'string' },
                  tag: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Note updated',
          },
          404: { description: 'Note not found' },
          401: { description: 'Unauthorized' },
        },
      },

      delete: {
        tags: ['Notes'],
        summary: 'Delete note',
        parameters: [
          {
            name: 'noteId',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: {
            description: 'Note deleted',
          },
          404: { description: 'Note not found' },
          401: { description: 'Unauthorized' },
        },
      },
    },
  },
};

export const swaggerMiddleware = [
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument),
];
