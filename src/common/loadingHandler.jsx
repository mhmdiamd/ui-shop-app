import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

export function showLoading(message) {
  Swal.fire({
    title: 'Loading...',
    html: message,
    allowEscapeKey: false,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
} 

export const successLoading = (title) => {
  Swal.close();
  MySwal.fire({
    title: <p>{title}</p>,
    icon: 'success',
  });
}

export const failedLoading = (text) => {
  MySwal.fire({
    title: 'Oops...',
    text: text,
    icon: 'error',
  });
}

export const closeLoading = Swal.close()
