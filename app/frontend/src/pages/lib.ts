export function getName(fullName:string, email: string) {
  if (fullName) {
    return fullName;
  }
  const atIndex = email.indexOf('@');
  return email.slice(0, atIndex);
}