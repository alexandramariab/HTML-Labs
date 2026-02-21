// Load coaches from JSON file using AJAX
// Uses: fetch API, XMLHttpRequest, DOM manipulation, JSON parsing

document.addEventListener('DOMContentLoaded', function() {
    const coachesGrid = document.getElementById('coaches-grid');
    
    if (!coachesGrid) {
        return; // Exit if coaches section doesn't exist
    }
    
    // Embedded coaches data as fallback
    const embeddedCoaches = [
        {
            "name": "Alexandru Popescu",
            "specialization": "Forță și Masă Musculară",
            "experience": "10 ani",
            "certifications": ["Certificat ISSA", "Nutrition Specialist"],
            "bio": "Alexandru este specialist în antrenamente de forță și construirea masei musculare. Cu peste 10 ani de experiență, a ajutat sute de clienți să-și atingă obiectivele.",
            "image": "poze/ant2.jpg"
        },
        {
            "name": "Maria Ionescu",
            "specialization": "Cardio și Pierdere în Greutate",
            "experience": "8 ani",
            "certifications": ["Certificat ACE", "HIIT Specialist"],
            "bio": "Maria este expertă în antrenamente cardio și programe de pierdere în greutate. Metodele sale eficiente au transformat multe vieți.",
            "image": "poze/antr1.jpg"
        },
        {
            "name": "Andrei Georgescu",
            "specialization": "Yoga și Flexibilitate",
            "experience": "12 ani",
            "certifications": ["Yoga Alliance 200h", "Meditation Instructor"],
            "bio": "Andrei este instructor certificat de yoga cu peste 12 ani de experiență. Aduce echilibrul și armonia în fiecare sesiune.",
            "image": "poze/ant3.png"
        },
        {
            "name": "Elena Dumitrescu",
            "specialization": "Fitness Funcțional",
            "experience": "7 ani",
            "certifications": ["Functional Training Specialist", "Kettlebell Certified"],
            "bio": "Elena se specializează în fitness funcțional, ajutându-te să devii mai puternic în viața de zi cu zi.",
            "image": "poze/ant6.jpg"
        }
    ];
    
   // Try to load from JSON file first, fallback to embedded on failure
fetch('coaches.json')
.then(res => {
    if (!res.ok) throw new Error();
    return res.json();
})
.then(data => {
    if (data && data.length > 0) displayCoaches(data);
    else useEmbeddedCoaches();
})
.catch(() => useEmbeddedCoaches());

// Method 2: Use embedded data
function useEmbeddedCoaches() {
console.log('Using embedded coaches data');
displayCoaches(embeddedCoaches);
}
    
    // Function to display coaches
    function displayCoaches(coaches) {
        coachesGrid.innerHTML = ''; // Clear any existing content
        
        coaches.forEach(function(coach) {
            // Create coach card element
            const coachCard = document.createElement('div');
            coachCard.className = 'coach-card';
            
            // Build coach card HTML
            coachCard.innerHTML = `
                <div class="coach-image">
                    <img src="${coach.image}" alt="${coach.name}" onerror="this.src='poze/sala2.jpg'">
                </div>
                <div class="coach-info">
                    <h3 class="coach-name">${coach.name}</h3>
                    <p class="coach-specialization">${coach.specialization}</p>
                    <p class="coach-experience">Experiență: ${coach.experience}</p>
                    <div class="coach-certifications">
                        <strong>Certificări:</strong>
                        <ul>
                            ${coach.certifications.map(cert => `<li>${cert}</li>`).join('')}
                        </ul>
                    </div>
                    <p class="coach-bio">${coach.bio}</p>
                </div>
            `;
            
            // Append to grid
            coachesGrid.appendChild(coachCard);
        });
    }
});

