# Get the latest version of Playwright
FROM mcr.microsoft.com/playwright:focal


# Start with Python 3.9-slim as the base image
FROM python:3.9-slim


# Install necessary tools and libraries
RUN apt-get update && apt-get install -y \
    curl \
    gnupg2 \
    libnss3 \
    libatk-bridge2.0-0 \
    libdrm-dev \
    libxkbcommon-dev \
    libgbm-dev \
    libasound-dev \
    libatspi2.0-0 \
    libxshmfence-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Set the work directory for the application
WORKDIR /app

# Set the environment path to node_modules/.bin
ENV PATH /app/node_modules/.bin:$PATH

# Copy the needed files to the app folder in Docker image
COPY package.json /app/
COPY tests/ /app/tests/
COPY tsconfig.json /app/
COPY config.toml /app/
COPY playwright.config.ts /app/
COPY newman/ /app/newman/
COPY k6/ /app/k6/
COPY python39/ /app/python39/



# Install Node.js dependencies
RUN npm install

# Install newman
RUN npm install newman

# Install k6
RUN apt-get update \
    && apt-get install -y debian-archive-keyring \
    && mkdir -p /etc/apt/keyrings \
    && curl -fsSL https://dl.k6.io/key.gpg | gpg --dearmor -o /etc/apt/keyrings/k6-archive-keyring.gpg \
    && echo "deb [signed-by=/etc/apt/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | tee /etc/apt/sources.list.d/k6.list \
    && apt-get update \
    && apt-get install -y k6 \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY /python39/requirements.txt /app/
RUN pip3 install --no-cache-dir -r requirements.txt

# Copy the Python script
COPY /python39/hello_world.py /app/

# You may want to add a CMD or ENTRYPOINT here to specify what should run when the container starts
# For example:
# CMD ["python", "hello_world.py"]
