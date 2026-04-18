# Introduction

React বা Next.js প্রজেক্টে কাজ করার সময় `npm run dev` বা `pnpm dev` কমান্ড দেওয়ার পর যদি **Port 3000 Permission Denied** error আসে, তাহলে অনেকেই মনে করেন কোডে সমস্যা হয়েছে। কিন্তু বাস্তবে এটি বেশিরভাগ সময় Windows networking issue।

বিশেষ করে যারা Portfolio, Dashboard, Landing Page বা Client Project build করেন, তাদের জন্য এই সমস্যা খুবই common। আজকের এই গাইডে জানবেন কেন এই error হয়, কীভাবে ২ মিনিটে fix করবেন, এবং future এ কীভাবে avoid করবেন।

---

# Port 3000 Permission Denied Error কী?

যখন আপনি React, Next.js বা Vite project run করেন, তখন অনেক framework default হিসেবে **localhost:3000** ব্যবহার করে।

কিন্তু Windows এর কিছু service এই port block বা reserve করে রাখে।

তখন terminal এ নিচের মতো error আসে:

```bash
Error: listen EACCES: permission denied 0.0.0.0:3000
