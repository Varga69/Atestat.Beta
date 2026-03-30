/* ============================================================
   CurticiGym — script.js
   JavaScript comun pentru toate paginile site-ului
   Autor: Varga Edmund | Clasa a XII-a, Matematică-Informatică
   Scris în Vanilla JS, cu var și comentarii în română
   ============================================================ */


/* ============================================================
   FUNCȚIA 1: buildSidebar
   Rol: Citește toate titlurile H2 din pagina curentă
   și construiește automat lista de ancore în sidebar.
   ============================================================ */
function buildSidebar() {

  /* Luăm elementul <ul> din sidebar unde vom pune link-urile */
  var lista = document.getElementById('sidebar-anchors');

  /* Dacă nu există elementul, ieșim din funcție */
  if (!lista) {
    return;
  }

  /* Selectăm toate titlurile H2 din zona de conținut principal */
  var titluri = document.querySelectorAll('main h2');

  /* Dacă nu există niciun H2, nu afișăm nimic */
  if (titluri.length === 0) {
    lista.innerHTML = '<li style="color:#555;font-size:0.75rem;padding:6px 10px;">Fără secțiuni</li>';
    return;
  }

  /* Parcurgem fiecare titlu H2 găsit */
  for (var i = 0; i < titluri.length; i++) {

    /* Luăm titlul curent */
    var titlu = titluri[i];

    /* Dacă titlul nu are un ID, îi generăm unul din textul său */
    if (!titlu.id) {
      /* Transformăm textul în lowercase, înlocuim spațiile cu liniuțe */
      titlu.id = titlu.textContent.toLowerCase()
                  .replace(/\s+/g, '-')      /* spații → liniuțe */
                  .replace(/[^\w\-]/g, '');  /* eliminăm caracterele speciale */
    }

    /* Creăm un element <li> nou */
    var element = document.createElement('li');

    /* Creăm link-ul <a> care va face scroll la secțiunea respectivă */
    var link = document.createElement('a');
    link.href = '#' + titlu.id;           /* legătura spre ancora H2 */
    link.textContent = titlu.textContent; /* textul vizibil = textul H2 */

    /* Adăugăm link-ul în element, și elementul în listă */
    element.appendChild(link);
    lista.appendChild(element);
  }
}


/* ============================================================
   FUNCȚIA 2: initHamburger
   Rol: Activează meniul hamburger pe ecrane mici (mobil).
   Când se apasă butonul, navbar-ul și sidebar-ul
   se deschid / se închid.
   ============================================================ */
function initHamburger() {

  /* Selectăm butonul hamburger */
  var btn = document.querySelector('.hamburger');

  /* Selectăm navbar-ul */
  var nav = document.querySelector('nav');

  /* Selectăm sidebar-ul */
  var sidebar = document.querySelector('.sidebar');

  /* Dacă nu există butonul, ieșim */
  if (!btn) {
    return;
  }

  /* Adăugăm evenimentul de click pe butonul hamburger */
  btn.addEventListener('click', function() {

    /* Verificăm dacă navbar-ul are clasa 'open' */
    var navDeschis = nav && nav.classList.contains('open');

    /* Dacă e deschis, îl închidem; dacă e închis, îl deschidem */
    if (navDeschis) {
      if (nav) nav.classList.remove('open');
      if (sidebar) sidebar.classList.remove('open');
    } else {
      if (nav) nav.classList.add('open');
      if (sidebar) sidebar.classList.add('open');
    }
  });

  /* Închidem meniul dacă utilizatorul face click în afara lui */
  document.addEventListener('click', function(eveniment) {

    /* Dacă click-ul nu e pe buton și nu e pe nav sau sidebar */
    var peButon  = btn.contains(eveniment.target);
    var peNav    = nav && nav.contains(eveniment.target);
    var peSidebar = sidebar && sidebar.contains(eveniment.target);

    if (!peButon && !peNav && !peSidebar) {
      if (nav) nav.classList.remove('open');
      if (sidebar) sidebar.classList.remove('open');
    }
  });
}


