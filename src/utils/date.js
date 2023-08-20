export function dateAtual() {

  let dataAtual = new Date();

  let date = dataAtual.getDate()
  let month = dataAtual.getMonth() + 1
  let hours = dataAtual.getHours();
  let minute = dataAtual.getMinutes();
  let second = dataAtual.getSeconds();

  if (date < 10) {
    date = `0${dataAtual.getDate()}`
  }

  if (month < 10) {
    month = `0${dataAtual.getMonth() + 1}`
  }

  if (hours < 10) {
    hours = `0${dataAtual.getHours()}`
  }

  if (minute < 10) {
    minute = `0${dataAtual.getMinutes()}`
  }

  if (second < 10) {
    second = `0${dataAtual.getSeconds()}`
  }

  return `${date}-${month}-${dataAtual.getFullYear()} ${hours}:${minute}:${second}`
}