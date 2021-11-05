export function changePassword (id : string, visible : boolean) {
  const input = document.getElementById(id) as HTMLInputElement
  if (visible) {
    input.type = 'text'
  } else {
    input.type = 'password'
  }
}
