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

// Update Draw Reminders UI based on notification toggle and subscription status
function updateDrawRemindersUI(emailEnabled, isSubscribed) {
    const paywallNotice = document.getElementById('paywall-notice');
    const notificationSection = document.querySelector('.settings-section:nth-child(2)');
    const drawRemindersSection = document.querySelector('.settings-section:nth-child(3)');
    const accountSection = document.querySelector('.settings-section:nth-child(4)');

    // If not subscribed, show paywall and grey out everything except paywall and account
    // TEMPORARILY DISABLED
    /*
    if (!isSubscribed) {
        paywallNotice.style.display = 'block';
        paywallNotice.style.pointerEvents = 'auto';

        if (notificationSection) {
            notificationSection.style.opacity = '0.5';
            notificationSection.style.pointerEvents = 'none';
        }
        if (drawRemindersSection) {
            drawRemindersSection.style.opacity = '0.5';
            drawRemindersSection.style.pointerEvents = 'none';
        }
        // Keep account section enabled
        if (accountSection) {
            accountSection.style.opacity = '1';
            accountSection.style.pointerEvents = 'auto';
        }
        return;
    }
    */

    // User is subscribed, hide paywall
    paywallNotice.style.display = 'none';

    // If notifications are disabled, grey out draw reminders only
    if (!emailEnabled) {
        if (notificationSection) {
            notificationSection.style.opacity = '1';
            notificationSection.style.pointerEvents = 'auto';
        }
        if (drawRemindersSection) {
            drawRemindersSection.style.opacity = '0.5';
            drawRemindersSection.style.pointerEvents = 'none';
        }
        if (accountSection) {
            accountSection.style.opacity = '1';
            accountSection.style.pointerEvents = 'auto';
        }
    } else {
        // Everything enabled
        if (notificationSection) {
            notificationSection.style.opacity = '1';
            notificationSection.style.pointerEvents = 'auto';
        }
        if (drawRemindersSection) {
            drawRemindersSection.style.opacity = '1';
            drawRemindersSection.style.pointerEvents = 'auto';
        }
        if (accountSection) {
            accountSection.style.opacity = '1';
            accountSection.style.pointerEvents = 'auto';
        }
    }
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
            const emailEnabled = data.email_notifications_enabled;
            document.getElementById('email-notifications-toggle').checked = emailEnabled;

            // Check subscription status
            const isSubscribed = data.subscription_status === 'active' || data.subscription_status === 'canceled';

            // Store subscription status globally
            window.isUserSubscribed = isSubscribed;

            // Update the UI based on notification toggle and subscription status
            updateDrawRemindersUI(emailEnabled, isSubscribed);
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

        // Group preferences by state, then by species
        const groupedByState = {};
        data.forEach(pref => {
            if (pref.species === 'ALL') return; // Skip "ALL" species

            if (!groupedByState[pref.state]) {
                groupedByState[pref.state] = {};
            }
            if (!groupedByState[pref.state][pref.species]) {
                groupedByState[pref.state][pref.species] = [];
            }
            groupedByState[pref.state][pref.species].push(pref);
        });

        // Create a group for each state
        Object.keys(groupedByState).forEach(state => {
            const stateGroup = document.createElement('div');
            stateGroup.className = 'state-group';

            // Check if all species in this state are completed
            const allSpeciesPrefs = Object.values(groupedByState[state]).flat();
            const allCompleted = allSpeciesPrefs.length > 0 && allSpeciesPrefs.every(p => p.completed);

            // Add state header
            const stateHeader = document.createElement('div');
            stateHeader.className = 'state-group-header';
            stateHeader.innerHTML = `
                ${formatStateName(state)}
                ${allCompleted ? '<span class="state-completed-badge">All Complete ✓</span>' : ''}
            `;
            stateGroup.appendChild(stateHeader);

            // Add species items for this state
            const speciesContainer = document.createElement('div');
            speciesContainer.className = 'species-container';

            // For each species in this state
            Object.keys(groupedByState[state]).forEach(species => {
                const speciesPrefs = groupedByState[state][species];
                const allRemindersCompleted = speciesPrefs.every(p => p.completed);

                const prefItem = document.createElement('div');
                prefItem.className = 'preference-item';

                // Build the reminders list (sorted by days)
                const sortedPrefs = speciesPrefs.sort((a, b) => b.notify_days_before - a.notify_days_before);
                const remindersHTML = sortedPrefs.map(pref => `
                    <div class="reminder-badge" data-id="${pref.id}">
                        <span class="reminder-days">${pref.notify_days_before} day${pref.notify_days_before === 1 ? '' : 's'}</span>
                        ${!pref.completed ? '<button class="remove-reminder-btn" data-id="${pref.id}" title="Remove this reminder">×</button>' : ''}
                    </div>
                `).join('');

                prefItem.innerHTML = `
                    <div class="preference-info">
                        <div class="species-header">
                            <strong>${species}</strong>
                            ${allRemindersCompleted
                                ? '<span class="completed-checkmark">✓</span>'
                                : `<button class="mark-done-btn" data-species="${species}" data-state="${state}">Mark as done</button>`
                            }
                        </div>
                        <div class="reminders-list">
                            ${remindersHTML}
                        </div>
                    </div>
                `;
                speciesContainer.appendChild(prefItem);
            });

            stateGroup.appendChild(speciesContainer);
            listContainer.appendChild(stateGroup);
        });

        // Add event listeners to remove individual reminder buttons
        document.querySelectorAll('.remove-reminder-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.stopPropagation();
                const prefId = e.target.getAttribute('data-id');
                if (confirm('Remove this reminder?')) {
                    await deletePreference(prefId);
                }
            });
        });

        // Add event listeners to mark done buttons (marks ALL reminders for that species as done)
        document.querySelectorAll('.mark-done-btn').forEach(button => {
            button.addEventListener('click', async (e) => {
                const species = e.target.getAttribute('data-species');
                const state = e.target.getAttribute('data-state');

                if (confirm(`Mark all ${species} reminders for ${formatStateName(state)} as done?`)) {
                    // Get all preference IDs for this state/species combination
                    const { data: prefsToComplete } = await supabase
                        .from('user_preferences')
                        .select('id')
                        .eq('user_id', currentUser.id)
                        .eq('state', state)
                        .eq('species', species);

                    // Mark each one as completed
                    for (const pref of prefsToComplete || []) {
                        await updatePreferenceCompleted(pref.id, true);
                    }

                    // Reload to show changes
                    await loadUserPreferences();
                }
            });
        });
    } catch (error) {
        console.error('Error loading preferences:', error);
    }
}

