async function login() {
    const studentId = document.getElementById("studentId").value;
    const password = document.getElementById("password").value;
    const resultElement = document.getElementById("result");
    
    // التحقق من وجود البيانات المدخلة
    if (!studentId || !password) {
        resultElement.innerHTML = "❌ الرجاء ملء جميع الحقول.";
        return;
    }

    // إظهار مؤشر تحميل
    document.getElementById("loading").style.display = "block";

    try {
        const apiUrl = "https://script.google.com/macros/s/AKfycbwXFxs_vNfcZBfx4fFzmUaFDNOqDn7qeWGS-d3Xs8jtxZBOFvIvO0yQwIiAk7K-uGmH/exec?studentId=" + encodeURIComponent(studentId) + "&password=" + encodeURIComponent(password);
        
        // طلب البيانات
        const response = await fetch(apiUrl);
        
        // التأكد من أن الاستجابة ناجحة
        if (!response.ok) {
            throw new Error("فشل في الاتصال بالخادم.");
        }

        const data = await response.json();

        // إخفاء مؤشر التحميل
        document.getElementById("loading").style.display = "none";

        // التحقق من الصلاحيات
        if (data.access) {
            localStorage.setItem("videos", JSON.stringify(data.videos));
            window.location.href = "dashboard.html"; // الانتقال إلى صفحة لوحة التحكم
        } else {
            resultElement.innerHTML = "❌ بيانات تسجيل الدخول غير صحيحة.";
        }
    } catch (error) {
        // إخفاء مؤشر التحميل عند حدوث أي خطأ
        document.getElementById("loading").style.display = "none";
        resultElement.innerHTML = "❌ حدث خطأ، الرجاء المحاولة لاحقًا.";
        console.error("Error during login:", error); // عرض الخطأ في الكونسول للمطور
    }
}