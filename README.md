Telegram Channel Subscription Checker API

Ushbu loyiha Cloudflare Workers platformasida yaratilgan bo'lib, Telegram foydalanuvchisining ma'lum kanallarga obuna bo'lganligini tekshirish uchun xizmat qiladi. Loyiha VelWixAssistantBot boti uchun maxsus ishlab chiqilgan.
​🛠 Sozlamalar (Environment Variables)
​API ishlashi uchun Cloudflare Dashboard-da quyidagi o'zgaruvchilarni sozlashingiz kerak:
​BOT_TOKEN: Telegram botingizning tokeni.
​API_KEY: So'rovlarni himoya qilish uchun o'zingiz o'ylab topgan maxfiy kalit.
​🚀 So'rov yuborish tartibi
​API-ga faqat POST so'rovi orqali murojaat qilinadi. URL manzili quyidagi ko'rinishda bo'lishi kerak:
​https://sizning-worker-manzilingiz.dev/{API_KEY}/check/channel
​So'rov namunasi (JSON)
​So'rov yuborilganda Content-Type: application/json sarlavhasidan foydalaning.
{
  "user_id": 123456789,
  "channels": [
    "@kanal_username",
    "-100123456789"
  ]
}
​user_id: Tekshirilishi kerak bo'lgan foydalanuvchining Telegram ID raqami.
​channels: Kanallar ro'yxati (massiv ko'rinishida). Username yoki ID shaklida yuborish mumkin.
​📥 Javoblar (Responses)
​1. Muvaffaqiyatli javob (200 OK)
​Agar so'rov to'g'ri bo'lsa va API kalit mos kelsa, tizim har bir kanal uchun true (obuna bo'lgan) yoki false (obuna bo'lmagan) qiymatini qaytaradi.

{
  "status": "success",
  "results": {
    "@kanal_username": true,
    "-100123456789": false
  }
}

​405 Method Not Allowed: Agar so'rov POST emas, boshqa metodda yuborilsa.
​403 Unauthorized: URL-dagi API_KEY noto'g'ri bo'lsa.
​400 Invalid Request: JSON formati noto'g'ri yoki ma'lumotlar yetishmasa.
​⚠️ Muhim eslatmalar
​Bot huquqlari: Bot tekshirilayotgan kanallarda albatta Administrator huquqiga ega bo'lishi shart. Aks holda, Telegram API obuna holatini aniqlay olmaydi va natija har doim false qaytadi.
​CORS: API har qanday tashqi manbadan (frontend) so'rov qabul qilishga tayyor (Access-Control-Allow-Origin: *).
​Xavfsizlik: API_KEY ni hech kimga bermang, chunki u sizning botingiz nomidan so'rov yuborish imkonini beradi.
​✨ Muallif va loyiha
​Ushbu tizim VelWixAssistantBot (https://t.me/VelWixAssistantBot)
faoliyatini avtomatlashtirish va obunachilarni tezkor tekshirish uchun yaratildi.
