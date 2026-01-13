// Hunting deadline data for 2026
const huntingData = [
    // Wyoming (Non-Resident)
    {
        state: "wyoming",
        stateName: "Wyoming",
        residency: "Non-Resident",
        species: "Elk",
        applicationDeadline: "February 2, 2026",
        drawResults: "May 21, 2026"
    },
    {
        state: "wyoming",
        stateName: "Wyoming",
        residency: "Non-Resident",
        species: "Deer",
        applicationDeadline: "June 1, 2026",
        drawResults: "June 18, 2026"
    },
    {
        state: "wyoming",
        stateName: "Wyoming",
        residency: "Non-Resident",
        species: "Moose",
        applicationDeadline: "April 30, 2026",
        drawResults: "May 21, 2026"
    },

    // Montana (Non-Resident)
    {
        state: "montana",
        stateName: "Montana",
        residency: "Non-Resident",
        species: "Elk",
        applicationDeadline: "April 1, 2026",
        drawResults: "April 15, 2026"
    },
    {
        state: "montana",
        stateName: "Montana",
        residency: "Non-Resident",
        species: "Deer",
        applicationDeadline: "April 1, 2026",
        drawResults: "April 15, 2026"
    },

    // Nevada (Non-Resident)
    {
        state: "nevada",
        stateName: "Nevada",
        residency: "Non-Resident",
        species: "Elk",
        applicationDeadline: "May 7, 2026",
        drawResults: "May 29, 2026"
    },
    {
        state: "nevada",
        stateName: "Nevada",
        residency: "Non-Resident",
        species: "Deer",
        applicationDeadline: "May 7, 2026",
        drawResults: "May 29, 2026"
    },

    // Idaho (Non-Resident) - General Season
    {
        state: "idaho",
        stateName: "Idaho - General Season",
        residency: "Non-Resident",
        species: "Elk",
        applicationDeadline: "December 15, 2025",
        drawResults: "January 6, 2026"
    },
    {
        state: "idaho",
        stateName: "Idaho - General Season",
        residency: "Non-Resident",
        species: "Deer",
        applicationDeadline: "December 15, 2025",
        drawResults: "January 6, 2026"
    },

    // Idaho (Non-Resident) - Controlled Hunts
    {
        state: "idaho",
        stateName: "Idaho - Controlled Hunts",
        residency: "Non-Resident",
        species: "Elk",
        applicationDeadline: "June 5, 2026",
        drawResults: "July 7, 2026"
    },
    {
        state: "idaho",
        stateName: "Idaho - Controlled Hunts",
        residency: "Non-Resident",
        species: "Deer",
        applicationDeadline: "June 5, 2026",
        drawResults: "July 7, 2026"
    },
    {
        state: "idaho",
        stateName: "Idaho - Controlled Hunts",
        residency: "Non-Resident",
        species: "Moose",
        applicationDeadline: "April 30, 2026",
        drawResults: "June 1, 2026"
    },

    // Arizona (Non-Resident)
    {
        state: "arizona",
        stateName: "Arizona",
        residency: "Non-Resident",
        species: "Elk",
        applicationDeadline: "February 3, 2026",
        drawResults: "March 15, 2026"
    },
    {
        state: "arizona",
        stateName: "Arizona",
        residency: "Non-Resident",
        species: "Deer",
        applicationDeadline: "June 2, 2026",
        drawResults: "June 25, 2026"
    },

    // New Mexico (Non-Resident)
    {
        state: "newmexico",
        stateName: "New Mexico",
        residency: "Non-Resident",
        species: "Elk",
        applicationDeadline: "March 19, 2026",
        drawResults: "April 23, 2026"
    },
    {
        state: "newmexico",
        stateName: "New Mexico",
        residency: "Non-Resident",
        species: "Deer",
        applicationDeadline: "March 19, 2026",
        drawResults: "April 23, 2026"
    },

    // Colorado (Non-Resident)
    {
        state: "colorado",
        stateName: "Colorado",
        residency: "Non-Resident",
        species: "Elk",
        applicationDeadline: "April 7, 2026",
        drawResults: "May 31, 2026"
    },
    {
        state: "colorado",
        stateName: "Colorado",
        residency: "Non-Resident",
        species: "Deer",
        applicationDeadline: "April 7, 2026",
        drawResults: "May 31, 2026"
    },
    {
        state: "colorado",
        stateName: "Colorado",
        residency: "Non-Resident",
        species: "Moose",
        applicationDeadline: "April 7, 2026",
        drawResults: "May 27, 2026"
    },

    // Utah (Resident)
    {
        state: "utah",
        stateName: "Utah",
        residency: "Resident",
        species: "Elk",
        applicationDeadline: "April 30, 2026",
        drawResults: "May 13, 2026"
    },
    {
        state: "utah",
        stateName: "Utah",
        residency: "Resident",
        species: "Deer",
        applicationDeadline: "April 30, 2026",
        drawResults: "May 13, 2026"
    },
    {
        state: "utah",
        stateName: "Utah",
        residency: "Resident",
        species: "Moose",
        applicationDeadline: "April 30, 2026",
        drawResults: "May 15, 2026"
    }
];

