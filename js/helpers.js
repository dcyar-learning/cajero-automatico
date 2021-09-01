export function alertMessage(element, type, text, time = 1500) {
  const alertType = type === 'error' ? 'text-danger' : 'text-success';

  element.classList.remove('d-none');
  element.classList.add(alertType);
  element.innerHTML = text;

  setTimeout(() => {
    element.classList.add('d-none');
    element.classList.remove(alertType);
  }, time);
}

export function clearInputs(inputs) {
  inputs.forEach((input) => (input.value = ''));
}
