# Installs dependencies under the node user. 
FROM node:22-slim AS dependencies

# Always use latest npm version
RUN npm i npm@latest -g

# Switch to node user
USER node
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# set node user as owner of the app directory
COPY --chown=node:node package.json package-lock.json* ./
RUN npm ci && npm cache clean --force

# Copy the app code 
COPY --chown=node:node . .

# Run the app with vite and hot reload
FROM dependencies AS development-stage
CMD ["npm", "run", "dev"]


# Build the app
FROM dependencies AS build-stage
RUN npm run build

# Serve the app with nginx by copying the build files to the nginx html directory
# So we don't need the source code in the final image
FROM nginx:1.27-alpine AS production-stage
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

