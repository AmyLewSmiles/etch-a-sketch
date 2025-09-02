function createGrid(size) {
    const container = document.querySelector('.container');
    container.innerHTML = '';
    container.style.display = 'grid';
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    let isDrawing = false;
    container.onmousedown = () => { isDrawing = true; };
    container.onmouseup = () => { isDrawing = false; };
    container.onmouseleave = () => { isDrawing = false; };
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        cell.dataset.darkness = '0';
        cell.style.background = 'rgb(200, 240, 240)'; // light teal
        cell.addEventListener('mousedown', function(e) {
            e.preventDefault();
            let darkness = parseInt(cell.dataset.darkness, 10);
            if (darkness < 10) darkness++;
            cell.dataset.darkness = darkness;
            const teal = [200, 240, 240];
            const black = [0, 0, 0];
            const r = Math.round(teal[0] + (black[0] - teal[0]) * (darkness / 10));
            const g = Math.round(teal[1] + (black[1] - teal[1]) * (darkness / 10));
            const b = Math.round(teal[2] + (black[2] - teal[2]) * (darkness / 10));
            cell.style.background = `rgb(${r},${g},${b})`;
        });
        cell.addEventListener('mousemove', function(e) {
            if (isDrawing) {
                let darkness = parseInt(cell.dataset.darkness, 10);
                if (darkness < 10) darkness++;
                cell.dataset.darkness = darkness;
                const teal = [200, 240, 240];
                const black = [0, 0, 0];
                const r = Math.round(teal[0] + (black[0] - teal[0]) * (darkness / 10));
                const g = Math.round(teal[1] + (black[1] - teal[1]) * (darkness / 10));
                const b = Math.round(teal[2] + (black[2] - teal[2]) * (darkness / 10));
                cell.style.background = `rgb(${r},${g},${b})`;
            }
        });
        container.appendChild(cell);
    }
}

// Create initial 25x25 grid
createGrid(25);

// Clear all colored cells
function clearGridColors() {
    document.querySelectorAll('.grid-cell').forEach(cell => {
        cell.dataset.darkness = '0';
        cell.style.background = 'rgb(200, 240, 240)'; // reset to light teal
    });
}

document.querySelector('.changeBoard').addEventListener('click', function() {
    let size = parseInt(prompt('How many rows and columns should the grid have?'), 10);
    if (isNaN(size) || size < 1 || size > 100) {
        alert('Please enter a valid number between 1 and 100.');
        return;
    }
    createGrid(size);
});

document.querySelector('.resetBoard').addEventListener('click', clearGridColors);
