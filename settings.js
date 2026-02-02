// Settings page functionality

let currentUser = null;

// Check if user is logged in
async function checkAuth() {
    const supabase = window.supabaseClient;
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        // Not logged in, redirect to login
        window.location.href = 'login.html';
        return;
    }

    currentUser = user;
    document.getElementById('user-email-display').textContent = user.email;

    // Load user settings
    await loadUserProfile();
    await loadUserPreferences();
}

// Load user profile and notification settings
async function loadUserProfile() {
    const supabase = window.supabaseClient;
    try {
        const { data, error } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', currentUser.id)
            .single();

        if (error) throw error;

        if (data) {
            document.getElementById('email-notifications-toggle').checked = data.email_notifications_enabled;
        }
    } catch (error) {
        console.error('Error loading profile:', error);
    }
}

// Load user's saved preferences
async function loadUserPreferences() {
    const supabase = window.supabaseClient;
    try {
        const { data, error } = await supabase
            .from('user_preferences')
            .select('*')
            .eq('user_id', currentUser.id)
            .order('state', { ascending: true });

        if (error) throw error;

        const listContainer = document.getElementById('user-preferences-list');

        if (!data || data.length === 0) {
            listContainer.innerHTML = '<p class="no-preferences">No reminders set yet. Add one above!</p>';
            return;
        }

        listContainer.innerHTML = '';

        // Group preferences by state
        const groupedByState = {};
        data.forEach(pref => {
            if (!groupedByState[pref.state]) {
                groupedByState[pref.state] = [];
            }
            groupedByState[pref.state].push(pref);
        });

        // Create a group for each state
        Object.keys(groupedByState).forEach(state => {
            const stateGroup = document.createElement('div');
            stateGroup.className = 'state-group';

            // Add state header
            const stateHeader = document.createElement('div');
            stateHeader.className = 'state-group-header';
            stateHeader.textContent = formatStateName(state);
            stateGroup.appendChild(stateHeader);

            // Add species items for this state
            const speciesContainer = document.createElement('div');
            speciesContainer.className = 'species-container';

            groupedByState[state].forEach(pref => {
                // Skip "ALL" species from displaying as individual reminders
                if (pref.species === 'ALL') return;

                const speciesDisplay = pref.species;
                const prefItem = document.createElement('div');
                prefItem.className = 'preference-item';
                prefItem.innerHTML = `
                    <div class="preference-info">
                        <strong>${speciesDisplay}</strong>
                        <div class="preference-days-control">
                            <span class="days-display" data-id="${pref.id}">${pref.notify_days_before} day${pref.notify_days_before === 1 ? '' : 's'} before - <span class="edit-link">Edit</span></span>
                            <select class="days-dropdown" data-id="${pref.id}" style="display: none;">
                                <option value="1" ${pref.notify_days_before === 1 ? 'selected' : ''}>1 day before</option>
                                <option value="2" ${pref.notify_days_before === 2 ? 'selected' : ''}>2 days before</option>
                                <option value="7" ${pref.notify_days_before === 7 ? 'selected' : ''}>7 days before</option>
                                <option value="30" ${pref.notify_days_before === 30 ? 'selected' : ''}>30 days before</option>
                            </select>
                        </div>
                    </div>
                    <button class="delete-pref-btn" data-id="${pref.id}" style="display: none;">Remove</button>
                `;
                speciesContainer.appendChild(prefItem);
            });

            stateGroup.appendChild(speciesContainer);
            listContainer.appendChild(stateGroup);
        });

        // Add event listeners to edit links
        document.querySelectorAll('.edit-link').forEach(link => {
            link.addEventListener('click', (e) => {
                const prefId = e.target.parentElement.getAttribute('data-id');
                const display = document.querySelector(`.days-display[data-id="${prefId}"]`);
                const dropdown = document.querySelector(`.days-dropdown[data-id="${prefId}"]`);
                const removeBtn = document.querySelector(`.delete-pref-btn[data-id="${prefId}"]`);

                display.style.display = 'none';
                dropdown.style.display = 'inline-block';
                removeBtn.style.display = 'inline-block';
                dropdown.focus();
            });
        });

        // Add event listeners to days dropdowns
        document.querySelectorAll('.days-dropdown').forEach(dropdown => {
            dropdown.addEventListener('change', async (e) => {
                const prefId = e.target.getAttribute('data-id');
                const newDays = parseInt(e.target.value);
                await updatePreferenceDays(prefId, newDays);
                // Reload to show updated text
                await loadUserPreferences();
            });

            // Hide dropdown if user clicks away without changing
            dropdown.addEventListener('blur', (e) => {
                const prefId = e.target.getAttribute('data-id');
                const display = document.querySelector(`.days-display[data-id="${prefId}"]`);
                const dropdownEl = document.querySelector(`.days-dropdown[data-id="${prefId}"]`);
                const removeBtn = document.querySelector(`.delete-pref-btn[data-id="${prefId}"]`);

                setTimeout(() => {
                    dropdownEl.style.display = 'none';
                    display.style.display = 'inline';
                    removeBtn.style.display = 'none';
                }, 200);
            });
        });

        // Add event listeners to delete buttons
        document.querySelectorAll('.delete-pref-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const prefId = e.target.getAttribute('data-id');
                await deletePreference(prefId);
            });
        });
    } catch (error) {
        console.error('Error loading preferences:', error);
    }
}

