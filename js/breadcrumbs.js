function generateBreadcrumbs() {
    const path = window.location.pathname;
    const parts = path.split('/').filter(part => part);
    
    const breadcrumbsContainer = document.createElement('nav');
    breadcrumbsContainer.className = 'breadcrumbs';
    
    const breadcrumbsContent = document.createElement('div');
    breadcrumbsContent.className = 'breadcrumbs-content';
    
    // Rest of your existing breadcrumbs logic
    const items = [
        { path: '/', name: 'Главная' }
    ];
    
    // Add dynamic breadcrumbs based on current path
    if (parts.includes('destinations')) {
        items.push({ path: '/pages/destinations', name: 'Направления' });
        if (parts.length > 2) {
            items.push({ path: '', name: document.title.split('|')[0].trim() });
        }
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