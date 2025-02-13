$(document).ready(function () {
  let currentStep = 0;
  const totalSteps = 4;
  const images = [
    "image/intro.jpg",       // Intro
    "image/step-1.jpg",       // Step 1
    "image/step-2.jpg",       // Step 2
    "image/step-3.jpg",       // Step 3
    "image/step-4.jpg",       // Step 4
    "image/qualified-1.jpg"  // Qualified
  ];

  function updateStep(step) {
    $(".step").addClass("hidden");
    if (step === 0) {
      $("#intro").removeClass("hidden");
    } else if (step <= totalSteps) {
      $("#step" + step).removeClass("hidden");
    } else {
      $("#congratulations").removeClass("hidden");
    }
    $("#stepIndicator" + step).addClass("active");
    $("#stepImage").attr("src", images[step]);  // Update image based on step
  }

  function enableNextButton(step) {
    $("#nextBtn" + step).prop("disabled", !$("input[name='" + getStepName(step) + "']:checked").length);
  }

  function getStepName(step) {
    const stepNames = ["age", "partner", "line", "caribbean"];
    return stepNames[step - 1];
  }

  // Start Button
  $("#startBtn").click(function () {
    currentStep = 1;
    updateStep(currentStep);
    $("#surveyForm").removeClass("hidden");
    $("#intro").addClass("hidden");
    $(".intro-overlay").addClass("hidden");
  });

  // Next Buttons
  for (let i = 1; i <= totalSteps; i++) {
    $("#nextBtn" + i).click(function () {
      currentStep++;
      updateStep(currentStep);
    });

    $("input[name='" + getStepName(i) + "']").change(function () {
      enableNextButton(i);
    });
  }

  // Submit Button
  $("input[name='caribbean']").change(function () {
    $("#submitBtn").prop("disabled", false);
  });

  $("#submitBtn").click(function () {
    currentStep = totalSteps + 1;
    updateStep(currentStep);
    $("#surveyForm").addClass("hidden");
    $(".top-banner").addClass("hidden");
    $(".quaified-text").removeClass("hidden");
  });
});


function updateFontSize() {
  const minFontSize = 12;       // Minimum font size in px
  const maxFontSize = 16;     // Maximum font size in px
  if (window.innerWidth >= 768 && window.innerWidth <= 991){
    const vwFontSize = window.innerWidth / 100 * 1.5;
    const clampedSize = Math.max(minFontSize, Math.min(vwFontSize, maxFontSize));
    document.documentElement.style.setProperty('--size-font', `${clampedSize}px`);
  } else if (window.innerWidth >= 590 && window.innerWidth <= 768){
    const vwFontSize = window.innerWidth / 100 * 1.3;
    const clampedSize = Math.max(minFontSize, Math.min(vwFontSize, maxFontSize));
    document.documentElement.style.setProperty('--size-font', `${clampedSize}px`);
  } else{
    const vwFontSize = window.innerWidth / 100 * 3.3;
    const clampedSize = Math.max(minFontSize, Math.min(vwFontSize, maxFontSize));
    document.documentElement.style.setProperty('--size-font', `${clampedSize}px`);
  }
}

// Initialize the font size on load and on window resize
window.addEventListener('resize', updateFontSize);
updateFontSize(); // Initial call when the page loads