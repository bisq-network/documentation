---
title: "Métodos de pago"
description: "Elegir un método de pago y comprender sus límites, firma y riesgos de liquidación."
---

*Checked 7 November 2026 · Bisq 1 v1.10.11.*

<div lang="es">

Bisq permite comprar y vender bitcoin mediante transferencias de moneda nacional u otras criptomonedas. **Los fondos no bitcoin se transfieren fuera del software de Bisq**, mediante el banco, proveedor o monedero elegido.

## Elegir un método de pago

Comprueba el riesgo de devolución, la disponibilidad por país y moneda, las comisiones, la privacidad, los límites de tu cuenta y cómo demostrarás el pago. Una transferencia rápida no garantiza que sea irreversible. No aceptes una oferta si no puedes completar el pago por el método acordado.

La antigüedad y la firma de una cuenta de pago son mecanismos diferentes. Para ciertos métodos con riesgo de devolución, los límites de **compra de BTC** aumentan según el tiempo transcurrido desde la firma. La firma no garantiza la honestidad de la contraparte. Consulta [límites y firma](../account-limits/).

## Periodos y límites

Los antiguos cuadros de esta traducción mostraban límites fijos de 0,25/1/2 BTC y Chase QuickPay como método independiente. No son límites actuales verificados. La [tabla principal](../#bisq-1-payment-method-reference) utiliza el registro del cliente v1.10.11; el importe permitido depende del método, la moneda, la dirección, el estado de la cuenta y los límites calculados por el cliente.

Ejemplos de periodos del cliente: SEPA 6 días, SEPA Instant 1 día, Zelle 4 días, Faster Payments 1 día, US Postal Money Order 8 días. Estos periodos no garantizan el tiempo de tramitación del banco.

## Criptomonedas

Las cuentas de altcoins tienen un periodo de 1 día; Altcoins Instant reduce ese periodo a 1 hora. Desactiva las ofertas Instant si no vas a estar disponible en **Portfolio → My Open Offers**. Algunas monedas requieren información especial para demostrar el pago; consulta [Monero](../monero/), [L-BTC](../liquid-bitcoin/) y [GRIN](../grin/).

La frase antigua que describía las transferencias altcoin como “reversibles” era incorrecta como explicación general. No confundas la finalidad de una transacción confirmada con una garantía contra errores, reorganizaciones o fallos del protocolo.

## Preparar y comprobar el pago

Registra los datos correctos de la cuenta, conserva una copia completa de la aplicación y revisa la oferta antes de aceptar. No cambies de pagador para eludir un bloqueo. El vendedor debe comprobar el abono real y los datos del remitente antes de liberar BTC. Si el banco retiene o devuelve el pago, utiliza [ayuda para problemas fiat](../fiat-problems/).

Las sugerencias de nuevos métodos deben discutirse en los canales actuales del proyecto; el antiguo enlace de Keybase de la versión inglesa ya no es la instrucción de contacto de esta guía.

</div>

<details>
<summary>Sources and checks</summary>

[PaymentMethod.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/payment/payload/PaymentMethod.java#L210-L300) · [AccountAgeWitnessService.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/account/witness/AccountAgeWitnessService.java#L475-L515).

Spanish useful content retained and edited; old tables duplicated outdated English limits. Current client trade periods checked. This does not claim independent native-language editorial acceptance.

Adapted from **Payment methods/es**, revision 2823 (2022-02-17). [Exact source](../../wiki-source/payment-methods-es.wiki.txt) · [Attribution and revision metadata](../../wiki-source/payment-methods-es.json).

</details>
