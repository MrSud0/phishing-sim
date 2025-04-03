FROM node:23.8-bullseye

# Install dependencies
RUN apt-get update && apt-get install -y \
  sqlite3 \
  openssl \
  libnss3 \
  libatk1.0-0 \
  libx11-xcb1 \
  libxcomposite1 \
  libxdamage1 \
  libxrandr2 \
  libgbm1 \
  libasound2 \
  libpango1.0-0 \
  libpangocairo-1.0-0 \
  libgdk-pixbuf-2.0-0 \
  libxshmfence1 \
  fonts-liberation \
  libappindicator3-1 \
  xdg-utils \
  libu2f-udev \
  chromium
  
  
# Set the working directory
WORKDIR /app

# Copy the application code
COPY . .
RUN npm install --force


# Expose the port
EXPOSE 3000

# Start the application using nodemon for development
CMD ["npx", "nodemon", "index.js"]
