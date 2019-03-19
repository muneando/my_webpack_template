import _ from "lodash";

const component = () => {
  let element = document.createElement('h1');

  element.innerHTML = _.join(['Hello', 'webpack!'], ' ');

  return element;
}

document.body.appendChild(component());