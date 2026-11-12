// State application URLs
const stateUrls = {
    wyoming: "https://wgfapps.wyo.gov/LoginPortal/Login1.aspx?return=http%3A//wgfd.wyo.gov/login-callback",
    montana: "https://fwp.mt.gov/buyandapply",
    nevada: "https://nevada.licensing.app/",
    idaho: "https://gooutdoorsidaho.com",
    arizona: "https://draw.azgfd.com/Home/",
    newmexico: "https://onlinesales.wildlife.state.nm.us/",
    colorado: "https://www.cpwshop.com/home.page",
    utah: "https://www.utahdraws.com/internetsales",
    oregon: "https://myodfw.com/",
    kansas: "https://license.gooutdoorskansas.gov/Licensing/CustomerLookup.aspx"
};
//comment
// 2027 hunting season dates. Unpublished dates must remain pending; do not carry forward old dates.
const huntingData = [
    // Wyoming (Non-Resident)
    {
        state: "wyoming",
        stateName: "Wyoming",
        residency: "Non-Resident",
        species: "Elk",
        applicationDeadline: "Pending official 2027 announcement",
        drawResults: "Pending official 2027 announcement"
    },
    {
        state: "wyoming",
        stateName: "Wyoming",
        residency: "Non-Resident",
        species: "Deer",
        applicationDeadline: "Pending official 2027 announcement",
        drawResults: "Pending official 2027 announcement"
    },
    {
        state: "wyoming",
        stateName: "Wyoming",
        residency: "Non-Resident",
        species: "Whitetail Deer",
        applicationDeadline: "Pending official 2027 announcement",
        drawResults: "Pending official 2027 announcement"
    },
    {
        state: "wyoming",
        stateName: "Wyoming",
        residency: "Non-Resident",
        species: "Moose",
        applicationDeadline: "Pending official 2027 announcement",
        drawResults: "Pending official 2027 announcement"
    },
    {
        state: "wyoming",
        stateName: "Wyoming",
        residency: "Non-Resident",
        species: "Antelope",
        applicationDeadline: "Pending official 2027 announcement",
        drawResults: "Pending official 2027 announcement"
    },
    {
        state: "wyoming",
        stateName: "Wyoming",
        residency: "Non-Resident",
        species: "Bighorn Sheep-Rocky Mtn",
        applicationDeadline: "Pending official 2027 announcement",
        drawResults: "Pending official 2027 announcement"
    },

    // Montana (Non-Resident)
    {
        state: "montana",
        stateName: "Montana",
        residency: "Non-Resident",
        species: "Elk",
        applicationDeadline: "Pending official 2027 announcement",
        drawResults: "Pending official 2027 announcement"
    },
    {
        state: "montana",
        stateName: "Montana",
        residency: "Non-Resident",
        species: "Deer",
        applicationDeadline: "Pending official 2027 announcement",
        drawResults: "Pending official 2027 announcement"
    },
    {
        state: "montana",
        stateName: "Montana",
        residency: "Non-Resident",
        species: "Whitetail Deer",
        applicationDeadline: "Pending official 2027 announcement",
        drawResults: "Pending official 2027 announcement"
    },

    // Nevada (Non-Resident)
    {
        state: "nevada",
        stateName: "Nevada",
        residency: "Non-Resident",
        species: "Elk",
        applicationDeadline: "Pending official 2027 announcement",
        drawResults: "Pending official 2027 announcement"
    },
    {
        state: "nevada",
        stateName: "Nevada",
        residency: "Non-Resident",
        species: "Deer",
        applicationDeadline: "Pending official 2027 announcement",
        drawResults: "Pending official 2027 announcement"
    },

    // Idaho (Non-Resident) - General Season
    {
        state: "idaho",
        stateName: "Idaho - General Season",
        residency: "Non-Resident",
        species: "Elk",
        applicationDeadline: "December 15, 2026",
        drawResults: "Early January 2027 (exact date TBD)"
    },
    {
        state: "idaho",
        stateName: "Idaho - General Season",
        residency: "Non-Resident",
        species: "Deer",
        applicationDeadline: "December 15, 2026",
        drawResults: "Early January 2027 (exact date TBD)"
    },
    {
        state: "idaho",
        stateName: "Idaho - General Season",
        residency: "Non-Resident",
        species: "Whitetail Deer",
        applicationDeadline: "December 15, 2026",
        drawResults: "Early January 2027 (exact date TBD)"
    },

    // Idaho (Non-Resident) - Controlled Hunts
    {
        state: "idaho",
        stateName: "Idaho - Controlled Hunts",
        residency: "Non-Resident",
        species: "Elk",
        applicationDeadline: "Pending official 2027 announcement",
        drawResults: "Pending official 2027 announcement"
    },
    {
        state: "idaho",
        stateName: "Idaho - Controlled Hunts",
        residency: "Non-Resident",
        species: "Deer",
        applicationDeadline: "Pending official 2027 announcement",
        drawResults: "Pending official 2027 announcement"
    },
    {
        state: "idaho",
        stateName: "Idaho - Controlled Hunts",
        residency: "Non-Resident",
        species: "Whitetail Deer",
        applicationDeadline: "Pending official 2027 announcement",
        drawResults: "Pending official 2027 announcement"
    },
    {
        state: "idaho",
        stateName: "Idaho - Controlled Hunts",
        residency: "Non-Resident",
        species: "Moose",
        applicationDeadline: "Pending official 2027 announcement",
        drawResults: "Pending official 2027 announcement"
    },
    {
        state: "idaho",
        stateName: "Idaho - Controlled Hunts",
        residency: "Non-Resident",
        species: "Antelope",
        applicationDeadline: "Pending official 2027 announcement",
        drawResults: "Pending official 2027 announcement"
    },
    {
        state: "idaho",
        stateName: "Idaho - Spring Bear",
        residency: "Non-Resident",
        species: "Black Bear",
        applicationDeadline: "Pending official 2027 announcement",
        drawResults: "Pending official 2027 announcement"
    },
    {
        state: "idaho",
        stateName: "Idaho - Controlled Hunts",
        residency: "Non-Resident",
        species: "Fall Bear",
        applicationDeadline: "Pending official 2027 announcement",
        drawResults: "Pending official 2027 announcement"
    },
    {
        state: "idaho",
        stateName: "Idaho - Controlled Hunts",
        residency: "Non-Resident",
        species: "Bighorn Sheep-Rocky Mtn",
        applicationDeadline: "Pending official 2027 announcement",
        drawResults: "Pending official 2027 announcement"
    },
    {
        state: "idaho",
        stateName: "Idaho - Controlled Hunts",
        residency: "Non-Resident",
        species: "Mountain Goat",
        applicationDeadline: "Pending official 2027 announcement",
        drawResults: "Pending official 2027 announcement"
    },

    // Arizona (Non-Resident)
    {
        state: "arizona",
        stateName: "Arizona",
        residency: "Non-Resident",
        species: "Elk",
        applicationDeadline: "Pending official 2027 announcement",
        drawResults: "Pending official 2027 announcement"
    },
    {
        state: "arizona",
        stateName: "Arizona",
        residency: "Non-Resident",
        species: "Deer",
        applicationDeadline: "Pending official 2027 announcement",
        drawResults: "Pending official 2027 announcement"
    },
    {
        state: "arizona",
        stateName: "Arizona",
        residency: "Non-Resident",
        species: "Antelope",
        applicationDeadline: "Pending official 2027 announcement",
        drawResults: "Pending official 2027 announcement"
    },
    {
        state: "arizona",
        stateName: "Arizona",
        residency: "Non-Resident",
        species: "Bighorn Sheep-Desert",
        applicationDeadline: "Pending official 2027 announcement",
        drawResults: "Pending official 2027 announcement"
    },

    // New Mexico (Non-Resident)
    {
        state: "newmexico",
        stateName: "New Mexico",
        residency: "Non-Resident",
        species: "Elk",
        applicationDeadline: "Pending official 2027 announcement",
        drawResults: "Pending official 2027 announcement"
    },
    {
        state: "newmexico",
        stateName: "New Mexico",
        residency: "Non-Resident",
        species: "Deer",
        applicationDeadline: "Pending official 2027 announcement",
        drawResults: "Pending official 2027 announcement"
    },
    {
        state: "newmexico",
        stateName: "New Mexico",
        residency: "Non-Resident",
        species: "Oryx",
        applicationDeadline: "Pending official 2027 announcement",
        drawResults: "Pending official 2027 announcement"
    },
    {
        state: "newmexico",
        stateName: "New Mexico",
        residency: "Non-Resident",
        species: "Barbary Sheep (Aoudad)",
        applicationDeadline: "Pending official 2027 announcement",
        drawResults: "Pending official 2027 announcement"
    },
    {
        state: "newmexico",
        stateName: "New Mexico",
        residency: "Non-Resident",
        species: "Pronghorn",
        applicationDeadline: "Pending official 2027 announcement",
        drawResults: "Pending official 2027 announcement"
    },
    {
        state: "newmexico",
        stateName: "New Mexico",
        residency: "Non-Resident",
        species: "Ibex",
        applicationDeadline: "Pending official 2027 announcement",
        drawResults: "Pending official 2027 announcement"
    },
    {
        state: "newmexico",
        stateName: "New Mexico",
        residency: "Non-Resident",
        species: "Bighorn Sheep-Desert",
        applicationDeadline: "Pending official 2027 announcement",
        drawResults: "Pending official 2027 announcement"
    },

    // Colorado (Non-Resident)
    {
        state: "colorado",
        stateName: "Colorado",
        residency: "Non-Resident",
        species: "Elk",
        applicationDeadline: "Pending official 2027 announcement",
        drawResults: "Pending official 2027 announcement"
    },
    {
        state: "colorado",
        stateName: "Colorado",
        residency: "Non-Resident",
        species: "Deer",
        applicationDeadline: "Pending official 2027 announcement",
        drawResults: "Pending official 2027 announcement"
    },
    {
        state: "colorado",
        stateName: "Colorado",
        residency: "Non-Resident",
        species: "Moose",
        applicationDeadline: "Pending official 2027 announcement",
        drawResults: "Pending official 2027 announcement"
    },
    {
        state: "colorado",
        stateName: "Colorado",
        residency: "Non-Resident",
        species: "Bighorn Sheep-Rocky Mtn",
        applicationDeadline: "Pending official 2027 announcement",
        drawResults: "Pending official 2027 announcement"
    },

    // Oregon (Non-Resident)
    {
        state: "oregon",
        stateName: "Oregon",
        residency: "Non-Resident",
        species: "Elk",
        applicationDeadline: "Pending official 2027 announcement",
        drawResults: "Pending official 2027 announcement"
    },
    {
        state: "oregon",
        stateName: "Oregon",
        residency: "Non-Resident",
        species: "Deer",
        applicationDeadline: "Pending official 2027 announcement",
        drawResults: "Pending official 2027 announcement"
    },

    // Kansas (Non-Resident)
    {
        state: "kansas",
        stateName: "Kansas",
        residency: "Non-Resident",
        species: "Whitetail Deer",
        applicationDeadline: "Pending official 2027 announcement",
        drawResults: "Pending official 2027 announcement"
    },

    // Utah (Resident)
    // Utah 2027 additional draw application periods
    {
        state: "utah",
        stateName: "Utah - Antlerless",
        residency: "Resident",
        species: "Antlerless",
        applicationOpens: "June 8, 2027",
        applicationDeadline: "Pending official 2027 announcement",
        drawResults: "Pending official 2027 announcement"
    },
    {
        state: "utah",
        stateName: "Utah - Crane / Grouse",
        residency: "Resident",
        species: "Crane / Grouse",
        applicationOpens: "July 13, 2027",
        applicationDeadline: "Pending official 2027 announcement",
        drawResults: "Pending official 2027 announcement"
    },

    {
        state: "utah",
        stateName: "Utah",
        residency: "Resident",
        species: "Elk",
        applicationOpens: "March 18, 2027",
        applicationDeadline: "Pending official 2027 announcement",
        drawResults: "Pending official 2027 announcement"
    },
    {
        state: "utah",
        stateName: "Utah",
        residency: "Resident",
        species: "Deer",
        applicationOpens: "March 18, 2027",
        applicationDeadline: "Pending official 2027 announcement",
        drawResults: "Pending official 2027 announcement"
    },
    {
        state: "utah",
        stateName: "Utah",
        residency: "Resident",
        species: "Moose",
        applicationOpens: "March 18, 2027",
        applicationDeadline: "Pending official 2027 announcement",
        drawResults: "Pending official 2027 announcement"
    },
    {
        state: "utah",
        stateName: "Utah",
        residency: "Resident",
        species: "Antelope",
        applicationOpens: "March 18, 2027",
        applicationDeadline: "Pending official 2027 announcement",
        drawResults: "Pending official 2027 announcement"
    },
    {
        state: "utah",
        stateName: "Utah",
        residency: "Resident",
        species: "Black Bear",
        applicationOpens: "February 2, 2027",
        applicationDeadline: "Pending official 2027 announcement",
        drawResults: "Pending official 2027 announcement"
    },
    {
        state: "utah",
        stateName: "Utah",
        residency: "Resident",
        species: "Bighorn Sheep-Rocky Mtn",
        applicationOpens: "March 18, 2027",
        applicationDeadline: "Pending official 2027 announcement",
        drawResults: "Pending official 2027 announcement"
    },
    {
        state: "utah",
        stateName: "Utah",
        residency: "Resident",
        species: "Bighorn Sheep-Desert",
        applicationOpens: "March 18, 2027",
        applicationDeadline: "Pending official 2027 announcement",
        drawResults: "Pending official 2027 announcement"
    },
    {
        state: "utah",
        stateName: "Utah",
        residency: "Resident",
        species: "Turkey",
        applicationDeadline: "Pending official 2027 announcement",
        drawResults: "Pending official 2027 announcement"
    },
    {
        state: "utah",
        stateName: "Utah",
        residency: "Resident",
        species: "Swan",
        applicationOpens: "July 13, 2027",
        applicationDeadline: "Pending official 2027 announcement",
        drawResults: "Pending official 2027 announcement"
    },
    {
        state: "utah",
        stateName: "Utah",
        residency: "Resident",
        species: "Sportsman Permits",
        applicationDeadline: "November 10, 2026 - 11pm MST",
        drawResults: "November 19, 2026"
    }
];

