function generateBreadcrumbs() {
    const path = window.location.pathname;
    const repoName = 'select-sun';
    const repoIndex = path.indexOf(repoName);
    const relativePath = repoIndex !== -1 ? path.slice(repoIndex + repoName.length) : path;
    const parts = relativePath.split('/').filter(part => part);
    
    const breadcrumbsContainer = document.createElement('nav');
    breadcrumbsContainer.className = 'breadcrumbs';
    
    const breadcrumbsContent = document.createElement('div');
    breadcrumbsContent.className = 'breadcrumbs-content';
    
    const items = [
        { path: '/select-sun/', name: 'Главная' }
    ];
    
    switch(parts[0]) {
        case 'pages':
            if (parts[1] === 'destinations') {
                items.push({ path: '/select-sun/pages/destinations/', name: 'Направления' });
                if (parts[2]) {
                    const destination = parts[2].replace('.html', '');
                    items.push({ path: '', name: document.title.split('|')[0].trim() });
                }
            } else if (parts[1] === 'about.html') {
                items.push({ path: '', name: 'О нас' });
            } else if (parts[1] === 'contact.html') {
                items.push({ path: '', name: 'Связаться с нами' });
            }
            break;
    }
    
    breadcrumbsContent.innerHTML = items
        .map((item, index) => 
            index === items.length - 1 
                ? `<span>${item.name}</span>`
                : `<a href="${item.path}">${item.name}</a> →`
        ).join(' ');
    
    breadcrumbsContainer.appendChild(breadcrumbsContent);
    document.querySelector('header').after(breadcrumbsContainer);
}

document.addEventListener('DOMContentLoaded', generateBreadcrumbs);