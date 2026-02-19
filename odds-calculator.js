// Utah Draw Odds Calculator
let currentUser = null;
let isSubscribed = false;

// Check authentication and subscription status
async function checkAuth() {
    const supabase = window.supabaseClient;
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        // Not logged in, redirect to login
        window.location.href = 'login.html';
        return false;
    }

    currentUser = user;

    // Check subscription status
    const { data: profile } = await supabase
        .from('user_profiles')
        .select('subscription_status')
        .eq('id', user.id)
        .single();

    isSubscribed = profile && (profile.subscription_status === 'active' || profile.subscription_status === 'canceled');

    // Show paywall if not subscribed
    // TEMPORARILY DISABLED
    /*
    if (!isSubscribed) {
        document.getElementById('paywall-notice').style.display = 'block';
        document.getElementById('calculator-content').style.opacity = '0.5';
        document.getElementById('calculator-content').style.pointerEvents = 'none';
    }
    */

    return isSubscribed;
}

// Load available units when species is selected
async function loadUnitsForSpecies(species) {
    const unitSelect = document.getElementById('unit-filter');

    // Reset dropdown
    unitSelect.innerHTML = '<option value="">All Units</option>';

    if (!species) return;

    try {
        const supabase = window.supabaseClient;

        // Get distinct units for the selected species
        const { data, error } = await supabase
            .from('utah_draw_odds')
            .select('unit_number')
            .eq('species', species)
            .eq('year', 2025);

        if (error) throw error;

        // Get unique units and sort them
        const units = [...new Set(data.map(row => row.unit_number))].sort((a, b) => {
            // Sort numerically if possible, otherwise alphabetically
            const aNum = parseInt(a);
            const bNum = parseInt(b);
            if (!isNaN(aNum) && !isNaN(bNum)) {
                return aNum - bNum;
            }
            return a.localeCompare(b);
        });

        // Populate dropdown
        units.forEach(unit => {
            const option = document.createElement('option');
            option.value = unit;
            option.textContent = `Unit ${unit}`;
            unitSelect.appendChild(option);
        });

    } catch (error) {
        console.error('Error loading units:', error);
    }
}

// Search for odds data
async function searchOdds() {
    const species = document.getElementById('species-select').value;
    const unit = document.getElementById('unit-filter').value.trim();
    const bonusPoints = parseInt(document.getElementById('bonus-points-input').value) || 0;

    if (!species) {
        alert('Please select a species');
        return;
    }

    // Show loading
    document.getElementById('loading').style.display = 'block';
    document.getElementById('results-section').style.display = 'none';
    document.getElementById('no-results').style.display = 'none';

    try {
        const supabase = window.supabaseClient;

        // Build query
        let query = supabase
            .from('utah_draw_odds')
            .select('*')
            .eq('species', species)
            .eq('year', 2025)
            .order('unit_number')
            .order('hunt_code')
            .order('bonus_points');

        // Add unit filter if specified
        if (unit) {
            query = query.eq('unit_number', unit);
        }

        const { data: oddsData, error } = await query;

        if (error) throw error;

        // Hide loading
        document.getElementById('loading').style.display = 'none';

        if (!oddsData || oddsData.length === 0) {
            document.getElementById('no-results').style.display = 'block';
            return;
        }

        // Group by unit and hunt
        const groupedData = groupByUnitAndHunt(oddsData);

        // Display results
        displayResults(groupedData, bonusPoints);

    } catch (error) {
        console.error('Error fetching odds:', error);
        document.getElementById('loading').style.display = 'none';
        alert('Error loading odds data. Please try again.');
    }
}

// Group odds data by unit and hunt
function groupByUnitAndHunt(data) {
    const grouped = {};

    data.forEach(row => {
        const key = `${row.unit_number}-${row.hunt_code || 'general'}`;
        if (!grouped[key]) {
            grouped[key] = {
                unit: row.unit_number,
                hunt_code: row.hunt_code,
                hunt_description: row.hunt_description,
                species: row.species,
                total_permits: row.total_permits,
                odds_by_points: []
            };
        }
        grouped[key].odds_by_points.push(row);
    });

    return Object.values(grouped);
}