/* ============================================================
   FUNCȚIA 3: initContactForm
   Rol: Validează câmpurile formularului de contact
   și afișează un mesaj de confirmare la trimitere.
   ============================================================ */
function initContactForm() {

  /* Selectăm formularul după ID */
  var formular = document.getElementById('contact-form');

  /* Dacă nu există formularul pe pagina curentă, ieșim */
  if (!formular) {
    return;
  }

  /* La trimiterea formularului apelăm funcția de validare */
  formular.addEventListener('submit', function(eveniment) {

    /* Prevenim comportamentul implicit (trimiterea spre server) */
    eveniment.preventDefault();

    /* Presupunem că totul e valid la început */
    var valid = true;

    /* --- Validare câmp Nume --- */
    var campNume  = document.getElementById('camp-nume');
    var eroareNume = document.getElementById('eroare-nume');

    /* Eliminăm erorile anterioare */
    campNume.classList.remove('invalid');
    eroareNume.classList.remove('show');

    /* Dacă câmpul e gol, marcăm eroarea */
    if (campNume.value.trim() === '') {
      campNume.classList.add('invalid');
      eroareNume.classList.add('show');
      valid = false; /* formularul nu este valid */
    }

    /* --- Validare câmp Email --- */
    var campEmail   = document.getElementById('camp-email');
    var eroareEmail = document.getElementById('eroare-email');

    campEmail.classList.remove('invalid');
    eroareEmail.classList.remove('show');

    /* Verificăm dacă emailul conține @ și cel puțin un punct după @ */
    var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexEmail.test(campEmail.value.trim())) {
      campEmail.classList.add('invalid');
      eroareEmail.classList.add('show');
      valid = false;
    }

    /* --- Validare câmp Mesaj --- */
    var campMesaj   = document.getElementById('camp-mesaj');
    var eroareMesaj = document.getElementById('eroare-mesaj');

    campMesaj.classList.remove('invalid');
    eroareMesaj.classList.remove('show');

    /* Mesajul trebuie să aibă cel puțin 10 caractere */
    if (campMesaj.value.trim().length < 10) {
      campMesaj.classList.add('invalid');
      eroareMesaj.classList.add('show');
      valid = false;
    }

    /* Dacă toate câmpurile sunt valide, afișăm mesajul de succes */
    if (valid) {
      var mesajSucces = document.getElementById('mesaj-succes');
      if (mesajSucces) {
        mesajSucces.classList.add('show');
      }
      /* Resetăm formularul la starea inițială */
      formular.reset();
    }
  });
}


/* ============================================================
   FUNCȚIA 4: initLightbox
   Rol: Deschide o imagine mărită când utilizatorul
   face click pe un element din galerie.
   ============================================================ */
function initLightbox() {

  /* Selectăm overlay-ul lightbox din pagină */
  var overlay = document.getElementById('lightbox-overlay');

  /* Dacă nu există, nu inițializăm */
  if (!overlay) {
    return;
  }

  /* Selectăm toate elementele din galerie */
  var iteme = document.querySelectorAll('.gallery-item');

  /* Pentru fiecare item din galerie adăugăm click */
  for (var i = 0; i < iteme.length; i++) {

    /* Salvăm referința la item-ul curent */
    var item = iteme[i];

    item.addEventListener('click', function() {

      /* Luăm sursa imaginii și descrierea din atribute */
      var sursa     = this.getAttribute('data-src') || '';
      var descriere = this.getAttribute('data-caption') || '';

      /* Dacă există o sursă, o punem în lightbox */
      if (sursa) {
        var imgLightbox = document.getElementById('lightbox-img');
        var captionLightbox = document.getElementById('lightbox-caption');

        if (imgLightbox) {
          imgLightbox.src = sursa;
        }
        if (captionLightbox) {
          captionLightbox.textContent = descriere;
        }

        /* Deschidem overlay-ul */
        overlay.classList.add('open');
      }
    });
  }

  /* Închidem lightbox-ul la click pe butonul X */
  var btnClose = document.getElementById('lightbox-close');
  if (btnClose) {
    btnClose.addEventListener('click', function() {
      overlay.classList.remove('open');
    });
  }

  /* Închidem și la click pe fundalul overlay-ului */
  overlay.addEventListener('click', function(eveniment) {
    /* Doar dacă click-ul e pe overlay, nu pe imaginea din interior */
    if (eveniment.target === overlay) {
      overlay.classList.remove('open');
    }
  });
}