// Save notification settings
// Handle email notification toggle
document.getElementById('email-notifications-toggle').addEventListener('change', async (e) => {
    const supabase = window.supabaseClient;
    const emailEnabled = e.target.checked;

    try {
        const { error } = await supabase
            .from('user_profiles')
            .update({
                email_notifications_enabled: emailEnabled,
                updated_at: new Date().toISOString()
            })
            .eq('id', currentUser.id);

        if (error) throw error;

        // Update the UI immediately
        updateDrawRemindersUI(emailEnabled, window.isUserSubscribed);
    } catch (error) {
        alert('Error saving settings: ' + error.message);
        console.error('Error:', error);
        // Revert the toggle on error
        e.target.checked = !emailEnabled;
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
    // Check subscription status
    // TEMPORARILY DISABLED
    /*
    if (!window.isUserSubscribed) {
        alert('Please subscribe to set up email reminders.');
        window.location.href = 'subscribe.html';
        return;
    }
    */

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
        // Check for existing preferences with the same days setting
        const { data: existingPrefs } = await supabase
            .from('user_preferences')
            .select('species')
            .eq('user_id', currentUser.id)
            .eq('state', state)
            .eq('notify_days_before', notifyDays)
            .in('species', selectedSpecies);

        if (existingPrefs && existingPrefs.length > 0) {
            const existingSpecies = existingPrefs.map(p => p.species).join(', ');
            alert(`You already have a ${notifyDays}-day reminder for: ${existingSpecies}\n\nTo add a reminder at a DIFFERENT interval (e.g., 7 days, 2 days, etc.), change the days dropdown above and try again.`);
            return;
        }

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

        if (error) throw error;

        alert(`${selectedSpecies.length} reminder(s) added!`);

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

// Update preference completed status
async function updatePreferenceCompleted(prefId, isCompleted) {
    const supabase = window.supabaseClient;

    try {
        const { error } = await supabase
            .from('user_preferences')
            .update({ completed: isCompleted })
            .eq('id', prefId);

        if (error) throw error;

        // Reload to show the checkmark
        await loadUserPreferences();
    } catch (error) {
        alert('Error updating completion status: ' + error.message);
        console.error('Error:', error);
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
