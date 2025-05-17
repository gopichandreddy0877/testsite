export default function decorate(block) {
  const pathParts = window.location.pathname.split('/').filter(Boolean);

  const breadcrumb = document.createElement('nav');
  breadcrumb.classList.add('breadcrumb');

  let path = '';
  pathParts.forEach((part, index) => {
    path += `/${part}`;
    const crumb = document.createElement('a');
    crumb.href = path;
    crumb.textContent = decodeURIComponent(part).replace(/-/g, ' ');

    breadcrumb.appendChild(crumb);

    if (index < pathParts.length - 1) {
      const separator = document.createElement('span');
      separator.textContent = ' / ';
      breadcrumb.appendChild(separator);
    }
  });

  block.innerHTML = ''; // Clear block content
  block.appendChild(breadcrumb);
}
