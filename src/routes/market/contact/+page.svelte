<!-- +page.svelte -->
<script>
  // Aucun état dynamique nécessaire
</script>

<main class="z-10 w-full h-full flex flex-col items-center justify-start py-6 overflow-y-auto no-scrollbar">
  <h1 class="text-3xl font-bold text-center mb-6">Contactez-nous</h1>

  <div class="items-center justify-center grid grid-cols-1 sm:grid-cols-2 gap-6">
    <div
      role="region"
      aria-label="Contact email"
      class="bg-base-200/60 backdrop-blur-sm w-full border-2 border-base-200 p-6 rounded-2xl aspect-square flex flex-col items-center justify-center"
    >
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        class="h-10 w-10 text-blue-600 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m0 8H3a2 2 0 01-2-2V8a2 2 0 012-2h18a2 2 0 012 2v6a2 2 0 01-2 2z"
        />
      </svg>
      <h2 class="text-lg font-semibold">Email</h2>
      <p class="text-sm opacity-90">contact@votresite.com</p>
    </div>

    <div
      role="region"
      aria-label="Contact téléphone"
      class="bg-base-200/60 backdrop-blur-sm border-2 border-base-200 p-6 rounded-2xl w-full aspect-square flex flex-col items-center justify-center"
    >
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        class="h-10 w-10 text-green-600 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.66l1.2 2.88a1 1 0 01-.27 1.09L8.4 9.6a11.05 11.05 0 005.99 5.99l1.97-1.79a1 1 0 011.09-.27l2.88 1.2a1 1 0 01.66.94V19a2 2 0 01-2 2h-1C9.82 21 3 14.18 3 6V5z"
        />
      </svg>
      <h2 class="text-lg font-semibold">Téléphone</h2>
      <p class="text-sm opacity-90">+221 77 123 45 67</p>
    </div>

    <!-- Adresse -->
    <div
      role="region"
      aria-label="Contact adresse"
      class="bg-base-200/60 backdrop-blur-sm border-2 border-base-200 p-6 rounded-2xl w-full aspect-square flex flex-col items-center justify-center"
    >
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        class="h-10 w-10 text-red-600 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
        />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
      <h2 class="text-lg font-semibold">Adresse</h2>
      <p class="text-sm opacity-90 text-center">
        123 Rue de l’Innovation<br />
        Dakar, Sénégal
      </p>
    </div>

    <!-- Réseaux sociaux -->
    <div
      role="region"
      aria-label="Réseaux sociaux"
      class="bg-base-200/60 backdrop-blur-sm border-2 border-base-200 p-6 rounded-2xl w-full aspect-square flex flex-col items-center justify-center"
    >
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        class="h-10 w-10 text-purple-600 mb-4"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M22 5.72A8.12 8.12 0 0020.07 5a4.48 4.48 0 001.96-2.48 8.94 8.94 0 01-2.83 1.08 4.47 4.47 0 00-7.61 4.07A12.68 12.68 0 013 4.8a4.46 4.46 0 001.38 5.96 4.42 4.42 0 01-2.03-.56v.06a4.47 4.47 0 003.58 4.38 4.52 4.52 0 01-2.01.08 4.48 4.48 0 004.18 3.11A8.94 8.94 0 012 19.54a12.6 12.6 0 006.84 2"
        />
      </svg>
      <h2 class="text-lg font-semibold mb-2">Réseaux sociaux</h2>
      <div class="flex gap-4">
        <a
          href="#"
          aria-label="Twitter"
          class="text-blue-500 hover:text-blue-700"
        >
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M22.46 6c-.77.35-1.6.59-2.46.7a4.3 4.3 0 001.88-2.38 8.59 8.59 0 01-2.72 1.04 4.28 4.28 0 00-7.3 3.9A12.14 12.14 0 013 5.9a4.28 4.28 0 001.33 5.72 4.24 4.24 0 01-1.94-.54v.05a4.28 4.28 0 003.44 4.2 4.3 4.3 0 01-1.93.07 4.28 4.28 0 004 2.98A8.6 8.6 0 012 19.54a12.12 12.12 0 006.56 1.92c7.88 0 12.19-6.53 12.19-12.19 0-.19 0-.37-.01-.56A8.72 8.72 0 0024 5.64a8.44 8.44 0 01-2.42.66z"
            />
          </svg>
        </a>
        <a
          href="#"
          aria-label="Facebook"
          class="text-blue-700 hover:text-blue-900"
        >
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M22 12a10 10 0 10-11.5 9.87v-6.99h-2.1V12h2.1V9.35c0-2.06 1.23-3.2 3.12-3.2.9 0 1.84.16 1.84.16v2.03h-1.04c-1.03 0-1.35.64-1.35 1.3V12h2.3l-.37 2.88h-1.93v6.99A10 10 0 0022 12z"
            />
          </svg>
        </a>
        <a
          href="#"
          aria-label="LinkedIn"
          class="text-blue-800 hover:text-blue-900"
        >
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M19 0h-14a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5v-14a5 5 0 00-5-5zm-11 19h-3v-9h3zm-1.5-10.3a1.76 1.76 0 110-3.52 1.76 1.76 0 010 3.52zm13.5 10.3h-3v-4.8c0-1.14-.02-2.6-1.58-2.6s-1.82 1.23-1.82 2.5v4.9h-3v-9h2.88v1.23h.04a3.16 3.16 0 012.84-1.56c3.04 0 3.6 2 3.6 4.6z"
            />
          </svg>
        </a>
      </div>
    </div>
  </div>
</main>
