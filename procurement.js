

// code to handle procurement form submission and simulate server responses

// function to handle form submission
(function () {
    const f = document.getElementById('procurementForm');
    const m = document.getElementById('procMessage');
    if (!f) return;

    // function to show messages
    function show(text, isError) {
        if (!m) return; m.textContent = text; m.className = 'message show' + (isError ? ' error' : '');
    }

    // form submit event listener
    f.addEventListener('submit', (e) => {
        e.preventDefault();
        show('');

        const name = document.getElementById('produceName')?.value.trim();
        const tonnage = Number(document.getElementById('tonnage')?.value || 0);

        // client-side validation
        if (!name || tonnage <= 0) { show('Client validation failed', true); return; }

        show('Submitting...');

        const mode = f.dataset.sim || 'random';
        setTimeout(() => {
            const rand = Math.random();
            if (mode === 'validation' || (mode === 'random' && rand < 0.2)) {
                show('Server validation error (400)', true);
            } else if (mode === 'server' || (mode === 'random' && rand < 0.5)) {
                show('Server error (500)', true);
            } else if (mode === 'network' || (mode === 'random' && rand < 0.7)) {
                show('Network error — failed to send', true);
            } else {
                show('Success — procurement saved');
            }
        }, 600);
    });
})();
