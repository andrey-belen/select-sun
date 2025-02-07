### Step 1: Set Up Your Project

1. **Create a Project Directory**:
   ```bash
   mkdir breadcrumbs-project
   cd breadcrumbs-project
   ```

2. **Initialize a New npm Project**:
   ```bash
   npm init -y
   ```

3. **Create Basic File Structure**:
   ```bash
   mkdir src
   touch src/index.html src/breadcrumbs.js src/styles.css
   ```

### Step 2: Create the HTML File

Open `src/index.html` and add the following code:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Automatic Breadcrumbs</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <nav id="breadcrumbs"></nav>
    <div id="content">
        <h1>Welcome to the Breadcrumbs Example</h1>
        <button onclick="navigateTo('Page 1')">Go to Page 1</button>
        <button onclick="navigateTo('Page 2')">Go to Page 2</button>
        <button onclick="navigateTo('Page 3')">Go to Page 3</button>
    </div>
    <script src="breadcrumbs.js"></script>
</body>
</html>
```

### Step 3: Implement Breadcrumbs Functionality

Open `src/breadcrumbs.js` and add the following code:

```javascript
let breadcrumbs = [];

function updateBreadcrumbs(page) {
    breadcrumbs.push(page);
    renderBreadcrumbs();
}

function renderBreadcrumbs() {
    const breadcrumbNav = document.getElementById('breadcrumbs');
    breadcrumbNav.innerHTML = breadcrumbs.map((crumb, index) => {
        return `<span>${crumb}</span>${index < breadcrumbs.length - 1 ? ' > ' : ''}`;
    }).join('');
}

function navigateTo(page) {
    updateBreadcrumbs(page);
    document.getElementById('content').innerHTML = `<h1>${page}</h1>`;
}
```

### Step 4: Add Some Basic Styles

Open `src/styles.css` and add the following styles:

```css
body {
    font-family: Arial, sans-serif;
    margin: 20px;
}

#breadcrumbs {
    margin-bottom: 20px;
    font-size: 18px;
}

#content {
    border: 1px solid #ccc;
    padding: 20px;
}
```

### Step 5: Run Your Project

1. **Open the HTML File**:
   You can open `src/index.html` in your web browser to see the breadcrumbs in action.

2. **Test the Functionality**:
   Click the buttons to navigate to different pages. The breadcrumbs should update automatically to reflect your navigation.

### Optional Enhancements

- **Back Navigation**: Implement a back button that removes the last breadcrumb and updates the content accordingly.
- **Dynamic Page Titles**: Use a more complex routing system to handle dynamic page titles and URLs.
- **Styling**: Enhance the styling of the breadcrumbs for better visual appeal.

This basic setup provides a foundation for automatic breadcrumbs functionality in a JavaScript project. You can expand upon it based on your specific requirements.