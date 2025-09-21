// =================== SECTION 1: Active Nav Link on Scroll =================== 
window.addEventListener('scroll', () => {
  let sections = document.querySelectorAll('section');
  let navLinks = document.querySelectorAll('header nav a');
  let top = window.scrollY;

  sections.forEach(sec => {
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach(link => link.classList.remove('active'));
      let activeLink = document.querySelector('header nav a[href*="' + id + '"]');
      if (activeLink) activeLink.classList.add('active');
    }
  });
});

// ===== SECTION 2: Mobile Navbar Toggle =====
document.addEventListener('DOMContentLoaded', () => {
  const menuIcon = document.querySelector('#menu-icon');
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.navbar a');

  if (menuIcon && navbar) {
    menuIcon.onclick = () => {
      menuIcon.classList.toggle('bx-x');
      navbar.classList.toggle('active');

      let expanded = menuIcon.getAttribute('aria-expanded') === 'true';
      menuIcon.setAttribute('aria-expanded', !expanded);
    };

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
        menuIcon.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ===== SECTION 3 : Contact Form via EmailJS =====
  emailjs.init("1JJNvxzdNM2UGANI3"); // EmailJS public key

  const form = document.getElementById("contact-form");
  const sendBtn = document.getElementById("send-btn");

  if (form && sendBtn) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const originalValue = sendBtn.value;
      sendBtn.disabled = true;

      emailjs.sendForm("service_z1o4wqo", "template_76bwhin", form)
        .then(() => {

          form.reset();
          sendBtn.value = "Message Sent";

          setTimeout(() => {
            sendBtn.value = originalValue;
            sendBtn.disabled = false;
          }, 3000);
        })
        .catch((error) => {
          console.error("Send failed:", error);
          sendBtn.value = "Send Failed";

          setTimeout(() => {
            sendBtn.value = originalValue;
            sendBtn.disabled = false;
          }, 3000);
        });
    });
  }

  // ===== SECTION 4: Show 'Message Sent' for 3 Seconds (Confirmation) =====
  const confirmationForm = document.getElementById('contactForm');
  const message = document.getElementById('messageSent');

  if (confirmationForm && message) {
    confirmationForm.addEventListener('submit', function (e) {
      e.preventDefault();
      message.style.display = 'block';
      message.classList.add('show');

      setTimeout(() => {
        message.classList.remove('show');
        message.style.display = 'none';
      }, 3000);

      this.reset();
    });
  }

  // ===== SECTION 5 : CV Request Form =====
  const showFormBtn = document.getElementById('show-form-btn');
  const cvForm = document.getElementById('cv-form');
  const cancelBtn = document.getElementById('cancel-btn');
  const messageBox = document.getElementById('message-box');

  if (showFormBtn && cvForm && cancelBtn && messageBox) {
    showFormBtn.addEventListener('click', () => {
      cvForm.style.display = 'block';
      showFormBtn.style.display = 'none';
    });

    cancelBtn.addEventListener('click', () => {
      cvForm.reset();
      cvForm.style.display = 'none';
      showFormBtn.style.display = 'inline-block';
    });

    cvForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const fullName = document.getElementById('fullName').value.trim();
      const company = document.getElementById('company').value.trim();
      const position = document.getElementById('position').value.trim();

      const subject = encodeURIComponent('Request for CV');
      const body = encodeURIComponent(
        `Hello,\n\nI would like to request your CV. Here are my details:\n\n` +
        `Name of the person: ${fullName}\n` +
        `Company: ${company}\n` +
        `Position in the company: ${position}\n\n` +
        `Thank you.`
      );

      const email = 'youremail@example.com'; // Replace with your email
      const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;

      messageBox.classList.add('show');

      setTimeout(() => {
        messageBox.classList.remove('show');

        // Generate PDF
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.setFontSize(12);
        doc.text("CV Request Form", 20, 20);
        doc.text(`Full Name: ${fullName}`, 20, 40);
        doc.text(`Company: ${company}`, 20, 50);
        doc.text(`Position: ${position}`, 20, 60);
        doc.save("cv-request.pdf");

        // Open mailto
        window.location.href = mailtoLink;

        // Reset form
        cvForm.reset();
        cvForm.style.display = 'none';
        showFormBtn.style.display = 'inline-block';
      }, 5000);
    });
  }
});

