async function login() {
    const studentId = document.getElementById("studentId").value.trim();
    const password = document.getElementById("password").value.trim();
    const resultElement = document.getElementById("result");
    const loadingElement = document.getElementById("loading");

    // التحقق من إدخال جميع البيانات
    if (!studentId || !password) {
        showMessage(resultElement, "❌ الرجاء ملء جميع الحقول.", "error");
        return;
    }

    // إظهار مؤشر التحميل
    loadingElement.style.display = "block";

    try {
        const data = await fetchLoginData(studentId, password);
        if (data.access) {
            localStorage.setItem("videos", JSON.stringify(data.videos));
            window.location.href = "dashboard.html"; // الانتقال إلى صفحة لوحة التحكم
        } else {
            showMessage(resultElement, "❌ بيانات تسجيل الدخول غير صحيحة.", "error");
        }
    } catch (error) {
        showMessage(resultElement, `❌ ${error.message}`, "error");
    } finally {
        // إخفاء مؤشر التحميل دائمًا سواء كان هناك خطأ أو لا
        loadingElement.style.display = "none";
    }
}

// ✅ وظيفة لجلب البيانات من API
async function fetchLoginData(studentId, password) {
    const apiUrl = `https://script.google.com/macros/s/AKfycbwXFxs_vNfcZBfx4fFzmUaFDNOqDn7qeWGS-d3Xs8jtxZBOFvIvO0yQwIiAk7K-uGmH/exec?studentId=${encodeURIComponent(studentId)}&password=${encodeURIComponent(password)}`;
    
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("فشل في الاتصال بالخادم.");

    return await response.json();
}

// ✅ وظيفة لعرض الرسائل مع التحكم في الألوان
function showMessage(element, message, type = "info") {
    element.innerHTML = message;
    element.style.color = type === "error" ? "red" : "green";
}
