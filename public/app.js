
const searchBtn = document.getElementById('searchBtn');
const ingredientInput = document.getElementById('ingredientInput');
const container = document.getElementById('recipes');

const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const closeModal = document.getElementById('closeModal');


searchBtn.addEventListener('click', async () => {
  const ingredient = ingredientInput.value.trim();
  if (!ingredient) return alert('Please enter ingredients');

  try {
    const res = await fetch(`/api/recipes?ingredients=${encodeURIComponent(ingredient)}`);
    const data = await res.json();
    displayRecipes(data.results);
  } catch (err) {
    console.error('Fetch error:', err);
    container.innerHTML = '<p>Something went wrong while fetching recipes.</p>';
  }
});


function displayRecipes(recipes) {
  container.innerHTML = '';

  if (!recipes || recipes.length === 0) {
    container.innerHTML = '<p>No recipes found.</p>';
    return;
  }

  recipes.forEach(r => {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    
    card.innerHTML = `
      <img src="${r.image}" alt="${r.title}">
      <div class="recipe-info">
        <h3>${r.title}</h3>
        <p>Ready in ${r.readyInMinutes} mins | Servings: ${r.servings}</p>
      </div>
    `;
    card.addEventListener('click', () => window.open(r.sourceUrl, '_blank'));
    container.appendChild(card);
  });
}


function attachModalListeners() {
  
  document.querySelectorAll('.recipe-card[data-description]').forEach(card => {
    const button = card.querySelector('.view-recipe-btn');
   
    if (button) {
      button.addEventListener('click', e => {
        e.stopPropagation(); 
        const url = button.dataset.url;
        window.open(url, '_blank');
      });
    }
    
    card.addEventListener('click', () => {
      const title = card.querySelector('h3').textContent;
      const desc = card.dataset.description;
      modalTitle.textContent = title;
      modalDescription.textContent = desc;
      modal.style.display = 'flex';
    });
  });
}

closeModal.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', e => {
  if (e.target === modal) modal.style.display = 'none';
});


attachModalListeners();

















