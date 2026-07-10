# Guía Práctica: Gestión de Tarifas en Beds24 y Booking.com
## L'Hostalet de Tossa

Esta guía explica de forma sencilla cómo calcular e introducir los precios en **Beds24** para garantizar que en la web pública de **Booking.com** se muestren siempre como **números enteros y redondos** (sin decimales raros), manteniendo tu recargo del **20% (multiplicador 1.20)** del Channel Manager.

---

## 1. La Fórmula de Cálculo

Dado que Booking.com multiplicará automáticamente cualquier precio que envíe Beds24 por **1.20**, para saber qué precio debes introducir en Beds24 debes realizar la operación a la inversa (dividir entre 1.20):

$$\text{Precio en Beds24} = \frac{\text{Precio deseado en Booking.com}}{1.20}$$

> [!IMPORTANT]
> Al realizar la división, debes redondear el resultado a **dos decimales** en Beds24. Esto garantiza que cuando Booking.com aplique el recargo, el resultado final se redondee al número entero exacto en su web.

---

## 2. Tabla de Equivalencias Rápidas

Para ahorrarte cálculos en el día a día, aquí tienes una tabla de referencia con los precios más habituales de venta en Booking.com y lo que debes escribir exactamente en Beds24:

| Precio final en Booking.com (Redondo) | Precio a introducir en Beds24 (Con decimales) |
| :---: | :---: |
| **50.00 €** | **41.67 €** |
| **60.00 €** | **50.00 €** |
| **70.00 €** | **58.33 €** |
| **80.00 €** | **66.67 €** |
| **90.00 €** | **75.00 €** |
| **95.00 €** | **79.17 €** |
| **100.00 €** | **83.33 €** |
| **110.00 €** | **91.67 €** |
| **120.00 €** | **100.00 €** |
| **125.00 €** | **104.17 €** |
| **130.00 €** | **108.33 €** |
| **140.00 €** | **116.67 €** |
| **150.00 €** | **125.00 €** |
| **160.00 €** | **133.33 €** |
| **170.00 €** | **141.67 €** |
| **180.00 €** | **150.00 €** |
| **190.00 €** | **158.33 €** |
| **200.00 €** | **166.67 €** |
| **210.00 €** | **175.00 €** |
| **220.00 €** | **183.33 €** |

---

## 3. Paso a Paso para Cambiar Precios en Beds24

Cuando Mireia o tú queráis cambiar los precios de un rango de fechas en Beds24, seguid estos pasos:

1. Iniciad sesión en **Beds24**.
2. Id al menú superior y seleccionad **Precios > Precios Diarios** (Daily Prices) o la pestaña de **Calendario** (Calendar).
3. Buscad la habitación que queréis modificar y **haced clic en la celda del día en que empieza el cambio de precio**.
4. Se abrirá una ventana emergente llamada *"Editar precios diarios"*:
   * **Precio (Price)**: Introduce el valor con decimales obtenido de la tabla anterior (por ejemplo, escribe `58.33` si quieres que en Booking se venda a 70 €).
   * **Hasta (To)**: Selecciona la fecha de finalización de esta tarifa (puedes aplicar el cambio para un solo día o para un rango largo de semanas).
   * **Días de la semana**: Asegúrate de tener marcados los días que quieres modificar (de lunes a domingo por defecto).
   * **Habitaciones**: Marca la casilla de la habitación correspondiente (puedes marcar varias habitaciones si van a llevar la misma tarifa).
5. Haz clic en el botón **Guardar** (Submit/Save) en la parte inferior de la ventana.

¡Listo! Beds24 guardará el precio en su base de datos y se lo enviará automáticamente a Booking.com en cuestión de segundos (cuando la sincronización XML esté activa).

---

## 4. Notas de Seguridad para Recepción
* **Las reservas entran redondas:** Cuando un cliente reserve en Booking.com, por ejemplo, a **76.00 €**, la reserva entrará a Beds24 marcando **76.00 €** de importe total. Mireia cobrará ese importe redondo al cliente. Los decimales del calendario de Beds24 nunca afectarán a lo que le cobráis al huésped.
* **No cambies precios en Booking.com:** Una vez activada la conexión XML, **nunca** debéis modificar precios ni disponibilidad directamente en la extranet de Booking.com. Cualquier cambio manual en Booking será sobrescrito por Beds24 en su siguiente sincronización. Todo el control se realiza desde Beds24.
