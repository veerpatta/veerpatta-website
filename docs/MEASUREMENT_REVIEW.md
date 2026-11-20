# Meta measurement: prepared, off

Nothing from the review build is sent to Meta. The build has no dataset ID, vendor loader, pixel image, data-layer export, CAPI credentials or browser/server transport. The optional Hindi/English advertising choice is a separate disclosure and appears only once an approved transport and valid school-owned dataset are deliberately wired on the production origin. No default opt-in, no pre-consent requests, no link decoration. Turning off the build flag is the rollback. This is not an activated Meta Pixel or a tested Meta Events Manager integration.

## Signal definitions

| Signal | When eligible to send | Must never be interpreted as |
|---|---|---|
| PageView | Once per document on an allowlisted public marketing URL after explicit adult opt-in. | A phone conversation, enquiry, booking or admission. |
| Lead | The school’s existing submission provider returned HTTP success and the expected success body, and there is valid opt-in at that moment. | A click, an opened draft, a dialer tap, consent alone, a form start, provider failure, or an unverified visit. |
| Phone or contact link clicks | No browser advertising signal in this implementation. If independently measured later, report as intent, never as a lead. | A completed/enrolled lead. |

Native no-JavaScript form submits still work but no success signal is emitted by the school page in that flow. No missed or previously unconsented events are replayed. A browser session can technically synthesize a custom event; it is not an anti-fraud signal or a substitute for office receipt logs. The event carries no form readings. Current deduplication is once per verified receipt object within the document; no cross-device or server deduplication is implied. Anonymous ad measurement, if approved, does not replace the school's records for actual enquiries, answered calls, qualified prospects, visits or admissions.

## Why there is no vendor adapter in this review

[Meta’s Pixel overview](https://developers.facebook.com/documentation/meta-pixel) describes browser, page/referrer, cookie, button and form-field metadata the ordinary SDK may collect. It does not establish the strict three-field transport this proposal requires. The [server-event specification](https://developers.facebook.com/documentation/ads-commerce/conversions-api/parameters/server-event) requires a user data object, so a no-identity server payload was not assumed valid. The review did not establish vendor support for a direct image request that safely sends just the approved fields for both PageView and Lead. Copying the ordinary Meta JavaScript or its fallback image would bypass that constraint, so neither is present.

Any future adapter must explicitly limit the accepted payload to event name, school-owned dataset ID and fixed canonical source URL. Never include any field values, names, phone/email/child/class data, IP or user agent as custom matches, cookies, click IDs, URL query strings, user/device IDs, document referrer, or hashed personal data. Do not load third-party SDKs or advanced matching under this design. A browser network request still exposes normal connection metadata to its receiver; disclose that honestly if an approved direct transport is later adopted.

## Checklist before any activation

1. Confirm VPPS owns the dataset and approved the intended purpose, audience, consent/privacy wording and data handling. Verify dataset/domain in the approved Meta business account. Do not copy credentials into source. Keep prepared staging/preview off.
2. Verify a currently supported Meta method can operate with the approved payload and no credentials/referrer/cookie sharing in the actual network trace. Verify Automatic Advanced Matching, automatic events, any other existing pixels and all overlapping tags are off for this provision. If the service requires additional data, do not activate it without an explicit scope change and privacy review.
3. With separately authorized test access, use [Meta’s Test Events flow](https://developers.facebook.com/documentation/ads-commerce/conversions-api/using-the-api) and a synthetic, owner-approved non-production test route/dataset or test flag. Verify ignored visitors, decline, unchecked adult attestation, and withdrawal emit zero requests. After opt-in expect one PageView and one Lead per confirmed simulated receipt. Mock any Formspree POST; never use real parent or student data. Verify malformed success, 4xx/5xx, duplicate callbacks and tel clicks emit zero Leads. Inspect the full payload and headers and verify revocation across tabs. Do not assume Test Events receipt implies online ads attribution.
4. Obtain fresh approval before public activation. Keep privacy choices accessible after acceptance, record only the minimal preference in the browser, and retain a dedicated off switch. Use compatible first-party source totals and office-qualified counts to judge value without sharing private enquiries.
