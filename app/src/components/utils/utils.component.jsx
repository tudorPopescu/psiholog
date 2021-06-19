export const setHeight = (element, bottom, attr) => {
  // setTimeout(() => {
    let e = element;

    if (e) {
      let distanceToTop = e.getBoundingClientRect().top + (bottom ? bottom : 40);
      let vh = window.innerHeight;

      if (vh > 450) {
        e.style[attr ? attr : 'height'] = vh - distanceToTop + 'px';
      }
    }
  // }, 100);
};

export const scrollTop = (className, top) => {
  let arr = document.getElementsByClassName(className);

  if (arr && arr.length) {
    arr[0].scrollTop = top ? top : 0;
  }
};

// export const goTopButton = (view, button, distance) => {
//   // handle scroll for go back to top button in tables with scroll
//   view = view ? view : 'view-scroll';
//   button = button ? button : '#back-top';
//   distance = distance ? distance : 1500;

//   setTimeout(() => {
//     let backTopBtn = $(button);
//     let arr = document.getElementsByClassName(view);

//     if (arr && arr.length && arr[0] && backTopBtn) {
//       $(arr[0]).scroll(() => {
//         if (arr[0].scrollTop > distance) {
//           backTopBtn.addClass('show');
//         } else {
//           backTopBtn.removeClass('show');
//         }
//       });
//     }
//   }, 300);
// };