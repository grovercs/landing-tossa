# Memoria de Configuración: Beds24 y Motor de Reservas (L'Hostalet de Tossa)

Este documento sirve como referencia de memoria local para documentar todas las tareas, cambios técnicos, configuraciones de tarifas, cierres de ventas y traducciones realizadas hasta la fecha (Mayo 2026) en la cuenta de **Beds24** y su integración con los formularios de reserva de la web local (Astro).

---

## 1. Estructura de Habitaciones e IDs en Beds24

Se crearon y mapearon las siguientes categorías de habitaciones en Beds24 para coincidir con la distribución del hotel:

| ID Beds24 | Nombre de la Habitación (Beds24) | Capacidad Máxima | ID Booking.com Mapeado |
| :--- | :--- | :---: | :--- |
| **682346** | Habitación Individual con Balcón | 2 | 54308901 (Individual Balcón) |
| **682341** | Habitación Doble con Balcón | 2 | 54308902 (Doble Balcón) |
| **682350** | Habitación Doble con Dos Camas | 2 | *(Mapeo interno)* |
| **682348** | Habitación Doble Estándar | 2 | 54308908 (Doble Ventana) |
| **682340** | Habitación Doble Superior con Balcón | 2 | 54308909 |
| **682354** | Habitación Triple | 3 | 54308910 |
| **682355** | Habitación Familiar | 4 | 54308911 |

*Nota: La capacidad máxima real permitida por el hotel en la habitación más grande (Familiar) es de **4 huéspedes**.*

---

## 2. Alineación de Tarifas y Carga de Precios (Temporada 2026)

Se cargaron y alinearon las tarifas de forma exacta en Beds24 para sincronizarse a través del Channel Manager. Los precios se redondearon a **números enteros** para evitar decimales en Booking.com y el motor público.

Se definieron dos temporadas de carga de tarifas para las 7 categorías:

### A. Temporada de Primavera (27 de Mayo al 14 de Junio de 2026 - 19 días)
*   **Individual con Balcón (682346):** 42 € / noche (Flexible) | 38 € (No Reembolsable)
*   **Doble con Balcón (682341):** 58 € / noche (Flexible) | 53 € (No Reembolsable)
*   **Doble con Dos Camas (682350):** 58 € / noche (Flexible) | 53 € (No Reembolsable)
*   **Doble Estándar (682348):** 50 € / noche (Flexible) | 45 € (No Reembolsable)
*   **Doble Superior con Balcón (682340):** 69 € / noche (Flexible) | 63 € (No Reembolsable)
*   **Triple (682354):** 75 € / noche (Flexible) | 68 € (No Reembolsable)
*   **Familiar (682355):** 90 € / noche (Flexible) | 81 € (No Reembolsable)

### B. Temporada de Verano (15 de Junio al 30 de Septiembre de 2026 - 108 días)
*   **Individual con Balcón (682346):** 50 € / noche (Flexible) | 45 € (No Reembolsable)
*   **Doble con Balcón (682341):** 67 € / noche (Flexible) | 61 € (No Reembolsable)
*   **Doble con Dos Camas (682350):** 67 € / noche (Flexible) | 61 € (No Reembolsable)
*   **Doble Estándar (682348):** 59 € / noche (Flexible) | 54 € (No Reembolsable)
*   **Doble Superior con Balcón (682340):** 77 € / noche (Flexible) | 70 € (No Reembolsable)
*   **Triple (682354):** 84 € / noche (Flexible) | 76 € (No Reembolsable)
*   **Familiar (682355):** 100 € / noche (Flexible) | 90 € (No Reembolsable)

### C. Estructura y Redondeo de la Tarifa No Reembolsable
*   La tarifa **No Reembolsable** se configuró en Beds24 aplicando un **10% de descuento** sobre la tarifa Flexible estándar.
*   Para evitar que el descuento del 10% generara decimales (ej. 10% de 67 € = 60.30 €), se configuraron las reglas de redondeo en el panel de Beds24 para **redondear hacia arriba al número entero más cercano** (ej. 60.30 € pasa a ser **61 €**), logrando una visualización limpia e integrada de tarifas enteras.

---

## 3. Cierres de Ventas (Bloqueos de Fechas)

