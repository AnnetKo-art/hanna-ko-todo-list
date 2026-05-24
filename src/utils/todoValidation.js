// Validation helper functions for todo titles.
// Prevents empty or invalid todo submissions.

export function isValidTodoTitle(title) {
  return title.trim() !== "";
}
