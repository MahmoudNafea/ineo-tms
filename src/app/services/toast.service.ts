import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ToastService {
  constructor() {}

  showToast(message: string, type: "success" | "error"): void {
    const toastContainer = document.createElement("div");
    toastContainer.className = `custom-toast ${type}`;
    toastContainer.innerText = message;

    document.body.appendChild(toastContainer);

    setTimeout(() => {
      toastContainer.classList.add("show");
    }, 100);

    setTimeout(
      () => {
        toastContainer.classList.remove("show");
        setTimeout(() => {
          document.body.removeChild(toastContainer);
        }, 300);
      },
      type == "error" ? 5000 : 3000
    );
  }
}
