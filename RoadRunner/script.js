
const form = document.querySelector("[data-contact-form]");

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const subjectByInterest = {
      walkthrough: "RoadRunner Secure product walkthrough",
      pilot: "RoadRunner Secure pilot scope",
      "white-label": "RoadRunner Secure MSP white-label model",
      security: "RoadRunner Secure security review"
    };
    const interest = data.get("interest") || "walkthrough";
    const body = [
      "Name: " + (data.get("name") || ""),
      "Work email: " + (data.get("email") || ""),
      "Company: " + (data.get("company") || ""),
      "Role: " + (data.get("role") || ""),
      "Interest: " + interest,
      "Environment size: " + (data.get("size") || ""),
      "Microsoft / on-prem scope: " + (data.get("scope") || ""),
      "",
      "Notes:",
      data.get("notes") || ""
    ].join("\n");
    window.location.href = "mailto:drew@roadrunnerstrategies.com?subject=" +
      encodeURIComponent(subjectByInterest[interest] || subjectByInterest.walkthrough) +
      "&body=" + encodeURIComponent(body);
  });
}