// Save notification settings
document.getElementById('save-notification-settings').addEventListener('click', async () => {
    const supabase = window.supabaseClient;
    const emailEnabled = document.getElementById('email-notifications-toggle').checked;

    try {
        const { error } = await supabase
            .from('user_profiles')
            .update({
                email_notifications_enabled: emailEnabled,
                updated_at: new Date().toISOString()
            })
            .eq('id', currentUser.id);

        if (error) throw error;

        alert('Notification settings saved!');
    } catch (error) {
        alert('Error saving settings: ' + error.message);
        console.error('Error:', error);
    }
});

// Populate species checkboxes based on state selection
document.getElementById('pref-state-filter').addEventListener('change', (e) => {
    const state = e.target.value;
    const checkboxContainer = document.getElementById('species-checkboxes');

    if (!state) {
        checkboxContainer.innerHTML = '<p class="no-state-selected">Select a state above to see available species</p>';
        return;
    }

    // Check if huntingData is available
    if (typeof huntingData === 'undefined') {
        console.error('huntingData is not defined');
        alert('Error loading hunting data. Please refresh the page.');
        return;
    }

    // Get species for selected state from huntingData
    const stateSpecies = huntingData
        .filter(item => item.state === state)
        .map(item => item.species)
        .filter((value, index, self) => self.indexOf(value) === index)
        .sort();

    checkboxContainer.innerHTML = '';

    // Add "All Species" checkbox
    const allCheckbox = document.createElement('div');
    allCheckbox.className = 'species-checkbox-item all-species';
    allCheckbox.innerHTML = `
        <label>
            <input type="checkbox" value="ALL" id="species-all">
            <span>All Species</span>
        </label>
    `;
    checkboxContainer.appendChild(allCheckbox);

    // Add "All" checkbox handler to check/uncheck all
    const allInput = allCheckbox.querySelector('input');
    allInput.addEventListener('change', (e) => {
        const allCheckboxes = checkboxContainer.querySelectorAll('input[type="checkbox"]:not(#species-all)');
        allCheckboxes.forEach(cb => cb.checked = e.target.checked);
    });

    // Add individual species checkboxes
    stateSpecies.forEach(species => {
        const checkboxItem = document.createElement('div');
        checkboxItem.className = 'species-checkbox-item';
        checkboxItem.innerHTML = `
            <label>
                <input type="checkbox" value="${species}">
                <span>${species}</span>
            </label>
        `;
        checkboxContainer.appendChild(checkboxItem);

        // If individual checkbox is unchecked, uncheck "All"
        const speciesInput = checkboxItem.querySelector('input');
        speciesInput.addEventListener('change', () => {
            const allCheckboxes = checkboxContainer.querySelectorAll('input[type="checkbox"]:not(#species-all)');
            const allChecked = Array.from(allCheckboxes).every(cb => cb.checked);
            allInput.checked = allChecked;
        });
    });
});