// Display results
function displayResults(groupedData, userPoints) {
    const container = document.getElementById('results-container');
    container.innerHTML = '';

    groupedData.forEach(hunt => {
        const huntCard = document.createElement('div');
        huntCard.className = 'odds-result-card';

        // Find odds for user's point level
        const userOdds = hunt.odds_by_points.find(o => o.bonus_points === userPoints);

        huntCard.innerHTML = `
            <div class="odds-card-header">
                <h3>Unit ${hunt.unit}: ${hunt.species}${hunt.hunt_code ? ` - ${hunt.hunt_code}` : ''}</h3>
                ${hunt.hunt_description ? `<p class="hunt-description">${hunt.hunt_description}</p>` : ''}
            </div>

            <div class="odds-card-body">
                <div class="odds-stat">
                    <span class="stat-label">Total Permits:</span>
                    <span class="stat-value">${hunt.total_permits || 'N/A'}</span>
                </div>

                ${userOdds ? `
                    <div class="user-odds-section">
                        <h4>Your Odds with ${userPoints} Point${userPoints === 1 ? '' : 's'}:</h4>
                        <div class="odds-highlight">
                            <div class="odds-stat">
                                <span class="stat-label">Success Ratio:</span>
                                <span class="stat-value success-ratio">${userOdds.success_ratio || 'N/A'}</span>
                            </div>
                            <div class="odds-stat">
                                <span class="stat-label">Success Rate:</span>
                                <span class="stat-value">${userOdds.success_percentage ? userOdds.success_percentage.toFixed(2) + '%' : 'N/A'}</span>
                            </div>
                            <div class="odds-stat">
                                <span class="stat-label">Applicants at Your Level:</span>
                                <span class="stat-value">${userOdds.total_applicants}</span>
                            </div>
                        </div>
                    </div>
                ` : `
                    <div class="no-user-odds">
                        <p>No applicant data available for ${userPoints} points in this hunt.</p>
                    </div>
                `}

                <button class="view-details-btn" onclick="toggleDetails(this)">View All Point Levels</button>
                <div class="odds-details" style="display: none;">
                    <table class="odds-table">
                        <thead>
                            <tr>
                                <th>Points</th>
                                <th>Applicants</th>
                                <th>Success Ratio</th>
                                <th>Success %</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${hunt.odds_by_points.map(o => `
                                <tr${o.bonus_points === userPoints ? ' class="user-point-row"' : ''}>
                                    <td>${o.bonus_points}</td>
                                    <td>${o.total_applicants}</td>
                                    <td>${o.success_ratio || 'N/A'}</td>
                                    <td>${o.success_percentage ? o.success_percentage.toFixed(2) + '%' : 'N/A'}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        container.appendChild(huntCard);
    });

    document.getElementById('results-section').style.display = 'block';
}

// Find recommended point level (best odds over 10%)
function findRecommendedPoints(oddsData) {
    const goodOdds = oddsData.filter(o => o.success_percentage && o.success_percentage >= 10);
    if (goodOdds.length === 0) return null;

    // Sort by lowest points first
    goodOdds.sort((a, b) => a.bonus_points - b.bonus_points);

    return {
        points: goodOdds[0].bonus_points,
        success_percentage: goodOdds[0].success_percentage.toFixed(2),
        success_ratio: goodOdds[0].success_ratio
    };
}

// Toggle details table
function toggleDetails(button) {
    const details = button.nextElementSibling;
    if (details.style.display === 'none') {
        details.style.display = 'block';
        button.textContent = 'Hide Details';
    } else {
        details.style.display = 'none';
        button.textContent = 'View All Point Levels';
    }
}

// Clear filters
function clearFilters() {
    document.getElementById('species-select').value = '';
    document.getElementById('unit-filter').innerHTML = '<option value="">All Units</option>';
    document.getElementById('bonus-points-input').value = '0';
    document.getElementById('results-section').style.display = 'none';
    document.getElementById('no-results').style.display = 'none';
}

// Event listeners
document.getElementById('search-btn').addEventListener('click', searchOdds);
document.getElementById('clear-btn').addEventListener('click', clearFilters);

// Load units when species changes
document.getElementById('species-select').addEventListener('change', (e) => {
    loadUnitsForSpecies(e.target.value);
});

// Initialize
checkAuth();