// Helper function to parse date strings.
function parseDate(dateString) {
    // Never interpret an unpublished date or an approximate result window as a deadline.
    if (!dateString || !/^[A-Za-z]+ \d{1,2}, \d{4}/.test(dateString)) return null;
    const datePortion = dateString.split(' - ')[0];
    const parsed = new Date(datePortion);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
}

// Helper function to check if a date has passed
function isPastDate(dateString) {
    const deadline = parseDate(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return deadline !== null && deadline < today;
}

// Helper function to calculate days until deadline
function getDaysUntil(dateString) {
    const deadline = parseDate(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (deadline === null) return null;
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

// Update species dropdown based on selected state
function updateSpeciesDropdown() {
    const stateFilter = document.getElementById('state-filter').value;
    const speciesDropdown = document.getElementById('species-filter');
    const currentSelection = speciesDropdown.value;

    // Get all unique species
    const allSpecies = [...new Set(huntingData.map(item => item.species))].sort();

    // Get species available in selected state
    let availableSpecies = new Set();
    if (stateFilter === 'all') {
        availableSpecies = new Set(allSpecies);
    } else {
        huntingData
            .filter(item => item.state === stateFilter)
            .forEach(item => availableSpecies.add(item.species));
    }

    // Rebuild dropdown
    speciesDropdown.innerHTML = '<option value="all">All Species</option>';
    allSpecies.forEach(species => {
        const option = document.createElement('option');
        option.value = species;
        option.textContent = species;
        if (!availableSpecies.has(species)) {
            option.disabled = true;
            option.style.color = '#ccc';
        }
        speciesDropdown.appendChild(option);
    });

    // Restore selection if still valid, otherwise reset to 'all'
    if (availableSpecies.has(currentSelection) || currentSelection === 'all') {
        speciesDropdown.value = currentSelection;
    } else {
        speciesDropdown.value = 'all';
    }
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
        filteredData = filteredData.filter(item => !parseDate(item.drawResults) || !isPastDate(item.drawResults));
    }

    // Apply sorting
    if (sortFilter === 'deadline') {
        filteredData.sort((a, b) => {
            // Use the next known milestone: opening date when closing date is unpublished.
            const nextDate = item => parseDate(item.applicationDeadline)?.getTime() ??
                parseDate(item.applicationOpens)?.getTime() ?? Infinity;
            return nextDate(a) - nextDate(b);
        });
    } else if (sortFilter === 'state') {
        filteredData.sort((a, b) => a.stateName.localeCompare(b.stateName));
    }

    filteredData.forEach(item => {
        const hasDeadline = parseDate(item.applicationDeadline) !== null;
        const deadlinePassed = isPastDate(item.applicationDeadline);
        const resultsPassed = isPastDate(item.drawResults);
        const daysUntil = getDaysUntil(item.applicationDeadline);
        const isWithin30Days = daysUntil > 0 && daysUntil <= 30;
        const isAwaitingResults = deadlinePassed && !resultsPassed;
        const opensIn = item.applicationOpens ? getDaysUntil(item.applicationOpens) : null;
        const openingCountdown = opensIn === null ? '' :
            opensIn > 0 ? ` (Opens in ${opensIn} day${opensIn === 1 ? '' : 's'})` :
            opensIn === 0 ? ' (OPENS TODAY)' : ' (Opened)';

        let headerClass = '';
        let countdownText = '';
        let actionButton = '';

        if (!hasDeadline) {
            headerClass = opensIn !== null && opensIn >= 0 && opensIn <= 30 ? 'header-warning' : 'header-pending';
            countdownText = '';
            // An opening date is not a confirmed closing date. Never imply applications are open early.
            actionButton = `<div class="status-message awaiting">Application deadline pending — <a href="${stateUrls[item.state]}" target="_blank" rel="noopener noreferrer">Check official application site</a></div>`;
        } else if (resultsPassed) {
            headerClass = 'header-expired';
            countdownText = ' (EXPIRED)';
            actionButton = '';
        } else if (isAwaitingResults) {
            headerClass = 'header-awaiting';
            countdownText = ' (CLOSED)';
            actionButton = `<div class="status-message awaiting">⏳ Awaiting Results - Posted ${item.drawResults}</div>`;
        } else if (daysUntil === 0) {
            headerClass = 'header-warning';
            countdownText = ' (DUE TODAY)';
            actionButton = `<a href="${stateUrls[item.state]}" target="_blank" class="apply-button">Apply Now →</a>`;
        } else if (isWithin30Days) {
            headerClass = 'header-warning';
            countdownText = ` (${daysUntil} day${daysUntil === 1 ? '' : 's'} left)`;
            actionButton = `<a href="${stateUrls[item.state]}" target="_blank" class="apply-button">Apply Now →</a>`;
        } else {
            headerClass = 'header-open';
            countdownText = ` (${daysUntil} days)`;
            actionButton = `<a href="${stateUrls[item.state]}" target="_blank" class="apply-button">Apply Now →</a>`;
        }

        const card = document.createElement('div');
        card.className = 'deadline-card';
        card.innerHTML = `
            <div class="card-header ${headerClass}">
                <h2>${item.stateName} - ${item.species}</h2>
                <span class="residency-badge">${item.residency}</span>
            </div>
            <div class="card-body">
                ${item.applicationOpens ? `<div class="deadline-item">
                    <span class="label">Application Opens:</span>
                    <span class="date">${item.applicationOpens}${openingCountdown}</span>
                </div>` : ''}
                <div class="deadline-item">
                    <span class="label">Application Deadline:</span>
                    <span class="date">${item.applicationDeadline}${countdownText}</span>
                </div>
                <div class="deadline-item">
                    <span class="label">Draw Results Posted:</span>
                    <span class="date">${item.drawResults}</span>
                </div>
                ${actionButton}
            </div>
        `;
        container.appendChild(card);
    });

    if (filteredData.length === 0) {
        container.innerHTML = '<p class="no-results">No deadlines found for the selected filters.</p>';
    }
}

// Event listeners for filters - only add if elements exist (for index.html)
const stateFilter = document.getElementById('state-filter');
const speciesFilter = document.getElementById('species-filter');
const sortFilter = document.getElementById('sort-filter');
const hideExpired = document.getElementById('hide-expired');

if (stateFilter) {
    stateFilter.addEventListener('change', function() {
        updateSpeciesDropdown();
        displayDeadlines();
    });
}

if (speciesFilter) {
    speciesFilter.addEventListener('change', displayDeadlines);
}

if (sortFilter) {
    sortFilter.addEventListener('change', displayDeadlines);
}

if (hideExpired) {
    hideExpired.addEventListener('change', displayDeadlines);
}

// Initial display - only run if on main page
if (stateFilter && speciesFilter) {
    updateSpeciesDropdown();
    displayDeadlines();
}
