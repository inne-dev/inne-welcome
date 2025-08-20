#!/bin/bash

# Deploy script for Inne Welcome Portfolio
# Author: Inne
# Usage: ./deploy.sh [--rebuild] [--logs] [--stop] [--help]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
CONTAINER_NAME="welcome"
NETWORK_NAME="proxy-net"
COMPOSE_FILE="docker-compose.yml"

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker and try again."
        exit 1
    fi
}

# Function to create network if it doesn't exist
create_network() {
    if ! docker network ls | grep -q "$NETWORK_NAME"; then
        print_status "Creating Docker network: $NETWORK_NAME"
        docker network create "$NETWORK_NAME"
        print_success "Network $NETWORK_NAME created successfully"
    else
        print_status "Network $NETWORK_NAME already exists"
    fi
}

# Function to build and deploy
deploy() {
    local rebuild_flag=""
    if [[ "$1" == "--rebuild" ]]; then
        rebuild_flag="--build"
        print_status "Forcing rebuild of Docker image"
    fi

    print_status "Building and starting the application..."
    docker-compose up -d $rebuild_flag

    # Wait a moment for the container to start
    sleep 3

    # Check if container is running
    if docker ps | grep -q "$CONTAINER_NAME"; then
        print_success "Container $CONTAINER_NAME is running"

        # Health check
        print_status "Performing health check..."
        if docker exec "$CONTAINER_NAME" curl -f http://localhost:3000/health > /dev/null 2>&1; then
            print_success "Health check passed - Application is ready!"
            print_status "Application is accessible through your reverse proxy at the configured domain"
        else
            print_warning "Health check failed, but container is running. Check logs with: ./deploy.sh --logs"
        fi
    else
        print_error "Container failed to start. Check logs with: ./deploy.sh --logs"
        exit 1
    fi
}

# Function to show logs
show_logs() {
    if docker ps -a | grep -q "$CONTAINER_NAME"; then
        print_status "Showing logs for $CONTAINER_NAME..."
        docker logs "$CONTAINER_NAME" --tail 50 -f
    else
        print_error "Container $CONTAINER_NAME not found"
        exit 1
    fi
}

# Function to stop the application
stop_app() {
    print_status "Stopping the application..."
    docker-compose down
    print_success "Application stopped successfully"
}

# Function to show status
show_status() {
    print_status "Application status:"

    # Check if container exists
    if docker ps -a | grep -q "$CONTAINER_NAME"; then
        # Check if container is running
        if docker ps | grep -q "$CONTAINER_NAME"; then
            print_success "Container is running"

            # Show container info
            echo ""
            docker ps --filter "name=$CONTAINER_NAME" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

            # Test internal connectivity
            echo ""
            print_status "Testing internal connectivity..."
            if docker exec "$CONTAINER_NAME" curl -f http://localhost:3000/health > /dev/null 2>&1; then
                print_success "Internal health check: PASSED"
            else
                print_warning "Internal health check: FAILED"
            fi
        else
            print_warning "Container exists but is not running"
            docker ps -a --filter "name=$CONTAINER_NAME" --format "table {{.Names}}\t{{.Status}}"
        fi
    else
        print_warning "Container does not exist"
    fi
}

# Function to show help
show_help() {
    echo "Deployment script for Inne Welcome Portfolio"
    echo ""
    echo "Usage: $0 [OPTION]"
    echo ""
    echo "Options:"
    echo "  --rebuild    Force rebuild of Docker image before deployment"
    echo "  --logs       Show container logs (follow mode)"
    echo "  --stop       Stop the application"
    echo "  --status     Show application status"
    echo "  --help       Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0                 # Deploy with existing image"
    echo "  $0 --rebuild       # Rebuild image and deploy"
    echo "  $0 --logs          # Show and follow logs"
    echo "  $0 --stop          # Stop the application"
    echo ""
    echo "For more information, see README.md"
}

# Main script logic
main() {
    print_status "Starting deployment process for Inne Welcome Portfolio"

    # Check Docker availability
    check_docker

    case "${1:-}" in
        --rebuild)
            create_network
            deploy --rebuild
            ;;
        --logs)
            show_logs
            ;;
        --stop)
            stop_app
            ;;
        --status)
            show_status
            ;;
        --help)
            show_help
            ;;
        "")
            create_network
            deploy
            ;;
        *)
            print_error "Unknown option: $1"
            echo ""
            show_help
            exit 1
            ;;
    esac
}

# Run main function with all arguments
main "$@"
