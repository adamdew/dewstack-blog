# Stage 1: Build the Zola site
FROM ghcr.io/getzola/zola:v0.21.0 AS builder

# Copy project files
COPY . /project
WORKDIR /project

# Make sure submodules are initialized
# (run on host before building)
# git submodule update --init --recursive

# Build the site
RUN ["zola", "build"]

# Stage 2: Serve the site with Nginx
FROM nginx:alpine

# Remove default HTML
RUN rm -rf /usr/share/nginx/html/*

# Copy built site from builder
COPY --from=builder /project/public /usr/share/nginx/html/

# Expose HTTP port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

