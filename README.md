# Inne Welcome - Portfolio Website

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-4.4-646CFF.svg)](https://vitejs.dev/)

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
- **Proxy**: Nginx Proxy Manager compatible

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

#### Prerequisites

1. **Create proxy network** (if not exists):
   ```bash
   docker network create proxy-net
   ```

2. **Install Nginx Proxy Manager** (if not installed):
   ```bash
   docker run -d \
     --name nginx-proxy-manager \
     --network proxy-net \
     -p 80:80 \
     -p 443:443 \
     -p 81:81 \
     -v npm_data:/data \
     -v npm_letsencrypt:/etc/letsencrypt \
     --restart unless-stopped \
     jc21/nginx-proxy-manager:latest
   ```
   
   Access Nginx Proxy Manager UI at `http://your-server-ip:81`
   - Default credentials: `admin@example.com` / `changeme`

#### Build and Run

```bash
# Build and start the container
docker-compose up --build -d

# Check status
docker ps
docker logs welcome
```

#### Configure Nginx Proxy Manager

1. **Login to Nginx Proxy Manager** at `http://your-server-ip:81`

2. **Add Proxy Host**:
   - Go to **Hosts** → **Proxy Hosts** → **Add Proxy Host**
   
   **Details Tab:**
   - **Domain Names**: `example.com` (replace with your domain)
   - **Scheme**: `http`
   - **Forward Hostname / IP**: `welcome` (container name)
   - **Forward Port**: `3000`
   - **Cache Assets**: ✓ (enabled)
   - **Block Common Exploits**: ✓ (enabled)
   - **Websockets Support**: ☐ (disabled)

   **SSL Tab** (for Cloudflare):
   - **SSL Certificate**: Request a new SSL Certificate
   - **Email Address**: your-email@example.com
   - **Use a DNS Challenge**: ✓ (enabled)
   - **DNS Provider**: Cloudflare
   - **Credentials File Content**:
     ```ini
     dns_cloudflare_api_token = your_cloudflare_api_token
     ```
   - **Propagation Seconds**: 30
   - **Force SSL**: ✓ (enabled)
   - **HTTP/2 Support**: ✓ (enabled)
   - **HSTS Enabled**: ✓ (enabled)
   - **HSTS Subdomains**: ✓ (enabled, if you want)

   > **Getting Cloudflare API Token:**
   > 1. Login to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   > 2. Go to **My Profile** → **API Tokens**
   > 3. Click **Create Token** → Use **Edit zone DNS** template
   > 4. Set **Zone Resources** to your domain
   > 5. Copy the token

3. **Cloudflare DNS Settings**:
   - Add an **A record** pointing to your server IP
   - Set **Proxy status** to **DNS only** (gray cloud) - important for Let's Encrypt validation
   - After SSL certificate is issued, you can enable proxy (orange cloud) if needed

4. **Save** and your site will be available at your domain with HTTPS

#### Updating the Application

```bash
# Pull latest changes
git pull

# Rebuild and restart
docker-compose up --build -d
```

## 🐳 Docker Configuration

The application uses a multi-stage Dockerfile:
1. **Build stage**: Node.js Alpine for building the React app
2. **Production stage**: Nginx Alpine for serving static files

### Network

The container connects to `proxy-net` external network for reverse proxy integration with Nginx Proxy Manager.

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
├── projects.yaml       # Projects configuration
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
Projects are configured in `projects.yaml`:
- Personal Blog (Ruby on Rails)
- PINFL Helper Bot (Python Telegram Bot)
- Dialogy App (React + Golang)

See the **Projects Configuration** section below for how to manage projects.

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

The application is configured for deployment with Nginx Proxy Manager:

```yaml
services:
  welcome:
    build: .
    container_name: welcome
    expose:
      - "3000"
    restart: unless-stopped
    networks:
      - proxy-net
```

See the **Docker Deployment** section above for complete setup instructions.

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

### Projects Configuration
Projects are managed via `projects.yaml` configuration file:

#### Updating Projects:
1. Edit `projects.yaml` with your changes
2. Rebuild and redeploy:
   ```bash
   # For Docker deployment
   docker-compose up --build -d
   
   # For local development
   npm run build
   ```

#### Project Structure in YAML:
```yaml
projects:
  - id: unique-project-id
    title:
      en: "Project Title"
      uk: "Назва Проекту"
      ru: "Название Проекта"
    description:
      en: "Project description"
      uk: "Опис проекту"
      ru: "Описание проекта"
    url: "https://project.url"
    icon: "Globe"  # Available: Globe, Bot, MessageSquare
    tags:
      - "React"
      - "TypeScript"
    disabled: false
    disabledReason:
      en: "Reason why disabled"
      uk: "Причина відключення"
      ru: "Причина отключения"
```

#### Disabling a Project:
Set `disabled: true` and provide a reason:
```yaml
disabled: true
disabledReason:
  en: "Project temporarily unavailable"
  uk: "Проєкт тимчасово недоступний"
  ru: "Проект временно недоступен"
```

### Content
Update `App.tsx` to modify:
- Personal information
- Contact links
- General translations (non-project related)

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

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/inne-dev/inne-welcome/issues).

## 👨‍💻 Author

**Inne** - Backend Developer
- Website: [inne.space](https://inne.space)
- GitHub: [@inne-dev](https://github.com/inne-dev)
- Telegram: [@inne_dev](https://t.me/inne_dev)
