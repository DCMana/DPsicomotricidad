document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for nav links
  document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      playSound(sonidoClick);
      const targetElement = document.querySelector(this.getAttribute('href'));
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Modal functionality (Commented out as not directly used with current content)
  /*
  const modal = document.getElementById("autorModal");
  const closeModalButton = modal.querySelector(".close-button");
  const autorCards = document.querySelectorAll(".card[data-autor]"); // If you add data-autor to cards

  // Example: const autoresInfo = { /* your data here * / };

  autorCards.forEach(card => {
    card.addEventListener("click", () => {
      const autorKey = card.dataset.autor;
      const info = autoresInfo[autorKey];
      if (info) {
        document.getElementById("modalAutorNombre").textContent = info.nombre;
        document.getElementById("modalAutorTeoria").textContent = info.teoria; // Adjust property names
        document.getElementById("modalAutorAportes").textContent = info.aportes; // Adjust property names
        modal.style.display = "block";
        playSound(sonidoClick);
      }
    });
    card.addEventListener("mouseenter", () => playSound(sonidoHover, 0.3));
  });

  if(closeModalButton) {
    closeModalButton.onclick = () => {
        modal.style.display = "none";
        playSound(sonidoClick);
    }
  }
  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  */

  // Accordion functionality for stimulation section (and any other accordions)
  const accordionHeaders = document.querySelectorAll(".accordion-header");
  accordionHeaders.forEach(header => {
    header.addEventListener("click", () => {
      playSound(sonidoClick);
      const content = header.nextElementSibling;
      const isActive = content.classList.contains('active'); // Check if current content is active
      
      // Close all other active accordions in the same group (optional, if desired)
      // const parentAccordion = header.closest('.stimulation-accordion'); // Or common parent
      // if (parentAccordion) {
      //     parentAccordion.querySelectorAll('.accordion-content.active').forEach(activeContent => {
      //         if (activeContent !== content) {
      //             activeContent.classList.remove('active');
      //             activeContent.style.maxHeight = null;
      //             activeContent.style.padding = "0 1rem"; // Reset padding
      //         }
      //     });
      // }


      if (content.style.maxHeight && content.style.maxHeight !== "0px") { // If already open
        content.style.maxHeight = null;
        content.classList.remove('active'); // Ensure class is removed
        // Reset padding after transition for better visual
        setTimeout(() => { 
            if (!content.classList.contains('active')) content.style.padding = "0 1rem";
        }, 300); // Match transition duration
      } else { // If closed or opening
        content.classList.add('active'); // Add active class
        content.style.padding = "1rem"; // Set padding before calculating scrollHeight
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
    header.addEventListener("mouseenter", () => playSound(sonidoHover, 0.3));
  });
  
  // Activate first tab and content by default for each tab group
  // This is more robust if you have multiple tab sets
  document.querySelectorAll('.age-tabs').forEach(tabGroup => {
      const firstButton = tabGroup.querySelector('.tab-button');
      const firstContentId = firstButton.getAttribute('onclick').match(/'([^']+)'/)[1];
      if (firstButton && firstContentId) {
          document.querySelectorAll('.age-content').forEach(content => content.classList.remove('active')); // Deactivate all
          document.querySelectorAll('.tab-button').forEach(button => button.classList.remove('active')); // Deactivate all

          // Activate first for this specific group
          firstButton.classList.add('active');
          const contentToShow = document.getElementById(firstContentId);
          if(contentToShow) contentToShow.classList.add('active');
      }
  });


  // Sonidos (referencias globales)
  // sonidoExito is not used as there's no simulator
  // const sonidoExito = document.getElementById('sonidoExito'); 
  const sonidoClick = document.getElementById('sonidoClick');
  const sonidoHover = document.getElementById('sonidoHover');

  document.querySelectorAll('.action-button, .tab-button').forEach(button => {
      button.addEventListener("mouseenter", () => playSound(sonidoHover, 0.3));
      button.addEventListener("click", () => playSound(sonidoClick)); // Added click sound for general buttons
  });

});


// Funciones globales accesibles desde el HTML (para onclick)
window.showAgeContent = function(contentId, clickedButton) {
  // Play sound defined globally or get it here
  const clickSound = document.getElementById('sonidoClick');
  playSound(clickSound);

  // Find the parent container of the tabs and content to scope the changes
  let MaintabsContainer = clickedButton.closest('section'); // Or a more specific common ancestor
  if (!MaintabsContainer) MaintabsContainer = document; // Fallback to document

  MaintabsContainer.querySelectorAll('.age-content').forEach(content => {
    content.classList.remove('active');
  });
  MaintabsContainer.querySelectorAll('.tab-button').forEach(button => {
    button.classList.remove('active');
  });

  const contentToShow = document.getElementById(contentId);
  if(contentToShow) contentToShow.classList.add('active');
  if(clickedButton) clickedButton.classList.add('active');
}

function playSound(audioElement, volume = 0.5) {
  if (audioElement) {
    audioElement.currentTime = 0; 
    audioElement.volume = volume;
    audioElement.play().catch(error => console.log("Error al reproducir sonido:", error));
  }
}

// Make sure global sound variables are accessible if needed by playSound from other contexts
// (They are already in scope due to DOMContentLoaded, but this is a reminder)
const sonidoClick = document.getElementById('sonidoClick');
const sonidoHover = document.getElementById('sonidoHover');

// Initial setup for tab buttons if not handled by DOMContentLoaded
// This ensures onclick calls work correctly after the script is loaded
document.querySelectorAll('.age-tabs .tab-button').forEach(button => {
    // The onclick attribute in HTML will call window.showAgeContent directly
});

// Ensure the first accordion item in each group is expanded if desired, or handle it via CSS/HTML initially.
// Example: Open first accordion in each group on load
/*
document.querySelectorAll('.stimulation-accordion').forEach(accordion => {
    const firstHeader = accordion.querySelector('.accordion-header');
    if (firstHeader) {
        const firstContent = firstHeader.nextElementSibling;
        firstContent.classList.add('active');
        firstContent.style.padding = "1rem";
        firstContent.style.maxHeight = firstContent.scrollHeight + "px";
    }
});
*/