/* ============================================================
   FUNCȚIA 5: marcheazaAnulCurent
   Rol: Scrie automat anul curent în elementul
   cu id="an-curent" din footer (pentru copyright).
   ============================================================ */
function marcheazaAnulCurent() {

  /* Selectăm elementul din footer unde apare anul */
  var element = document.getElementById('an-curent');

  /* Dacă elementul există, scriem în el */
  if (element) {
    /* Creăm un obiect Date pentru a obține anul curent */
    var dataAzi = new Date();
    var an = dataAzi.getFullYear();
    element.textContent = an;
  }
}


/* ============================================================
   FUNCȚIA 6: highlightSidebarOnScroll
   Rol: Marchează link-ul activ din sidebar pe măsură
   ce utilizatorul face scroll prin pagină.
   ============================================================ */
function highlightSidebarOnScroll() {

  /* Selectăm lista de ancore din sidebar */
  var lista = document.getElementById('sidebar-anchors');
  if (!lista) return;

  /* Selectăm toate link-urile din sidebar */
  var linkuri = lista.querySelectorAll('a');
  if (linkuri.length === 0) return;

  /* Adăugăm un eveniment de scroll pe fereastră */
  window.addEventListener('scroll', function() {

    /* Luăm poziția curentă de scroll + un offset */
    var pozitieScroll = window.scrollY + 100;

    /* Parcurgem fiecare link din sidebar */
    for (var j = 0; j < linkuri.length; j++) {

      var link = linkuri[j];

      /* Extragem ID-ul secțiunii din href (ex: "#culturism" → "culturism") */
      var idSectiune = link.getAttribute('href').replace('#', '');

      /* Găsim elementul H2 cu acel ID */
      var sectiune = document.getElementById(idSectiune);

      if (sectiune) {
        /* Dacă scroll-ul a ajuns la secțiunea aceasta */
        var topSectiune = sectiune.offsetTop;
        var botSectiune = topSectiune + sectiune.offsetHeight + 200;

        if (pozitieScroll >= topSectiune && pozitieScroll < botSectiune) {
          /* Eliminăm clasa activa de la toate link-urile */
          for (var k = 0; k < linkuri.length; k++) {
            linkuri[k].style.color = '';
            linkuri[k].style.borderLeftColor = '';
          }
          /* Aplicăm stilul activ pe link-ul curent */
          link.style.color = '#f0e805';
          link.style.borderLeftColor = '#f0e805';
        }
      }
    }
  });
}


/* ============================================================
   INIȚIALIZARE GENERALĂ
   Apelăm toate funcțiile după ce pagina s-a încărcat complet.
   ============================================================ */
window.addEventListener('DOMContentLoaded', function() {

  /* Construim sidebar-ul cu ancore */
  buildSidebar();

  /* Inițializăm meniul hamburger */
  initHamburger();

  /* Inițializăm formularul de contact */
  initContactForm();

  /* Inițializăm galeria cu lightbox */
  initLightbox();

  /* Scriem anul curent în footer */
  marcheazaAnulCurent();

  /* Activăm highlight-ul din sidebar la scroll */
  highlightSidebarOnScroll();
});
