export const signOut = () => {
  localStorage.clear()
  window.location.href = "/"
}
