// Vue firebase
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
});

window.Toast = Toast;

window.Swal = Swal;

export { Swal, Toast };