// Add preferences (multiple species)
document.getElementById('add-preference-btn').addEventListener('click', async () => {
    const supabase = window.supabaseClient;
    const state = document.getElementById('pref-state-filter').value;
    const notifyDays = parseInt(document.getElementById('new-pref-days').value);

    if (!state) {
        alert('Please select a state.');
        return;
    }

    // Get all checked species (excluding the "All Species" checkbox)
    const checkboxContainer = document.getElementById('species-checkboxes');
    const checkedBoxes = checkboxContainer.querySelectorAll('input[type="checkbox"]:checked:not(#species-all)');
    const selectedSpecies = Array.from(checkedBoxes).map(cb => cb.value);

    if (selectedSpecies.length === 0) {
        alert('Please select at least one species.');
        return;
    }

    try {
        // Prepare array of preferences to insert
        const preferences = selectedSpecies.map(species => ({
            user_id: currentUser.id,
            state: state,
            species: species,
            notify_days_before: notifyDays
        }));

        const { error } = await supabase
            .from('user_preferences')
            .insert(preferences);

        if (error) {
            if (error.code === '23505') { // Unique constraint violation
                alert('One or more of these reminders already exist. Duplicates were skipped.');
            } else {
                throw error;
            }
        } else {
            alert(`${selectedSpecies.length} reminder(s) added!`);
        }

        await loadUserPreferences();

        // Reset form
        document.getElementById('pref-state-filter').value = '';
        checkboxContainer.innerHTML = '<p class="no-state-selected">Select a state above to see available species</p>';
    } catch (error) {
        alert('Error adding preferences: ' + error.message);
        console.error('Error:', error);
    }
});

// Update preference days
async function updatePreferenceDays(prefId, newDays) {
    const supabase = window.supabaseClient;

    try {
        const { error } = await supabase
            .from('user_preferences')
            .update({ notify_days_before: newDays })
            .eq('id', prefId);

        if (error) throw error;

        // Show subtle success feedback (optional)
        console.log(`Updated preference ${prefId} to ${newDays} days`);
    } catch (error) {
        alert('Error updating days: ' + error.message);
        console.error('Error:', error);
        // Reload to revert the dropdown
        await loadUserPreferences();
    }
}

// Delete preference
async function deletePreference(prefId) {
    const supabase = window.supabaseClient;
    if (!confirm('Remove this reminder?')) return;

    try {
        const { error } = await supabase
            .from('user_preferences')
            .delete()
            .eq('id', prefId);

        if (error) throw error;

        await loadUserPreferences();
    } catch (error) {
        alert('Error removing preference: ' + error.message);
        console.error('Error:', error);
    }
}

// Logout
document.getElementById('logout-btn').addEventListener('click', async () => {
    const supabase = window.supabaseClient;
    const { error } = await supabase.auth.signOut();
    if (error) {
        alert('Error logging out: ' + error.message);
    } else {
        window.location.href = 'index.html';
    }
});

// Helper function to format state names
function formatStateName(state) {
    const stateNames = {
        'arizona': 'Arizona',
        'colorado': 'Colorado',
        'idaho': 'Idaho',
        'montana': 'Montana',
        'nevada': 'Nevada',
        'newmexico': 'New Mexico',
        'utah': 'Utah',
        'wyoming': 'Wyoming'
    };
    return stateNames[state] || state;
}

// Initialize
checkAuth();
