export const findByInnerText = (target, innerText, childrenElementsType, callback) => {
  if (target.innerText.indexOf(innerText) >= 0) {
    target.querySelectorAll(childrenElementsType).forEach(el => {
      callback(el);
    });
  }
};