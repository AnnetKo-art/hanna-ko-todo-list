import DOMPurify from 'dompurify';

export const sanitizeInput = (input) => {
  if (!input) return "";
  
  return DOMPurify.sanitize(input.trim(), {
    ALLOWED_TAGS: [], 
    ALLOWED_ATTR: []  
  });
};