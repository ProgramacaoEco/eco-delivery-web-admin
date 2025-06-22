require("dotenv").config();

const requiredVariables = [
  "NEXT_PUBLIC_API_KEY",
  "NEXT_PUBLIC_AUTH_DOMAIN",
  "NEXT_PUBLIC_DATABASE_URL",
  "NEXT_PUBLIC_PROJECT_ID",
  "NEXT_PUBLIC_STORAGE_BUCKET",
  "NEXT_PUBLIC_MESSAGING_SENDER_ID",
  "NEXT_PUBLIC_APP_ID",
  "NEXT_PUBLIC_MEASUREMENT_ID",
];

const missingVariables = requiredVariables.filter(
  (variable) => !process.env[variable]
);

if (missingVariables.length > 0) {
  console.error(" Variáveis de ambiente ausentes:");
  missingVariables.forEach((v) => console.error(`- ${v}`));
  process.exit(1);
} else {
  console.log(" Todas as variáveis de ambiente estão presentes.");
}
