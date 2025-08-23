# Inne Welcome - Portfolio Website

Modern portfolio website built with React, TypeScript, and Tailwind CSS, deployed with Docker.

## 🚀 Features

- **Responsive Design**: Works on all devices
- **Multi-language Support**: English, Ukrainian, Russian
- **Dark/Light Theme**: Toggle between themes
- **Modern UI**: Built with shadcn/ui components
- **Fast Loading**: Optimized build with Vite
- **Docker Ready**: Production-ready containerization

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui
- **Icons**: Lucide React
- **Build**: Vite
- **Container**: Docker + Nginx
- **Proxy**: nginx-proxy compatible

## 📦 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Docker Deployment

```bash
# Create proxy network (if not exists)
sudo docker run -d \
  --name nginx-proxy \
  --network proxy-net \
  -p 80:80 \
  -v /var/run/docker.sock:/tmp/docker.sock:ro \
  jwilder/nginx-proxy

# Build and run
docker-compose up --build -d

# Check status
docker ps
docker logs welcome
```

## 🐳 Docker Configuration

The application uses a multi-stage Dockerfile:
1. **Build stage**: Node.js Alpine for building the React app
2. **Production stage**: Nginx Alpine for serving static files

### Environment Variables

- `VIRTUAL_HOST`: Domain name for nginx-proxy
- `VIRTUAL_PORT`: Internal port (3000)

### Network

The container connects to `proxy-net` external network for reverse proxy integration.

## 📁 Project Structure

```
inne-welcome/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   └── figma/          # Figma-generated components
├── src/                # Source files
│   └── main.tsx        # React entry point
├── styles/             # Global styles
│   └── globals.css     # Tailwind CSS
├── App.tsx             # Main application component
├── Dockerfile          # Docker build instructions
├── docker-compose.yml  # Docker Compose configuration
├── nginx.conf          # Nginx configuration
└── package.json        # Dependencies and scripts
```

## 🌐 Features

### Multi-language Support
- English (default)
- Ukrainian (uk)
- Russian (ru)

### Projects Showcase
- Personal Blog (Ruby on Rails)
- PINFL Helper Bot (Python Telegram Bot)
- Dialogy App (React + Golang)

### Contact Links
- GitHub: [@inne-dev](https://github.com/inne-dev)
- Telegram: [@inne_dev](https://t.me/inne_dev)

## 🔧 Configuration Files

### Key Configuration Files:
- `vite.config.ts` - Vite build configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `nginx.conf` - Production server configuration

### Build Process:
1. TypeScript compilation
2. Vite bundling
3. Asset optimization
4. Nginx serving with gzip compression

## 🚀 Deployment

The application is configured for deployment with nginx-proxy:

```yaml
services:
  wellcome:
    build: .
    container_name: welcome
    environment:
      VIRTUAL_HOST: inne.space
      VIRTUAL_PORT: 3000
    expose:
      - "3000"
    restart: unless-stopped
    networks:
      - proxy-net
```

### Health Check

The application includes a health check endpoint:
```bash
curl http://localhost:3000/health
# Returns: healthy
```

## 🎨 Customization

### Theme Colors
Edit `styles/globals.css` to customize the color scheme:
- Light theme: `:root` variables
- Dark theme: `.dark` class variables

### Content
Update `App.tsx` to modify:
- Personal information
- Project descriptions
- Contact links
- Translations

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🐛 Troubleshooting

### Common Issues:

1. **Container restarting**: Check nginx configuration
   ```bash
   docker logs welcome
   ```

2. **Build fails**: Ensure all dependencies are installed
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Network not found**: Create the proxy network
   ```bash
   docker network create proxy-net
   ```

## 📄 License

This project is private. All rights reserved.

## 👨‍💻 Author

**Inne** - Backend Developer
- Website: [inne.space](https://inne.space)
- GitHub: [@inne-dev](https://github.com/inne-dev)
- Telegram: [@inne_dev](https://t.me/inne_dev)
