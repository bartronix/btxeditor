<?php

header('Content-type: application/json');

//change config parameters as desired
$config = ['maxsize' => 5,
                'extensions' => ['jpg', 'jpeg', 'png'],
                'baseUrl' => 'http://localhost', ];

$targetDir = $_SERVER['DOCUMENT_ROOT'].'/assets/plugins/btxeditor/uploads/'.date('Y').'/'.date('n');
$targetDirRelative = str_replace($_SERVER['DOCUMENT_ROOT'], $config['baseUrl'], $targetDir);

//create uploaddir if not exists
if (!file_exists($targetDir)) {
    $mode = 0755;
    @mkdir($targetDir, $mode, true);
}

//validation
$errors = [];
$fileName = $_FILES['file']['name'];
$fileSize = $_FILES['file']['size'];
$fileNameParams = explode('.', $fileName);
$fileExtension = strtolower(end($fileNameParams));

//check extensions
if (!in_array($fileExtension, $config['extensions'])) {
    $errors[] = 'The image has to be of the following type: '.implode(' ', $config['extensions']).'.';
}
//check max size
if ($fileSize > ($config['maxsize'] * 1024 * 1024)) {
    $errors[] = 'Please upload an image with a max size of '.$config['maxsize'].'.';
}
//no errors? Return relative url - otherwise send errors
if (empty($errors)) {
    $uploadFile = move_uploaded_file($_FILES['file']['tmp_name'], $targetDir.'/'.$fileNameParams[0].'_'.time().'.'.$fileExtension);
    if ($uploadFile) {
        echo json_encode(['error' => 0, 'image' => $targetDirRelative.'/'.$fileNameParams[0].'_'.time().'.'.$fileExtension]);
    } else {
        echo json_encode(['error' => 1, 'message' => 'File not uploaded.']);
    }
} else {
    echo json_encode(['error' => 1, 'message' => implode("\r\n", $errors)]);
}
