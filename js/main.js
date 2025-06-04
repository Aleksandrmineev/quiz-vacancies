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
  // const totalSteps = steps.length;
  const totalSteps = 3;
  function showStep(index) {
    steps.forEach((step, i) => {
      step.classList.toggle("active", i === index);
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

                  const tgBlock = document.querySelector(
                    "#quiz-final-telegram"
                  );
                  const formBlock = document.querySelector("#quiz-final-form");
                  const showForm =
                    document.body.classList.contains("show-form");

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
      } else {
        // Финальный шаг — показать нужный блок
        steps[currentStep].classList.remove("active");

        const tgBlock = document.querySelector("#quiz-final-telegram");
        const formBlock = document.querySelector("#quiz-final-form");
        const showForm = document.body.classList.contains("show-form");

        if (showForm) {
          if (formBlock) {
            formBlock.style.display = "flex";
            formBlock.classList.add("active");
          }
          if (tgBlock) {
            tgBlock.style.display = "none";
            tgBlock.classList.remove("active");
          }
        } else {
          if (tgBlock) {
            tgBlock.style.display = "flex";
            tgBlock.classList.add("active");
          }
          if (formBlock) {
            formBlock.style.display = "none";
            formBlock.classList.remove("active");
          }
        }
      }
    });
  });

  // Предыдущий шаг
  prevBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (currentStep > 0) {
        currentStep--;

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

                  const tgBlock = document.querySelector(
                    "#quiz-final-telegram"
                  );
                  const formBlock = document.querySelector("#quiz-final-form");
                  const showForm =
                    document.body.classList.contains("show-form");

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

  // Переход на страницу "Спасибо" после отправки формы
  const callbackForm = document.querySelector(".quiz__callback-form");

  if (callbackForm) {
    callbackForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = callbackForm
        .querySelector("input[name='name']")
        .value.trim();
      const phone = callbackForm
        .querySelector("input[name='phone']")
        .value.trim();

      if (!name || !phone) {
        alert("Пожалуйста, заполните все поля");
        return;
      }

      // Здесь может быть отправка в Telegram

      // ✅ Перенаправление на страницу "Спасибо"
      window.location.href = "thankyou.html";
    });
  }
});
