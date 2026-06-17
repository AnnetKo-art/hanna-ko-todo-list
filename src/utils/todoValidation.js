export const MAX_TODO_LENGTH = 100;
export const validateTodoTitle = (title) => {
  const trimmed = title.trim();

  if (!trimmed) {
    return { isValid: false, error: "Todo cannot be empty." };
  }

  if (trimmed.length < 3) {
    return { isValid: false, error: "Please enter at least 3 characters." };
  }

  if (trimmed.length > MAX_TODO_LENGTH) {
    return {
      isValid: false,
      error: `Todo must be ${MAX_TODO_LENGTH} characters or less.`,
    };
  }

  return { isValid: true, error: "" };
};

export function isValidTodoTitle(title) {
  return validateTodoTitle(title).isValid;
}
