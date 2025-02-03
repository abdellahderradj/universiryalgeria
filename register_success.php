<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $contact = $_POST['contact'];
    $series = $_POST['series'];
    
    // التعامل مع الملف المرسل
    if (isset($_FILES['file'])) {
        $file = $_FILES['file'];
        $fileName = $file['name'];
        // قم بمعالجة الملف هنا (مثل حفظه في المجلد المناسب)
    }

    // هنا يمكنك تنفيذ أي معالجة إضافية مثل تخزين البيانات في قاعدة البيانات أو إرسال رسالة تأكيد
    echo "Registration successful!<br>";
    echo "Contact: $contact<br>";
    echo "Series: $series<br>";
    echo "File: $fileName<br>";
} else {
    echo "Invalid request method.";
}
?>
<?php
// السماح فقط بطلبات POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $contact = isset($_POST['contact']) ? $_POST['contact'] : 'N/A';
    $series = isset($_POST['series']) ? $_POST['series'] : 'N/A';
    $fileName = 'No file uploaded';

    // التحقق من وجود ملف
    if (isset($_FILES['file'])) {
        $file = $_FILES['file'];
        $fileName = $file['name'];
        
        // حفظ الملف في مجلد "uploads"
        $uploadDir = 'uploads/';
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }
        move_uploaded_file($file['tmp_name'], $uploadDir . $fileName);
    }

    // إرسال استجابة JSON
    echo json_encode([
        'status' => 'success',
        'message' => 'Registration successful!',
        'contact' => $contact,
        'series' => $series,
        'file' => $fileName
    ]);
} else {
    // منع الطلبات غير POST
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
}
?>
<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