Se importó y replicó el calendario de ocupación y bloqueos desde Booking.com hacia la base de datos de Beds24 (para evitar sobreventa en el motor directo):
*   Se aplicaron cierres completos (status `Closed / Blackout` valor 4 en la API de Beds24) para las fechas con reservas existentes o bloqueadas en la extranet del canal para todas las categorías del hotel, incluyendo las habitaciones individuales y dobles con balcón.

---

## 4. Traducción Multilingüe del Calendario AJAX (Beds24)

### Problema Inicial
Cuando los usuarios entraban al motor de reservas público de Beds24 (`booking2.php?propid=328935`) y hacían clic en el link interior **"Ver disponibilidad"**, se abría un calendario AJAX de 3 meses que siempre se mostraba en inglés ("May 2026", "Mon", "Tue", etc.), sin importar que el cliente estuviera navegando en la versión en Español, Catalán o Francés.

### Solución Implementada
Se inyectó un script de JavaScript optimizado en la configuración avanzada del desarrollador de Beds24 (campo **Insertar en HTML <BODY> bottom** en la página de diseño). El script está diseñado para cumplir con el límite estricto de **2000 caracteres** de Beds24 y funciona de la siguiente manera:

1.  **Detección de Idioma:** Lee el parámetro `lang` de la URL (ej. `lang=es`, `ca`, `fr`).
2.  **Traducción en Tiempo Real:** Utiliza un array de traducción de meses y días de la semana correspondientes al idioma seleccionado.
3.  **Observador Mutacional (`MutationObserver`):** Dado que el calendario de 3 meses se carga y renderiza de forma asíncrona (AJAX) cada vez que el usuario hace clic en "Ver disponibilidad" o avanza/retrocede de mes, el script desconecta temporalmente el observador, realiza los reemplazos de texto en el DOM (ej. cambia *"May 2026"* por *"Maig 2026"* en Catalán) y vuelve a conectar el observador para evitar bucles infinitos de recursividad.

*Las traducciones se han validado y funcionan correctamente para:*
*   **Español (`es`):** Mayo 2026 | Lu, Ma, Mi, Ju, Vi, Sa, Do.
*   **Catalán (`ca`):** Maig 2026 | Dl, Dt, Dc, Dj, Dv, Ds, Dg.
*   **Francés (`fr`):** Mai 2026 | Lu, Ma, Me, Je, Ve, Sa, Di.
*   **Inglés (`en`):** Se mantiene original (May 2026 | Mon, Tue, etc.).

---

## 5. Ajustes y Validaciones de Huéspedes en la Web (Astro)

### Problema Inicial
En el formulario de reserva de la web de Astro (tanto en el inicio como en las páginas internas) los selectores permitían elegir hasta **6 huéspedes**. Sin embargo, la capacidad máxima permitida por nuestras habitaciones en Beds24 es de **4 huéspedes**.

### Solución Implementada
Se implementó una validación reactiva en el frontend utilizando **Alpine.js** sin restringir la visibilidad del selector (permitiendo que el usuario intente elegir 5 o 6 personas para que el sistema le eduque sobre la restricción):

1.  **Validación de Formulario General ([CloudbedsBooking.astro](file:///c:/Proyectos/antigravity/landing-tossa/src/components/CloudbedsBooking.astro)):**
    *   Tanto en el diseño `full` (Home) como en el `compact` (Páginas internas), al hacer clic en "Reservar", el script calcula si la suma de adultos + niños es superior a 4 para "El Hostalet de Tossa".
    *   Si es mayor a 4, se previene el envío (`e.preventDefault()`), se bloquea la redirección y se muestra de forma reactiva una advertencia visual estilizada con Bootstrap Icons.
    *   La alerta explica en 4 idiomas (ES, CA, EN, FR) que la capacidad máxima es de 4 personas por habitación y sugiere realizar una segunda reserva por separado si el grupo es mayor.
2.  **Validación en Página de Habitación ([BookingFormPage.astro](file:///c:/Proyectos/antigravity/landing-tossa/src/components/BookingFormPage.astro)):**
    *   Se implementó exactamente el mismo comportamiento de validación y alerta reactiva.
    *   Se amplió el selector del formulario específico de la habitación (que estaba limitado a 4) hasta **6 adultos** únicamente para alinearlo con el formulario principal y asegurar que salte la advertencia instructiva en caso de excederse.

---
*Este documento es de uso interno y se puede actualizar a medida que se realicen nuevos cambios en el motor.*
