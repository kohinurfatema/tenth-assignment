const fs = require('fs');
const content = fs.readFileSync('LoginPage.jsx', 'utf8');

// Update fillDemoCredentials function
let updated = content.replace(
    /const fillDemoCredentials = \(type\) => \{\s*if \(type === 'user'\) \{[\s\S]*?toast\.success\('Admin credentials filled.*?\);\s*\}\s*\};/,
    `const fillDemoCredentials = (type) => {
        if (type === 'user') {
            setEmail('demo@ecotrack.com');
            setPassword('Demo@123');
            toast.success('Demo User credentials filled!', { duration: 2000 });
        } else if (type === 'manager') {
            setEmail('manager@ecotrack.com');
            setPassword('Manager@123');
            toast.success('Manager credentials filled!', { duration: 2000 });
        } else {
            setEmail('admin@ecotrack.com');
            setPassword('Admin@123');
            toast.success('Admin credentials filled!', { duration: 2000 });
        }
    };`
);

// Update the demo buttons section to add Manager button
updated = updated.replace(
    /<div className="flex gap-2">\s*<button\s*type="button"\s*onClick=\{\(\) => fillDemoCredentials\("user"\)\}\s*className="btn btn-sm btn-secondary flex-1"\s*>\s*Demo User\s*<\/button>\s*<button\s*type="button"\s*onClick=\{\(\) => fillDemoCredentials\("admin"\)\}\s*className="btn btn-sm btn-accent flex-1"\s*>\s*Demo Admin\s*<\/button>\s*<\/div>/,
    `<div className="flex flex-wrap gap-2">
                            <button
                                type="button"
                                onClick={() => fillDemoCredentials("user")}
                                className="btn btn-sm btn-secondary flex-1"
                            >
                                Demo User
                            </button>
                            <button
                                type="button"
                                onClick={() => fillDemoCredentials("manager")}
                                className="btn btn-sm btn-warning flex-1"
                            >
                                Demo Manager
                            </button>
                            <button
                                type="button"
                                onClick={() => fillDemoCredentials("admin")}
                                className="btn btn-sm btn-accent flex-1"
                            >
                                Demo Admin
                            </button>
                        </div>`
);

fs.writeFileSync('LoginPage.jsx', updated);
console.log('LoginPage.jsx updated successfully');
