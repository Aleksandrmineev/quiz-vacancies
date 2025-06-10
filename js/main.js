document.addEventListener("DOMContentLoaded", function () {
  // Подсветка активного пункта меню
  const currentPath = window.location.pathname
    .replace(/\/index\.html$/, "")
    .replace(/\/$/, "");

  document.querySelectorAll(".nav__list a").forEach((link) => {
    const linkPath = new URL(link.href, window.location.origin).pathname
      .replace(/\/index\.html$/, "")
      .replace(/\/$/, "");

    if (linkPath === currentPath) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Квиз
  const quizStartBtn = document.querySelector(".quiz-start-btn");
  const quizIntro = document.querySelector(".quiz-intro");
  const quizBlock = document.querySelector("#quiz-start");

  if (quizStartBtn && quizIntro && quizBlock) {
    quizStartBtn.addEventListener("click", function (e) {
      e.preventDefault();
      quizIntro.style.display = "none";
      quizBlock.classList.add("active");
    });
  }

  const steps = document.querySelectorAll(".quiz__step");
  const nextBtns = document.querySelectorAll(".quiz__next");
  const prevBtns = document.querySelectorAll(".quiz__prev");
  const progressBar = document.querySelector(".quiz__progress-bar span");
  const progressText = document.querySelector(".quiz__progress-value");

  let currentStep = 0;
  const totalSteps = 3;

  function showStep(index) {
    let currentStepNumber = index + 1;

    steps.forEach((step) => {
      const stepNum = step.getAttribute("data-step");

      if (currentStepNumber === 3) {
        // Специальная логика для шага 3
        if (document.body.classList.contains("show-form")) {
          step.classList.toggle("active", stepNum === "3-alt");
        } else {
          step.classList.toggle("active", stepNum === "3");
        }
      } else {
        // Обычная логика для шагов 1, 2 и 4
        step.classList.toggle(
          "active",
          stepNum == currentStepNumber.toString()
        );
      }

      const prevBtn = step.querySelector(".quiz__prev");
      if (prevBtn) {
        prevBtn.disabled = index === 0;
      }
    });

    let percent = 0;
    if (index === 1) percent = 33;
    else if (index === 2) percent = 67;
    else if (index === 3) percent = 100;

    progressBar.style.width = percent + "%";
    progressText.textContent = percent + "%";

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function toggleThirdStep() {
    const showForm = document.body.classList.contains("show-form");

    const thirdStep = document.querySelector('.quiz__step[data-step="3"]');
    const thirdStepAlt = document.querySelector(
      '.quiz__step[data-step="3-alt"]'
    );

    if (showForm) {
      thirdStep?.classList.add("hidden");
      thirdStepAlt?.classList.remove("hidden");
    } else {
      thirdStep?.classList.remove("hidden");
      thirdStepAlt?.classList.add("hidden");
    }
  }

  // Следующий шаг
  nextBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const currentForm = steps[currentStep].querySelector("form");
      const checked = currentForm?.querySelector("input[type='radio']:checked");

      if (!checked) {
        alert("Пожалуйста, выберите вариант.");
        return;
      }

      if (currentStep < totalSteps - 1) {
        currentStep++;

        showStep(currentStep);
      } else {
        // Финальный шаг — показать нужный блок
        steps[currentStep].classList.remove("active");

        const tgBlock = document.querySelector("#quiz-final-telegram");
        const formBlock = document.querySelector("#quiz-final-form");
        const showForm = document.body.classList.contains("show-form");

        if (showForm) {
          formBlock?.classList.add("active");
          formBlock?.style.setProperty("display", "flex");
          tgBlock?.classList.remove("active");
          tgBlock?.style.setProperty("display", "none");
        } else {
          tgBlock?.classList.add("active");
          tgBlock?.style.setProperty("display", "flex");
          formBlock?.classList.remove("active");
          formBlock?.style.setProperty("display", "none");
        }
      }
    });
  });

  // Предыдущий шаг
  prevBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    });
  });

  // Автоматический переход при выборе варианта
  steps.forEach((step, stepIndex) => {
    const radios = step.querySelectorAll("input[type='radio']");
    radios.forEach((radio) => {
      radio.addEventListener("change", () => {
        setTimeout(() => {
          if (stepIndex < totalSteps - 1) {
            currentStep = stepIndex + 1;
            showStep(currentStep);
          } else {
            steps[stepIndex].classList.remove("active");

            const tgBlock = document.querySelector("#quiz-final-telegram");
            const formBlock = document.querySelector("#quiz-final-form");
            const showForm = document.body.classList.contains("show-form");

            if (showForm) {
              formBlock?.classList.add("active");
              formBlock?.style.setProperty("display", "flex");
              tgBlock?.classList.remove("active");
              tgBlock?.style.setProperty("display", "none");
            } else {
              tgBlock?.classList.add("active");
              tgBlock?.style.setProperty("display", "flex");
              formBlock?.classList.remove("active");
              formBlock?.style.setProperty("display", "none");
            }
          }
        }, 150);
      });
    });
  });

  showStep(currentStep);

  // Переход на страницу "Спасибо" после отправки формы + проверка и маска
  const callbackForm = document.querySelector(".quiz__callback-form");

  if (callbackForm) {
    const nameInput = callbackForm.querySelector("input[name='name']");
    const phoneInput = callbackForm.querySelector("input[name='phone']");
    const nameHint = callbackForm.querySelector(".form-hint--name");
    const phoneHint = callbackForm.querySelector(".form-hint--phone");

    phoneInput.addEventListener("input", function () {
      let x = phoneInput.value.replace(/\D/g, "");

      if (!x.startsWith("7")) {
        x = "7" + x;
      }

      x = x.substring(0, 11);

      let formatted = "+7";
      if (x.length > 1) formatted += " " + x.substring(1, 4);
      if (x.length >= 5) formatted += " " + x.substring(4, 7);
      if (x.length >= 8) formatted += " " + x.substring(7, 9);
      if (x.length >= 10) formatted += " " + x.substring(9, 11);

      phoneInput.value = formatted;
    });

    callbackForm.addEventListener("submit", function (e) {
      e.preventDefault();
      let valid = true;

      const nameValue = nameInput.value.trim();
      const phoneDigits = phoneInput.value.replace(/\D/g, "");

      const nameRegex = /^[А-ЯЁа-яё]{3,}(?:\s[А-ЯЁа-яё]{3,})?$/;
      if (!nameRegex.test(nameValue)) {
        nameHint.textContent =
          "* Имя должно содержать минимум 3 буквы на русском языке";
        nameHint.style.color = "red";
        valid = false;
      } else {
        nameHint.textContent = "";
        nameHint.style.color = "";
      }

      if (phoneDigits.length !== 11 || !phoneDigits.startsWith("7")) {
        phoneHint.textContent =
          "* Введите номер в формате +7 XXX XXX XX XX (10 цифр после +7)";
        phoneHint.style.color = "red";
        valid = false;
      } else {
        phoneHint.textContent = "";
        phoneHint.style.color = "";
      }

      if (valid) {
        window.location.href = "thankyou.html";
      }
    });
  }
});
