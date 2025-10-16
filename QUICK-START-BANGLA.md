# 🚀 দ্রুত শুরু করার গাইড (Quick Start Guide)

## ধাপ ১: প্রজেক্ট সেটআপ

### Dependencies ইনস্টল করুন
```bash
npm install
```

### অতিরিক্ত প্যাকেজ ইনস্টল করুন
```bash
npm install --save-dev @types/multer @types/morgan
npm install morgan @nestjs/swagger swagger-ui-express
```

## ধাপ ২: Environment Setup

### `.env` ফাইল তৈরি করুন
প্রজেক্টের রুট ফোল্ডারে `.env` ফাইল তৈরি করে নিচের কোড দিন:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/expense_day8
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRES_IN=7d
```

## ধাপ ৩: MongoDB চালু করুন

### Windows এ:
```bash
net start MongoDB
```

### Mac/Linux এ:
```bash
sudo systemctl start mongod
```

## ধাপ ৪: Database Seed করুন (Optional)

```bash
npm run build
node dist/scripts/seed.js
```

**Demo User তৈরি হবে:**
- Email: `demo@example.com`
- Password: `secret123`

## ধাপ ৫: সার্ভার চালু করুন

### Development Mode (Hot Reload সহ):
```bash
npm run start:dev
```

### সার্ভার চলবে:
- API: http://localhost:5000/api/v1
- Swagger Docs: http://localhost:5000/api/docs

## 🧪 API টেস্ট করার ধাপ

### পদ্ধতি ১: Swagger UI ব্যবহার করে
1. ব্রাউজারে যান: http://localhost:5000/api/docs
2. "Authorize" বাটনে ক্লিক করুন
3. Login করে JWT token পান
4. Token দিয়ে সব endpoint টেস্ট করুন

### পদ্ধতি ২: Postman ব্যবহার করে
1. Postman খুলুন
2. Import → Upload Files
3. `Expense-API.postman_collection.json` সিলেক্ট করুন
4. "Signup" বা "Login" রিকোয়েস্ট চালান
5. Token অটোমেটিক সেভ হবে
6. অন্য endpoint গুলো টেস্ট করুন

### পদ্ধতি ৩: cURL ব্যবহার করে

#### ১. Signup করুন:
```bash
curl -X POST http://localhost:5000/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Maruf Hossain\",\"email\":\"maruf@example.com\",\"password\":\"password123\"}"
```

#### ২. Login করুন:
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"maruf@example.com\",\"password\":\"password123\"}"
```

**Response থেকে `accessToken` কপি করুন**

#### ৩. Category তৈরি করুন:
```bash
curl -X POST http://localhost:5000/api/v1/categories \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Food & Dining\",\"slug\":\"food-dining\",\"color\":\"#FF6B6B\"}"
```

#### ৪. Expense তৈরি করুন:
```bash
curl -X POST http://localhost:5000/api/v1/expenses \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Lunch\",\"amount\":450,\"categoryId\":\"CATEGORY_ID\",\"date\":\"2025-10-15\",\"paymentMethod\":\"cash\"}"
```

## 📋 Demo Data ব্যবহার করুন

`demo-data.json` ফাইলে সব ধরনের sample data আছে:
- ৮টি Category
- ১০টি Expense
- ৫টি Budget
- ৫টি Recurring Expense
- সব endpoint এর request example

## 🔧 সমস্যা সমাধান

### Port Already in Use Error
যদি `EADDRINUSE` error আসে:
```bash
# সব Node process বন্ধ করুন
taskkill /F /IM node.exe

# অথবা .env এ port পরিবর্তন করুন
PORT=3000
```

### MongoDB Connection Error
```bash
# MongoDB চালু আছে কিনা চেক করুন
net start MongoDB

# Connection string চেক করুন .env ফাইলে
```

### TypeScript Error
```bash
# Clean build করুন
npm run build

# node_modules মুছে আবার install করুন
rm -rf node_modules package-lock.json
npm install
```

## 📊 API Endpoints সংক্ষেপে

| Module | Endpoint | Method | Auth |
|--------|----------|--------|------|
| Auth | `/auth/signup` | POST | ❌ |
| Auth | `/auth/login` | POST | ❌ |
| Categories | `/categories` | GET/POST/PUT/DELETE | ✅ |
| Expenses | `/expenses` | GET/POST/PUT/DELETE | ✅ |
| Budgets | `/budgets` | GET/POST/PUT/DELETE | ✅ |
| Recurring | `/recurring-expenses` | GET/POST/PUT/DELETE | ✅ |
| Reports | `/reports/summary` | GET | ✅ |
| Upload | `/uploads/receipt` | POST | ✅ |

## 🎯 টেস্টিং এর ক্রম

1. **Signup** → নতুন user তৈরি করুন
2. **Login** → JWT token পান
3. **Create Categories** → ৮টি category তৈরি করুন
4. **Create Expenses** → কিছু expense যোগ করুন
5. **Set Budgets** → মাসিক budget সেট করুন
6. **Add Recurring** → recurring expense যোগ করুন
7. **View Reports** → summary report দেখুন
8. **Upload Receipt** → receipt image আপলোড করুন

## 💡 টিপস

- সব protected endpoint এ `Authorization: Bearer <token>` header লাগবে
- Date format: `YYYY-MM-DD` (যেমন: 2025-10-15)
- Month format: `YYYY-MM` (যেমন: 2025-10)
- Payment methods: `cash`, `card`, `bkash`, `nagad`, `rocket`, `bank_transfer`
- Cadence options: `daily`, `weekly`, `monthly`

## 📞 সাহায্য দরকার?

- Swagger Docs দেখুন: http://localhost:5000/api/docs
- `demo-data.json` ফাইল দেখুন
- Postman collection ইমপোর্ট করুন
- README.md পড়ুন

## ✅ সফলভাবে Setup হয়েছে কিনা চেক করুন

যদি নিচের সব কিছু কাজ করে তাহলে setup সফল:

- ✅ `npm run start:dev` চলছে
- ✅ http://localhost:5000/api/v1 খুললে response আসছে
- ✅ http://localhost:5000/api/docs এ Swagger UI দেখা যাচ্ছে
- ✅ Signup/Login করা যাচ্ছে
- ✅ Token দিয়ে protected endpoint access করা যাচ্ছে

**শুভকামনা! 🎉**
