import Swal from "sweetalert2";

const ErrorAlert = (title: string, text: string) => {
  return Swal.fire({
    icon: 'error',
    title: `${title}`,
    text: `${text}`,
  });
}

export default ErrorAlert;
