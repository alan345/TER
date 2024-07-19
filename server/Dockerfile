# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.12.2

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine as base

# Set working directory for all build stages.
WORKDIR /usr/src/app

################################################################################
# Create a stage for installing production dependencies.
# FROM base as deps

# # Copy package files to the image.
# COPY package.json ./

# # Install production dependencies.
# RUN npm i --omit=dev

################################################################################
# Create a stage for building the application.
FROM base as build

# Copy all files to the image.
COPY . .

# Install all dependencies, including devDependencies.
RUN npm i
# Run the build script.
RUN npm run build

################################################################################
# Create a new stage to run the application with minimal runtime dependencies
# where the necessary files are copied from the build stage.
FROM build as final

# Run the application as a non-root user.
USER node

# Copy package.json so that package manager commands can be used.
COPY package.json .



# Copy the production dependencies from the deps stage and also
# the built application from the build stage into the image.
# COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

# Expose the port that the application listens on.
EXPOSE 2022

# Run the application.
CMD npm start
