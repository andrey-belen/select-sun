function generateBreadcrumbs() {
    const path = window.location.pathname;
    const parts = path.split('/').filter(part => part);
    
    const breadcrumbsContainer = document.createElement('nav');
    breadcrumbsContainer.className = 'breadcrumbs';
    
    const breadcrumbsContent = document.createElement('div');
    breadcrumbsContent.className = 'breadcrumbs-content';
    
    let basePath = parts.includes('destinations') ? '../../' : '../';
    
    const items = [
        { path: `${basePath}index.html`, name: 'Главная' }
    ];
    
    if (parts.includes('destinations')) {
        items.push({ path: './index.html', name: 'Направления' });
        if (parts.length > 2) {
            items.push({ path: '', name: document.title.split('|')[0].trim() });
        }
    } else if (parts.includes('about')) {
        items.push({ path: '', name: 'О нас' });
    } else if (parts.includes('contact')) {
        items.push({ path: '', name: 'Связаться с нами' });
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