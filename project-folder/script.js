async function login() {
    const studentId = document.getElementById("studentId").value;
    const password = document.getElementById("password").value;
    const apiUrl = "https://script.google.com/macros/s/AKfycbwXFxs_vNfcZBfx4fFzmUaFDNOqDn7qeWGS-d3Xs8jtxZBOFvIvO0yQwIiAk7K-uGmH/exec?studentId=" + encodeURIComponent(studentId) + "&password=" + encodeURIComponent(password);
    
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.access) {
        localStorage.setItem("videos", JSON.stringify(data.videos));
        window.location.href = "dashboard.html";
    } else {
        document.getElementById("result").innerHTML = "❌ بيانات تسجيل الدخول غير صحيحة.";
    }
}


