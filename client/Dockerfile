# --- स्टेज 1: रिएक्ट ऐप को बिल्ड करना ---
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# रिएक्ट का प्रोडक्शन बिल्ड (dist या build फोल्डर) तैयार करें
RUN npm run build

# --- स्टेज 2: Nginx सर्वर में बिल्ड फाइल्स डालना ---
FROM nginx:alpine

# स्टेज 1 से बनी हुई बिल्ड फाइल्स को Nginx के डिफ़ॉल्ट फोल्डर में कॉपी करें
COPY --from=build /app/dist /usr/share/nginx/html

# 🎯 यहाँ यह जादुई लाइन जोड़ें (Nginx को रीफ्रेश हैंडल करना सिखाने के लिए)
RUN sed -i 's/try_files $uri $uri\/ =404;/try_files $uri $uri\/ \/index.html;/' /etc/nginx/conf.d/default.conf

# Nginx डिफ़ॉल्ट रूप से पोर्ट 80 पर चलता है
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]