const OPENAPI_SPEC = `openapi: 3.0.3
info:
  title: PCOC Guest Management Mock API
  version: 0.1.0
  description: Mock backend for the PCOC React Training Exercise. Powered by MSW.
servers:
  - url: /api

paths:
  /auth/login:
    post:
      summary: Login
      tags: [Auth]
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [email, password]
              properties:
                email: { type: string, example: admin@pcoc.com }
                password: { type: string, example: password123 }
      responses:
        "200":
          description: Successful login
          content:
            application/json:
              schema:
                type: object
                properties:
                  token: { type: string }
                  user:
                    type: object
                    properties:
                      id: { type: string }
                      role: { type: string, enum: [admin] }
                      name: { type: string }
                      email: { type: string }
        "401":
          description: Invalid credentials

  /guests:
    get:
      summary: List guests (paginated)
      tags: [Guests]
      parameters:
        - name: page
          in: query
          schema: { type: integer, default: 1 }
        - name: pageSize
          in: query
          schema: { type: integer, default: 10 }
        - name: search
          in: query
          schema: { type: string }
          description: Search by name or email
        - name: status
          in: query
          schema: { $ref: "#/components/schemas/GuestStatus" }
        - name: countryCode
          in: query
          schema: { type: string }
          description: ISO alpha-2 country code
      responses:
        "200":
          description: Paginated guest list
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    items: { $ref: "#/components/schemas/Guest" }
                  total: { type: integer }
                  page: { type: integer }
                  pageSize: { type: integer }
                  totalPages: { type: integer }
    post:
      summary: Create a guest
      tags: [Guests]
      requestBody:
        required: true
        content:
          application/json:
            schema: { $ref: "#/components/schemas/GuestInput" }
      responses:
        "201":
          description: Created guest
          content:
            application/json:
              schema: { $ref: "#/components/schemas/Guest" }

  /guests/check-email:
    get:
      summary: Check email availability
      tags: [Guests]
      parameters:
        - name: email
          in: query
          required: true
          schema: { type: string }
        - name: excludeId
          in: query
          schema: { type: string }
      responses:
        "200":
          description: Availability result
          content:
            application/json:
              schema:
                type: object
                properties:
                  available: { type: boolean }

  /guests/bulk-status:
    patch:
      summary: Bulk status update
      tags: [Guests]
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [guestIds, status]
              properties:
                guestIds:
                  type: array
                  items: { type: string }
                status: { $ref: "#/components/schemas/GuestStatus" }
      responses:
        "200":
          description: Bulk update results
          content:
            application/json:
              schema:
                type: object
                properties:
                  succeeded:
                    type: array
                    items: { $ref: "#/components/schemas/Guest" }
                  failed:
                    type: array
                    items:
                      type: object
                      properties:
                        id: { type: string }
                        error: { type: string }

  /guests/{id}:
    get:
      summary: Get a single guest
      tags: [Guests]
      parameters:
        - name: id
          in: path
          required: true
          schema: { type: string }
      responses:
        "200":
          description: Guest details
          content:
            application/json:
              schema: { $ref: "#/components/schemas/Guest" }
        "404":
          description: Guest not found
    put:
      summary: Update a guest
      tags: [Guests]
      parameters:
        - name: id
          in: path
          required: true
          schema: { type: string }
      requestBody:
        required: true
        content:
          application/json:
            schema: { $ref: "#/components/schemas/GuestInput" }
      responses:
        "200":
          description: Updated guest
          content:
            application/json:
              schema: { $ref: "#/components/schemas/Guest" }
        "404":
          description: Guest not found

  /guests/{id}/status:
    patch:
      summary: Change guest status
      description: |
        Business rules:
        - checked-out -> checked-in: REJECTED (422)
        - cancelled -> checked-in: REJECTED (422)
        - reserved -> checked-in: allowed
        - All other transitions: allowed
      tags: [Guests]
      parameters:
        - name: id
          in: path
          required: true
          schema: { type: string }
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [status]
              properties:
                status: { $ref: "#/components/schemas/GuestStatus" }
      responses:
        "200":
          description: Updated guest
          content:
            application/json:
              schema: { $ref: "#/components/schemas/Guest" }
        "422":
          description: Invalid status transition

  /countries:
    get:
      summary: List all countries
      tags: [Countries]
      responses:
        "200":
          description: Country list
          content:
            application/json:
              schema:
                type: array
                items: { $ref: "#/components/schemas/Country" }

  /countries/{countryCode}/cities:
    get:
      summary: Cities for a country
      tags: [Countries]
      parameters:
        - name: countryCode
          in: path
          required: true
          schema: { type: string }
          description: ISO alpha-2 country code
      responses:
        "200":
          description: City list
          content:
            application/json:
              schema:
                type: array
                items: { $ref: "#/components/schemas/City" }

components:
  schemas:
    GuestStatus:
      type: string
      enum: [reserved, checked-in, checked-out, cancelled]
    RoomType:
      type: string
      enum: [suite, deluxe, standard]
    BilingualName:
      type: object
      properties:
        en: { type: string }
        ar: { type: string }
    Guest:
      type: object
      properties:
        id: { type: string }
        firstName: { type: string }
        lastName: { type: string }
        email: { type: string }
        phone: { type: string }
        countryCode: { type: string }
        cityId: { type: string }
        checkInDate: { type: string, format: date }
        checkOutDate: { type: string, format: date }
        roomType: { $ref: "#/components/schemas/RoomType" }
        status: { $ref: "#/components/schemas/GuestStatus" }
    GuestInput:
      type: object
      required: [firstName, lastName, email, phone, countryCode, cityId, checkInDate, checkOutDate, roomType, status]
      properties:
        firstName: { type: string }
        lastName: { type: string }
        email: { type: string }
        phone: { type: string }
        countryCode: { type: string }
        cityId: { type: string }
        checkInDate: { type: string, format: date }
        checkOutDate: { type: string, format: date }
        roomType: { $ref: "#/components/schemas/RoomType" }
        status: { $ref: "#/components/schemas/GuestStatus" }
    Country:
      type: object
      properties:
        code: { type: string }
        name: { $ref: "#/components/schemas/BilingualName" }
        phonePrefix: { type: string }
        phoneLength: { type: integer }
        flag: { type: string, description: CDN URL for flag image }
    City:
      type: object
      properties:
        id: { type: string }
        name: { $ref: "#/components/schemas/BilingualName" }
        countryCode: { type: string }
`;

const DOCS_HTML = `<!doctype html>
<html>
<head>
  <title>PCOC API Docs</title>
  <meta charset="utf-8" />
</head>
<body>
  <script id="api-reference" data-url="/api/docs/openapi.yaml"></script>
  <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>
</body>
</html>`;

export function pcocApiDocs() {
  return {
    name: 'pcoc-api-docs',
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        if (req.url === '/api/docs') {
          res.setHeader('Content-Type', 'text/html');
          res.end(DOCS_HTML);
          return;
        }
        if (req.url === '/api/docs/openapi.yaml') {
          res.setHeader('Content-Type', 'text/yaml');
          res.end(OPENAPI_SPEC);
          return;
        }
        next();
      });
    },
  };
}