// Helper function to parse date strings
function parseDate(dateString) {
    return new Date(dateString);
}

// Helper function to check if a date has passed
function isPastDate(dateString) {
    const deadline = parseDate(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return deadline < today;
}

// Helper function to calculate days until deadline
function getDaysUntil(dateString) {
    const deadline = parseDate(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

// Display deadlines
function displayDeadlines() {
    const stateFilter = document.getElementById('state-filter').value;
    const speciesFilter = document.getElementById('species-filter').value;
    const sortFilter = document.getElementById('sort-filter').value;
    const hideExpired = document.getElementById('hide-expired').checked;
    const container = document.getElementById('deadlines-container');
    container.innerHTML = '';

    let filteredData = huntingData;

    // Apply state filter
    if (stateFilter !== 'all') {
        filteredData = filteredData.filter(item => item.state === stateFilter);
    }

    // Apply species filter
    if (speciesFilter !== 'all') {
        filteredData = filteredData.filter(item => item.species === speciesFilter);
    }

    // Apply hide expired filter
    if (hideExpired) {
        filteredData = filteredData.filter(item => !isPastDate(item.drawResults));
    }

    // Apply sorting
    if (sortFilter === 'deadline') {
        filteredData.sort((a, b) => {
            return parseDate(a.applicationDeadline) - parseDate(b.applicationDeadline);
        });
    } else if (sortFilter === 'state') {
        filteredData.sort((a, b) => a.stateName.localeCompare(b.stateName));
    }

    filteredData.forEach(item => {
        const deadlinePassed = isPastDate(item.applicationDeadline);
        const daysUntil = getDaysUntil(item.applicationDeadline);
        const isWithin30Days = daysUntil > 0 && daysUntil <= 30;

        let headerClass = '';
        let countdownText = '';

        if (deadlinePassed) {
            headerClass = 'header-expired';
            countdownText = ' (EXPIRED)';
        } else if (isWithin30Days) {
            headerClass = 'header-warning';
            countdownText = ` (${daysUntil} day${daysUntil === 1 ? '' : 's'} left)`;
        } else {
            headerClass = 'header-open';
            countdownText = ` (${daysUntil} days)`;
        }

        const card = document.createElement('div');
        card.className = 'deadline-card';
        card.innerHTML = `
            <div class="card-header ${headerClass}">
                <h2>${item.stateName} - ${item.species}</h2>
                <span class="residency-badge">${item.residency}</span>
            </div>
            <div class="card-body">
                <div class="deadline-item">
                    <span class="label">Application Deadline:</span>
                    <span class="date">${item.applicationDeadline}${countdownText}</span>
                </div>
                <div class="deadline-item">
                    <span class="label">Draw Results Posted:</span>
                    <span class="date">${item.drawResults}</span>
                </div>
            </div>
        `;
        container.appendChild(card);
    });

    if (filteredData.length === 0) {
        container.innerHTML = '<p class="no-results">No deadlines found for the selected filters.</p>';
    }
}

// Event listeners for filters
document.getElementById('state-filter').addEventListener('change', displayDeadlines);
document.getElementById('species-filter').addEventListener('change', displayDeadlines);
document.getElementById('sort-filter').addEventListener('change', displayDeadlines);
document.getElementById('hide-expired').addEventListener('change', displayDeadlines);

// Initial display
displayDeadlines();