const showFormBtn = document.getElementById('show-form-btn');
const cvForm = document.getElementById('cv-form');
const cancelBtn = document.getElementById('cancel-btn');
const messageBox = document.getElementById('message-box');

// Show form and hide main button
showFormBtn.addEventListener('click', () => {
  cvForm.style.display = 'block';
  showFormBtn.style.display = 'none';
});

// Cancel button resets form and shows main button
cancelBtn.addEventListener('click', () => {
  cvForm.reset();
  cvForm.style.display = 'none';
  showFormBtn.style.display = 'inline-block';
});

cvForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const fullName = document.getElementById('fullName').value.trim();
  const company = document.getElementById('company').value.trim();
  const position = document.getElementById('position').value.trim();

  // ✅ Generate random reference ID
  const referenceID = 'REF-' + Math.random().toString(36).substring(2, 8).toUpperCase();

  // ✅ Include referenceID in the subject
  const subject = encodeURIComponent(`Request for CV - ${referenceID}`);
  const body = encodeURIComponent(
    
      `Hello,\n\n` +
      `I would like to request your CV. Below are my details:\n\n` +
      `Reference ID : ${referenceID}\n\n` +
      `Full Name     : ${fullName}\n` +
      `Company       : ${company}\n` +
      `Position      : ${position}\n\n` +
      `Looking forward to your response.\n\n` +
      `Best regards,\n` +
      `${fullName}`
  );

  const email = 'youremail@example.com'; // Replace with your email
  const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;

  // ✅ Show message for 5 seconds
  messageBox.classList.add('show');

  setTimeout(() => {
    messageBox.classList.remove('show');

    // ✅ Generate PDF
    const { jsPDF } = window.jspdf;
    // const doc = new jsPDF();
    // doc.setFontSize(12);
    // doc.text("CV Request Form", 20, 20);
    // doc.text(`Reference ID: ${referenceID}`, 20, 30);
    // doc.text(`Full Name: ${fullName}`, 20, 50);
    // doc.text(`Company: ${company}`, 20, 60);
    // doc.text(`Position: ${position}`, 20, 70);
    // doc.save(`cv-request-${referenceID}.pdf`);
  
    const doc = new jsPDF();

// 📌 Top Reference ID Header
doc.setFontSize(22);
doc.setFont(undefined, 'bold');
doc.text(`Reference ID: ${referenceID}`, 105, 30, { align: 'center' });

// 📆 Date & Time
const now = new Date();
const dateString = now.toLocaleDateString();
const timeString = now.toLocaleTimeString();


// 📝 Response Letter (center of page)
const yourName = "Jeff Kalombo"; // Replace with your real name

const responseLines = [
  `Thank you, ${fullName}, for your interest in my CV.`,
  "I will review your request and respond shortly.",
  "",
  "Please keep your request reference for any future correspondence.",
  "Feel free to reach out anytime via the contact form on my portfolio.",
  "",
  "Best regards,",
  yourName,
  `Sent on: ${dateString} at ${timeString}`
];

// Set font for response
doc.setFontSize(12);
doc.setFont(undefined, 'normal');

// Calculate vertical start position to center the block
const lineHeight = 10;
const contentHeight = responseLines.length * lineHeight;
const pageHeight = doc.internal.pageSize.getHeight();
let y = (pageHeight - contentHeight) / 2;

// Write each line centered
responseLines.forEach(line => {
  doc.text(line, 105, y, { align: 'center' });
  y += lineHeight;
});

// 💾 Save the PDF
doc.save(`cv-request-${referenceID}.pdf`);



    // ✅ Open mailto
    window.location.href = mailtoLink;

    // ✅ Reset form and show button
    cvForm.reset();
    cvForm.style.display = 'none';
    showFormBtn.style.display = 'inline-block';
  }, 5000);
});


// ==================== SECTION 6: Play Video on Hover ====================
document.querySelectorAll('.portfolio-box').forEach(box => {
  const video = box.querySelector('video');

  box.addEventListener('mouseenter', () => {
    video.play();
  });

  box.addEventListener('mouseleave', () => {
    video.pause();
    video.currentTime = 0;
  });
});

