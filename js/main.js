// (FormSubmit.co AJAX endpoint)
(function () {
  var form = document.getElementById("contact-form");
  if (!form) return;

  var thankYou = document.getElementById("thank-you-message");
  var errorBox = document.getElementById("form-error");
  var submitButton = form.querySelector("button[type='submit']");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var honey = form.querySelector("input[name='_honey']");
    if (honey && honey.value) {
      return;
    }

    if (errorBox) {
      errorBox.classList.add("hidden");
      errorBox.textContent = "";
    }
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    var data = {
      name: form.name.value,
      subject: form.subject.value,
      message: form.message.value,
      _subject: "New portfolio contact form message: " + form.subject.value,
      _template: "table",
    };

    fetch("https://formsubmit.co/ajax/aubdero@gatech.edu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Form submission failed");
        }
        return response.json();
      })
      .then(function (result) {
        if (!result || String(result.success) !== "true") {
          throw new Error(
            (result && result.message) || "Form submission failed"
          );
        }
        form.classList.add("hidden");
        if (thankYou) {
          thankYou.classList.remove("hidden");
          thankYou.setAttribute("tabindex", "-1");
          thankYou.focus();
        }
      })
      .catch(function () {
        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
        if (errorBox) {
          errorBox.textContent =
            "Something went wrong sending your message. Please try again, or email aubdero@gatech.edu directly.";
          errorBox.classList.remove("hidden");
        }
      });
  });
})();
