export function formatAccountNumber(number: string) {
  // Chuyển đổi số thành chuỗi để dễ thao tác
  number = number.toString();

  // Tách chuỗi thành một mảng, mỗi phần tử có 4 ký tự
  const parts = number.match(/\d{4}/g);

  // Nối các phần tử lại với nhau, chèn khoảng trắng ở giữa
  return parts?.join(' ')
}
