FROM apify/actor-node:20

COPY package.json ./

RUN npm --quiet set progress=false \
    && npm install --only=prod --no-optional \
    && echo "Dependencies installed"

COPY . ./

CMD npm start
