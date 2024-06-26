<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    // Set up email parameters
    $to = "andreybelenkiy77@gmail.com"; // Replace with your email address
    $headers = "From: $email \r\n";
    $headers .= "Reply-To: $email \r\n";
    $email_subject = "New Contact Form Submission: $subject";
    $email_body = "You have received a new message from your website contact form.\n\n".
                  "Name: $name\n".
                  "Email: $email\n".
                  "Message:\n$message\n";

    // Send email
    if (mail($to, $email_subject, $email_body, $headers)) {
        echo "Thank you for contacting us. We will be in touch shortly.";
    } else {
        echo "Oops! Something went wrong. Please try again later.";
    }
}
?>