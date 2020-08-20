# Make the builder image
FROM node:13.13.0-alpine as builder

WORKDIR /app

COPY . .
RUN npm install
RUN npm run build


# Build final image
FROM node:13.13.0-alpine

# Set the work directory
WORKDIR /app

# Install app dependencies
COPY --from=builder /app/package-lock.json /app/package.json ./
RUN npm install --only=prod

# Add your source files
COPY --from=builder /app/assets ./assets
COPY --from=builder /app/dist ./dist

# Expose and start server
EXPOSE 1801
CMD npm start