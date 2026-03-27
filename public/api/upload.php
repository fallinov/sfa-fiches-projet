<?php
/**
 * Image upload API for SFA Fiches Projet.
 * Receives a compressed image via POST, saves it in ../uploads/, returns the URL.
 *
 * POST /api/upload.php
 * Body: multipart/form-data with field "image"
 * Response: { "url": "/fiches/uploads/{uuid}.jpg" }
 */

// CORS
$allowed_origins = [
    'https://devjs.ch',
    'https://fallinov.github.io',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3003',
    'http://localhost:3004',
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowed_origins, true)) {
    header("Access-Control-Allow-Origin: $origin");
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

// Preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Only POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Check file
if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    $code = $_FILES['image']['error'] ?? 'missing';
    echo json_encode(['error' => "No image uploaded (code: $code)"]);
    exit;
}

$file = $_FILES['image'];

// Validate MIME type (server-side, not just extension)
$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mime = finfo_file($finfo, $file['tmp_name']);
finfo_close($finfo);

$allowed_mimes = [
    'image/jpeg' => 'jpg',
    'image/png' => 'png',
    'image/webp' => 'webp',
];

if (!isset($allowed_mimes[$mime])) {
    http_response_code(400);
    echo json_encode(['error' => "Invalid file type: $mime"]);
    exit;
}

// Validate size (max 2MB)
$max_size = 2 * 1024 * 1024;
if ($file['size'] > $max_size) {
    http_response_code(400);
    echo json_encode(['error' => 'File too large (max 2MB)']);
    exit;
}

// Generate unique filename
$ext = $allowed_mimes[$mime];
$uuid = bin2hex(random_bytes(16));
$filename = "$uuid.$ext";

// Save to uploads directory
$uploads_dir = __DIR__ . '/../uploads';
if (!is_dir($uploads_dir)) {
    mkdir($uploads_dir, 0755, true);
}

$dest = "$uploads_dir/$filename";
if (!move_uploaded_file($file['tmp_name'], $dest)) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save file']);
    exit;
}

// Determine base path from the request URI
// On Infomaniak: /fiches/api/upload.php → base is /fiches
// On localhost: /api/upload.php → base is empty
$script_path = dirname(dirname($_SERVER['SCRIPT_NAME']));
$base = rtrim($script_path, '/');

$url = "$base/uploads/$filename";

echo json_encode(['url' => $url]);
